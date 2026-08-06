<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$root = dirname(__DIR__, 3);
if (!is_file($root . '/config.php')) {
    $root = dirname(__DIR__, 2);
}
$configPath = $root . '/config.php';
$autoloadPath = $root . '/vendor/autoload.php';

if (!is_file($configPath) || !is_file($autoloadPath)) {
    http_response_code(503);
    echo json_encode(['error' => 'Mail service is not configured']);
    exit;
}

/** @var array{smtp_host:string,smtp_port:int,smtp_login:string,smtp_app_password:string,recipient_email:string,site_name:string} $config */
$config = require $configPath;
require $autoloadPath;

$payload = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request']);
    exit;
}

$name = trim((string) ($payload['name'] ?? ''));
$phone = trim((string) ($payload['phone'] ?? ''));
$email = trim((string) ($payload['email'] ?? ''));
$phoneDigits = preg_replace('/\D+/', '', $phone) ?? '';

if (mb_strlen($name) < 2 || strlen($phoneDigits) < 10 || strlen($phoneDigits) > 15 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['error' => 'Invalid application data']);
    exit;
}

try {
    $funnelhubUrl = (string) ($config['funnelhub_application_url'] ?? '');
    $funnelhubToken = (string) ($config['funnelhub_application_token'] ?? '');
    if ($funnelhubUrl === '' || $funnelhubToken === '' || !function_exists('curl_init')) {
        throw new RuntimeException('Inbox application integration is not configured');
    }

    $request = curl_init($funnelhubUrl);
    if ($request === false) {
        throw new RuntimeException('Unable to initialize Inbox application request');
    }
    curl_setopt_array($request, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode(['name' => $name, 'phone' => $phone, 'email' => $email]),
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $funnelhubToken,
            'Content-Type: application/json',
        ],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 10,
    ]);
    curl_exec($request);
    $funnelhubStatus = (int) curl_getinfo($request, CURLINFO_RESPONSE_CODE);
    curl_close($request);
    if ($funnelhubStatus < 200 || $funnelhubStatus >= 300) {
        throw new RuntimeException('Inbox application request failed with HTTP status ' . $funnelhubStatus);
    }

    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $config['smtp_host'];
    $mail->Port = $config['smtp_port'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->SMTPAuth = true;
    $mail->Username = $config['smtp_login'];
    $mail->Password = $config['smtp_app_password'];
    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->setFrom($config['smtp_login'], $config['site_name']);
    $mail->addAddress($config['recipient_email']);
    $mail->addReplyTo($email, $name);
    $mail->Subject = '[Мост ценностей] Новая заявка';
    $mail->addCustomHeader('X-Lead-Source', 'most-tsennostey');
    $mail->addCustomHeader('X-Lead-Form', 'application');
    $mail->isHTML(false);
    $mail->Body = "Имя: {$name}\nТелефон: {$phone}\nEmail: {$email}";
    $mail->send();
    echo json_encode(['ok' => true]);
} catch (Exception $exception) {
    error_log('Application mail error: ' . $exception->getMessage());
    http_response_code(502);
    echo json_encode(['error' => 'Unable to send application']);
}

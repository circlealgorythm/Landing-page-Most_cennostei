<?php

declare(strict_types=1);

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

if (!is_file($configPath)) {
    http_response_code(503);
    echo json_encode(['error' => 'Application service is not configured']);
    exit;
}

/** @var array{funnelhub_application_url:string,funnelhub_application_token:string} $config */
$config = require $configPath;

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
    $funnelhubBody = curl_exec($request);
    $funnelhubStatus = (int) curl_getinfo($request, CURLINFO_RESPONSE_CODE);
    curl_close($request);
    if ($funnelhubBody === false || $funnelhubStatus < 200 || $funnelhubStatus >= 300) {
        throw new RuntimeException('Inbox application request failed with HTTP status ' . $funnelhubStatus);
    }
    $funnelhubPayload = json_decode($funnelhubBody, true);
    $telegramUrl = is_array($funnelhubPayload) ? (string) ($funnelhubPayload['telegram_url'] ?? '') : '';
    $vkUrl = is_array($funnelhubPayload) ? (string) ($funnelhubPayload['vk_url'] ?? '') : '';
    $telegramParts = parse_url($telegramUrl);
    if (($telegramParts['scheme'] ?? '') !== 'https' || ($telegramParts['host'] ?? '') !== 't.me') {
        throw new RuntimeException('Inbox application response has no safe Telegram link');
    }

    setcookie('most_tsennostey_telegram_url', $telegramUrl, [
        'path' => '/',
        'secure' => true,
        'httponly' => false,
        'samesite' => 'Lax',
    ]);
    if ($vkUrl !== '') {
        $vkParts = parse_url($vkUrl);
        if (($vkParts['scheme'] ?? '') !== 'https' || ($vkParts['host'] ?? '') !== 'vk.me') {
            throw new RuntimeException('Inbox application response has an unsafe VK link');
        }
        setcookie('most_tsennostey_vk_url', $vkUrl, [
            'path' => '/',
            'secure' => true,
            'httponly' => false,
            'samesite' => 'Lax',
        ]);
    }
    echo json_encode(['ok' => true]);
} catch (Throwable $exception) {
    error_log('Application request error: ' . $exception->getMessage());
    http_response_code(502);
    echo json_encode(['error' => 'Unable to send application']);
}

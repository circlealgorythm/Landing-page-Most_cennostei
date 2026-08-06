<?php

declare(strict_types=1);

return [
    'smtp_host' => 'smtp.yandex.ru',
    'smtp_port' => 465,
    'smtp_login' => 'aisukam-info@yandex.ru',
    // Paste a Yandex app password here. Never use the normal Yandex ID password.
    'smtp_app_password' => 'replace-with-yandex-app-password',
    'recipient_email' => 'aisukam-info@yandex.ru',
    'site_name' => 'Мост ценностей',
    'funnelhub_application_url' => 'https://bot.aisukam.ru/webhooks/landing-applications/most-tsennostey',
    // Use the same secret as FunnelHub's MOST_TSENNOSTEY_INGEST_TOKEN.
    'funnelhub_application_token' => 'replace-with-funnelhub-application-token',
];

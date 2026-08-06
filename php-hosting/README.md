# Версия для PHP-хостинга

Эта папка создаёт готовую статическую версию лендинга с PHP-обработчиком формы.

## Сборка

В корне репозитория выполните:

```bash
npm run build
node scripts/build-php-hosting.mjs
```

## Установка на хостинг

1. В папке `php-hosting` выполните `composer install --no-dev --optimize-autoloader`.
2. Скопируйте `config.example.php` в `config.php` и укажите пароль приложения Яндекс Почты.
3. Если панель позволяет, назначьте `php-hosting/public` корнем сайта. Файлы `config.php`, `vendor` и `public` должны лежать рядом; публичной должна быть только папка `public`.

Если панель хостинга не позволяет назначить `public` корнем сайта, используйте пакет `php-hosting/deploy-root`: загрузите его содержимое в корень поддомена, выполните `composer install` там же и скопируйте `config.example.php` в `config.php`. Файл конфигурации и папка `vendor` закрыты от веб-доступа правилами Apache.

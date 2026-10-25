# Session Progress Log: Лендинг Мост ценностей

> **Подпроект:** `landing-most`  
> **Стек:** Next.js, React, TypeScript, Tailwind CSS  

---

## Текущее верифицированное состояние (Current Verified State)
* **Стандартная верификация:** `pwsh -ExecutionPolicy Bypass -File scripts/verify.ps1 -Subproject landing-most`
* **Статус:** Интегрирован в L4 Meta-Harness экосистемы «Школа AisuKam».

---

## Сессионный журнал подпроекта

### Сессия: 2026-10-21 | Первоначальная интеграция в Meta-Harness
* **Цель:** Инициализировать подпроект `landing-most`, настроить зависимости, подключить к сквозному аудиту и роутингу.
* **Выполнено:**
  1. Каталог зарегистрирован в `hub-manifest.json` и корневом `AGENTS.md`.
  2. Сформированы локальные файлы регламента `AGENTS.md` и журнала вех `progress.md`.
  3. Настроена команда автоматической верификации: `npm run lint; npm run build`.
* **Верификация:** Пройдена штатная проверка `scripts/verify.ps1 -Subproject landing-most`.

### Сессия: 2026-10-21 | Реализация Фазы 1 аудита (Очистка первого экрана и копирайта)
* **Цель:** Устранить троекратный дубликат тяжеловесного блока `.application-note`, очистить кричащий капс в биографии ведущей, добавить неразрывные пробелы и балансировку строк.
* **Выполнено:**
  1. Из Hero-экрана (`#start`) удален громоздкий блок `.application-note`. Добавлена лаконичная строка `.hero-reassurance`: *«Без давления: свяжемся, ответим на вопросы и поможем понять, подходит ли вам программа»*.
  2. Из секции Формат (`#format`) удален дубликат `.application-note`.
  3. В компоненте `ApplicationNote` удалена техническая строка-артефакт *«Все кнопки „Оставить заявку“ в итоге ведут на единую форму записи»*.
  4. В `app/aisu-biography-accordion.tsx` все 10 заголовков верхнего регистра (`ВЕДИЧЕСКИЙ КОУЧИНГ`, `КТО ТАКОЙ НАСТОЯЩИЙ ПРАКТИК МАГИИ?`, `Я — ДУША` и т.д.) переведены в Sentence case.
  5. В заголовках и лид-параграфах `app/page.tsx` расставлены неразрывные пробелы (`&nbsp;`) перед предлогами и союзами; в `app/globals.css` добавлены стили для `.hero-reassurance` и увеличен клиренс курсива (`h1 em, h2 em`).
* **Доказательство (Evidence):**
  - Терминальная команда: `pwsh -ExecutionPolicy Bypass -File scripts/verify.ps1 -Subproject landing-most` -> `[OK] Лендинг Мост ценностей успешно прошел верификацию за 4.57s! (exit code 0)`.
  - Сгенерированы актуальные статические файлы в `php-hosting/public` и `php-hosting/deploy-root`.

### Сессия: 2026-10-21 | Реализация Фазы 2 аудита (Рефакторинг формы и диалога)
* **Цель:** Перевести модальное окно на нативный HTML5 `<dialog closedby="any">`, обеспечить закрытие по клику на фон (light-dismiss), по клавише `Escape`, изоляцию фокуса (focus trap), внедрить автоформатирование номера телефона (+7 (999) 123-45-67) и доступную пошаговую валидацию по `:user-invalid` с выводом ошибок под каждым полем через `aria-describedby`.
* **Выполнено:**
  1. В `app/application-dialog.tsx` устаревший `div.dialog-backdrop` заменен на нативный `<dialog class="application-dialog">` с вызовом `showModal()` и `close()`, обработкой клика по `::backdrop` и поддержкой `Escape`.
  2. В `scripts/build-php-hosting.mjs` клиентский скрипт `php-form.js` переписан на нативный `<dialog>`, внедрен расчет клика вне прямоугольника окна для light-dismiss, удален дрожащий цикл скролла `requestAnimationFrame` из аккордеона.
  3. Добавлена живая маска/форматер для телефона: ввод плавно форматируется в `+7 (999) 123-45-67`.
  4. Реализована инлайн-валидация по `blur` и `submit` для каждого поля (`Имя`, `Телефон`, `Email`) с выводом сообщений в индивидуальные слоты `.field-error` и связкой через `aria-invalid` / `aria-describedby`.
  5. В `app/globals.css` и `php-hosting.css` прописаны стили для `dialog::backdrop` (размытие `backdrop-filter: blur(8px)`, темный хвойный оверлей), плавная анимация открытия и псевдоклассы `:user-invalid`, `:user-valid`.
* **Доказательство (Evidence):**
  - Терминальная команда: `pwsh -ExecutionPolicy Bypass -File scripts/verify.ps1 -Subproject landing-most` -> `[OK] Лендинг Мост ценностей успешно прошел верификацию за 3.96s! (exit code 0)`.
  - Сгенерированы обновленные бандлы и ассеты `php-hosting/public/assets/php-form.js` и `php-hosting/public/assets/php-hosting.css`.

### Сессия: 2026-10-21 | Реализация Фазы 3 аудита (Core Web Vitals, Fonts Waterfall & SEO/Schema.org)
* **Цель:** Оптимизировать метрики Core Web Vitals (LCP/TBT), ликвидировать цепочечный каскад шрифтов (`@import` waterfall), изолировать `fetchPriority="high"` строго для главного LCP-изображения первого экрана, настроить `metadataBase`, канонический тег `canonical` и микроразметку Schema.org (`EducationEvent` JSON-LD).
* **Выполнено:**
  1. В `app/page.tsx` с логотипа 44×44px снят флаг `priority`, ликвидировав паразитный предзагрузчик. Приоритетный `fetchPriority="high"` и `<link rel="preload">` закреплены строго за единственным LCP-кандидатом первого экрана — портретом Айсу (`/hero-portrait-aisu.jpg`).
  2. В `app/layout.tsx` указан `metadataBase: new URL("https://most.aisukam.ru")`, настроен канонический URL `alternates: { canonical: "/" }`, внедрен валидный JSON-LD Schema.org `EducationEvent` с датами (3-5 сентября 2026), офлайн-локацией в Москве, организатором и условиями участия.
  3. В `scripts/build-php-hosting.mjs` удален блокирующий рендеринг `@import url("https://fonts.googleapis.com/...")` из inline-стиля `<style data-php-fonts>`. Вместо этого в `<head>` добавлены параллельные `<link rel="preconnect" href="https://fonts.googleapis.com">`, `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` и `<link rel="stylesheet">` с `display=swap`.
  4. Регулярное выражение очистки скриптов в `build-php-hosting.mjs` дополнено отрицательным просмотром вперед `(?!...application\/ld\+json)`, благодаря чему поисковая микроразметка JSON-LD сохраняется в результирующем production HTML.
  5. В инспекции `php-hosting/public/index.html` и `php-hosting/deploy-root/index.html` подтверждено: канонический тег, Schema.org и правильный порядок предзагрузки сгенерированы корректно.
* **Доказательство (Evidence):**
  - Терминальная команда: `pwsh -ExecutionPolicy Bypass -File scripts/verify.ps1 -Subproject landing-most` -> `[OK] Лендинг Мост ценностей успешно прошел верификацию за 4.42s! (exit code 0)`.
  - Инспекция `index.html`: теги `<link rel="canonical" href="https://most.aisukam.ru/"/>` и `<script type="application/ld+json">` присутствуют, цепочка `@import` устранена.

---

## Бэклог на будущее (Отложенные задачи)
* **Фаза 4 (Усиление доверия и конверсии / TD-006):**
  - Подготовить и внедрить блок с 3–4 атмосферными фотографиями пространства проведения в Москве (зал, свет, чайная зона).
  - Собрать и оформить реальные отзывы/кейсы участников предыдущих ретритов и программ Айсу Кам.
  - Добавить в FAQ прозрачный пункт о согласовании стоимости участия (диапазон цен, бронирование места после 15-минутного созвона-знакомства).



- **2026-10-21 15:54** | feat(landing-most): audit phases 1-3 (hero, native dialog, cwv & schema.org)

- **2026-10-26 02:17** | security(landing-most): update gitignore to prevent secret leaks

- **2026-10-26 02:26** | security(landing-most): update package-lock via npm audit fix

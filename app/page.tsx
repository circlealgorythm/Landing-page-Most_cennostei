const BOT_URL = "https://t.me/Aisu_Kam_bot?start=vnutrennyaya_opora";

const program = [
  [
    "Моя цепочка",
    "Исследуем, как внешний результат превращается в тревогу, контроль или импульсивное действие — и где появляется точка выбора.",
  ],
  [
    "Колесо восьми внутренних опор",
    "Смотрим, где безопасность, сила, принятие или смысл ищутся только во внешнем мире.",
  ],
  [
    "Галерея полярностей",
    "Находим проседание, пьедестал и более свободный, срединный способ действовать.",
  ],
  [
    "5 зачем",
    "Доходим от внешней цели до глубинной потребности, которую она обещает закрыть.",
  ],
  [
    "Мост ценностей",
    "Переключаемся с зависимости от результата на процесс и качества, которые можно проявлять уже сейчас.",
  ],
  [
    "Личные беседы и круги",
    "Бережно уточняем личный запрос, слышим себя в круге и выбираем реалистичный следующий шаг.",
  ],
];

const questions = [
  [
    "Это терапия?",
    "Нет. Это духовно-образовательная программа с коучинговыми вопросами, письменными практиками и групповой работой. Она не заменяет психотерапию, медицинскую помощь или лечение.",
  ],
  [
    "Нужно ли рассказывать личные истории группе?",
    "Нет. Участие добровольное: можно говорить кратко, выбрать письменный формат или пропустить любой вопрос. В круге не дают непрошеных советов и не обсуждают чужие истории за его пределами.",
  ],
  [
    "Подойдёт ли мне программа, если я не знаком(а) с ведической традицией?",
    "Да. Мы будем говорить о внутренней опоре, ценностях, желаниях и способе действия понятным языком. Духовную практику каждый участник соотносит со своей традицией и мерой открытости.",
  ],
  [
    "Что будет 4 сентября?",
    "Это свободный день. По желанию можно вместе посетить праздник Джанмаштами в вайшнавском храме. Если такой формат не откликается, день можно провести в своём ритме и погулять по Москве. Участие не является обязательной частью тренинга.",
  ],
];

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#start" aria-label="Внутренняя опора — на главную">
          <span className="brand-mark">A</span>
          <span>
            <b>Айсу Кам</b>
            <small>путь внутренней опоры</small>
          </span>
        </a>
        <nav aria-label="Навигация по странице">
          <a href="#program">Программа</a>
          <a href="#format">Формат</a>
          <a href="#questions">Вопросы</a>
        </nav>
        <a className="top-cta" href={BOT_URL} target="_blank" rel="noreferrer">
          Оставить заявку
        </a>
      </header>

      <section className="hero" id="start">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="hero-copy">
          <p className="eyebrow">Офлайн-программа в Москве · 3–5 сентября 2026</p>
          <h1>
            Внутренняя опора
            <span>от зависимости от результата — к свободе действовать</span>
          </h1>
          <p className="hero-text">
            Трёхдневный маршрут для тех, кто устал искать безопасность, любовь и самоценность
            только в деньгах, отношениях, признании и контроле.
          </p>
          <div className="hero-actions">
            <a className="button primary" href={BOT_URL} target="_blank" rel="noreferrer">
              Оставить заявку в Telegram
              <span>↗</span>
            </a>
            <a className="button quiet" href="#program">Посмотреть программу</a>
          </div>
          <div className="hero-details" aria-label="Ключевые детали">
            <div><b>03–05</b><span>сентября</span></div>
            <div><b>Москва</b><span>точный адрес — участникам</span></div>
            <div><b>до 12</b><span>человек в группе</span></div>
          </div>
        </div>

        <div className="hero-card" aria-label="Смысл программы">
          <p className="card-label">Главный вопрос программы</p>
          <p className="card-question">Что во мне остаётся устойчивым, когда внешний результат задерживается или меняется?</p>
          <div className="card-line" />
          <p className="card-note">Не отказаться от желаний, а перестать делать их единственным источником жизни.</p>
        </div>
      </section>

      <section className="intro section">
        <p className="eyebrow">Для кого этот маршрут</p>
        <div className="intro-grid">
          <h2>Когда кажется, что всё важное находится снаружи</h2>
          <div>
            <p>
              Деньги, отношения, признание и успех могут быть важными частями жизни. Но иногда один ответ,
              сумма или чужое решение начинают определять всё внутреннее состояние.
            </p>
            <p>
              На тренинге мы исследуем этот механизм без обвинения себя и других: учимся замечать автоматизм,
              возвращать себе выбор и действовать из ценностей, а не из страха потери.
            </p>
          </div>
        </div>
        <div className="signal-grid">
          <article><span>01</span><p>Вы тревожитесь, когда ответ, деньги или признание задерживаются.</p></article>
          <article><span>02</span><p>Вам трудно отпустить контроль, даже когда он истощает.</p></article>
          <article><span>03</span><p>Критика или несогласие переживаются как личное отвержение.</p></article>
          <article><span>04</span><p>Вы хотите понять, как оставаться собой, не отказываясь от целей.</p></article>
        </div>
      </section>

      <section className="route section" id="program">
        <div className="section-heading">
          <div>
            <p className="eyebrow">3–5 сентября · Москва</p>
            <h2>Маршрут программы</h2>
          </div>
          <p>Два насыщенных дня практики и один свободный день для праздника, отдыха или прогулки по Москве.</p>
        </div>
        <div className="days">
          <article className="day active">
            <div className="day-number"><span>03</span><small>сентября</small></div>
            <div className="day-content">
              <p className="day-kicker">День 1 · увидеть механизм</p>
              <h3>От внешней погони — к пониманию своего сценария</h3>
              <ul>
                <li>Открывающий круг и настройка безопасного пространства</li>
                <li>«Моя цепочка»: желание, импульс, действие и цена</li>
                <li>Колесо восьми внутренних опор</li>
                <li>Галерея полярностей: проседание, пьедестал, середина</li>
                <li>Практика «5 зачем» и работа в парах</li>
                <li>Йога-цигун и гвоздестояние — по желанию и с инструктажем</li>
                <li>Круг интеграции</li>
              </ul>
            </div>
          </article>

          <article className="day rest">
            <div className="day-number"><span>04</span><small>сентября</small></div>
            <div className="day-content">
              <p className="day-kicker">День 2 · свободный день</p>
              <h3>Джанмаштами — день рождения Кришны</h3>
              <p>
                По желанию участники могут вместе посетить праздничную программу в вайшнавском храме.
                Это не обязательная часть тренинга: можно провести день в тишине, погулять по Москве или выбрать свой ритм.
              </p>
              <span className="optional">Участие — только по желанию</span>
            </div>
          </article>

          <article className="day active">
            <div className="day-number"><span>05</span><small>сентября</small></div>
            <div className="day-content">
              <p className="day-kicker">День 3 · выбрать новое действие</p>
              <h3>От результата — к процессу, ценностям и внутренней опоре</h3>
              <ul>
                <li>Круг возвращения и сбор наблюдений</li>
                <li>Мост ценностей: от цели к качеству действия</li>
                <li>Личные мини-беседы и лаборатория действий</li>
                <li>Карма-йога и принцип действия без сделки с миром</li>
                <li>Санкальпа — чистое, осознанное намерение</li>
                <li>Личная практика связи с Высшим</li>
                <li>План интеграции на 21 день и закрывающий круг</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section className="practice-section section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Не лекция, а проживание</p>
            <h2>Практики программы</h2>
          </div>
          <p>Каждая практика переводит смысл в личный опыт и конкретный следующий шаг.</p>
        </div>
        <div className="practice-grid">
          {program.map(([title, description], index) => (
            <article className="practice" key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="shift section">
        <p className="eyebrow">Что меняется в фокусе</p>
        <h2>Не «как получить любой ценой», а «как действовать свободно»</h2>
        <div className="shift-grid">
          <div className="before">
            <p className="shift-label">Когда опора только снаружи</p>
            <ul>
              <li>«Если этого не будет — со мной что-то не так»</li>
              <li>Тревога, спешка, контроль и сравнение</li>
              <li>Привязанность к чужому решению</li>
              <li>Импульсивные действия и эмоциональные качели</li>
            </ul>
          </div>
          <div className="after">
            <p className="shift-label">Когда появляется внутренняя опора</p>
            <ul>
              <li>«Мне важна цель, но я не исчезаю без неё»</li>
              <li>Ясность, уважение к себе и другому</li>
              <li>Ответственность за свой процесс</li>
              <li>Действие из ценности, а не из страха</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="format section" id="format">
        <div className="format-card">
          <p className="eyebrow">Формат участия</p>
          <h2>Камерная группа и бережная глубина</h2>
          <div className="format-points">
            <p><b>8–12 участников</b><span>чтобы в группе оставалось место для личного внимания</span></p>
            <p><b>Круги и пары</b><span>без непрошеных советов и оценивания чужого опыта</span></p>
            <p><b>Личные беседы</b><span>короткое уточнение запроса и выбор следующего шага</span></p>
            <p><b>21 день</b><span>практики для спокойной интеграции после тренинга</span></p>
          </div>
        </div>
        <aside className="safety-note">
          <span>Важно</span>
          <p>Участие добровольное. Не нужно рассказывать больше, чем вы готовы. Программа не заменяет медицинскую или психотерапевтическую помощь и не обещает конкретных результатов в деньгах, отношениях или здоровье.</p>
        </aside>
      </section>

      <section className="facilitator section">
        <div className="facilitator-symbol">АК</div>
        <div>
          <p className="eyebrow">Ведущая программы</p>
          <h2>Айсу Кам</h2>
          <p>
            Проводник в духовных практиках, работе с внутренним состоянием, ценностями и жизненными сценариями.
            В этой программе Айсу создаёт пространство, где можно честно увидеть свой способ действовать — без давления, обещаний «волшебной кнопки» и обесценивания собственного пути.
          </p>
          <a className="text-link" href={BOT_URL} target="_blank" rel="noreferrer">Задать вопрос о программе <span>↗</span></a>
        </div>
      </section>

      <section className="questions section" id="questions">
        <p className="eyebrow">Перед тем как оставить заявку</p>
        <h2>Частые вопросы</h2>
        <div className="faq-list">
          {questions.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}<span>+</span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div>
          <p className="eyebrow">Москва · 3–5 сентября 2026</p>
          <h2>Дайте себе три дня, чтобы услышать, на что вы действительно можете опереться.</h2>
          <p>Оставьте заявку в Telegram — мы пришлём детали участия, точное место проведения и ответим на вопросы.</p>
        </div>
        <a className="button primary" href={BOT_URL} target="_blank" rel="noreferrer">
          Оставить заявку <span>↗</span>
        </a>
      </section>

      <footer>
        <span>© 2026 Айсу Кам</span>
        <a href="https://aisukam.ru" target="_blank" rel="noreferrer">aisukam.ru</a>
      </footer>
    </main>
  );
}

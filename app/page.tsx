import Image from "next/image";

const BOT_URL = "https://t.me/Aisu_Kam_bot?start=vnutrennyaya_opora";

const signals = [
  "Вы тревожитесь, когда ответ, деньги или признание задерживаются.",
  "Вам трудно отпустить контроль, даже когда он уже истощает.",
  "Критика или несогласие переживаются как личное отвержение.",
  "Вы хотите оставаться собой, не отказываясь от важных целей.",
];

const practices = [
  ["Моя цепочка", "Увидеть, как результат превращается в тревогу, контроль или импульсивное действие, и найти точку выбора."],
  ["8 внутренних опор", "Понять, где безопасность, сила, принятие или смысл ищутся только во внешнем мире."],
  ["Галерея полярностей", "Заметить проседание, пьедестал и более свободный, срединный способ действовать."],
  ["5 зачем", "Пройти от внешней цели к глубинной потребности, которую она обещает закрыть."],
  ["Мост ценностей", "Переключиться с зависимости от результата на качества, доступные уже сейчас."],
  ["Личные беседы и круги", "Бережно уточнить свой запрос, услышать себя и выбрать реалистичный следующий шаг."],
];

const questions = [
  ["Это терапия?", "Нет. Это духовно-образовательная программа с коучинговыми вопросами, письменными практиками и групповой работой. Она не заменяет психотерапию, медицинскую помощь или лечение."],
  ["Нужно ли рассказывать личные истории группе?", "Нет. Участие добровольное: можно говорить кратко, выбрать письменный формат или пропустить любой вопрос. В круге не дают непрошеных советов и не обсуждают чужие истории за его пределами."],
  ["Подойдёт ли мне программа без знакомства с ведической традицией?", "Да. Мы говорим о внутренней опоре, ценностях, желаниях и способе действия понятным языком. Духовную практику каждый участник соотносит со своей традицией и мерой открытости."],
  ["Что будет 4 сентября?", "Это свободный день. По желанию можно вместе посетить праздник Джанмаштами в вайшнавском храме. Если формат не откликается, день можно провести в своём ритме. Участие не является обязательной частью тренинга."],
];

const outcomes = [
  ["Ясность", "Отделить важную цель от чувства собственной ценности."],
  ["Выбор", "Замечать автоматическую реакцию до того, как она становится действием."],
  ["Ценности", "Опираясь на них, действовать без сделки с собой и миром."],
  ["Ритм", "Унести с собой личную практику интеграции на 21 день."],
];

const ArrowIcon = () => <span className="arrow-icon" aria-hidden="true" />;

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#start" aria-label="Внутренняя опора, к началу страницы">
          <Image className="brand-logo" src="/logo.jpg" width={44} height={44} alt="" priority unoptimized />
          <span className="brand-copy"><b>Айсу Кам</b><small>путь внутренней опоры</small></span>
        </a>
        <nav aria-label="Навигация по странице">
          <a href="#about">Для кого</a>
          <a href="#program">Программа</a>
          <a href="#format">Формат</a>
          <a href="#questions">Вопросы</a>
        </nav>
        <a className="top-cta" href={BOT_URL} target="_blank" rel="noreferrer">Оставить заявку <ArrowIcon /></a>
      </header>

      <section className="hero" id="start">
        <div className="hero-copy">
          <h1>Внутренняя <em>опора</em></h1>
          <p className="hero-subtitle">От зависимости от результата к свободе действовать.</p>
          <div className="hero-actions">
            <a className="button primary" href={BOT_URL} target="_blank" rel="noreferrer">Оставить заявку <ArrowIcon /></a>
            <a className="button quiet" href="#program">Посмотреть программу</a>
          </div>
          <div className="hero-details" aria-label="Ключевые детали программы">
            <div><b>3-5</b><span>сентября 2026</span></div>
            <div><b>Москва</b><span>адрес участникам</span></div>
            <div><b>до 12</b><span>человек в группе</span></div>
          </div>
        </div>

        <div className="hero-art" aria-label="Символ программы, золотой лотос">
          <div className="orbit orbit-outer" aria-hidden="true" />
          <div className="orbit orbit-inner" aria-hidden="true" />
          <div className="logo-halo" aria-hidden="true" />
          <Image className="hero-logo" src="/logo.jpg" width={512} height={512} alt="Золотой лотос, символ программы «Внутренняя опора»" priority unoptimized />
        </div>
      </section>

      <section className="hero-statement" aria-label="Принципы программы">
        <p>Три дня для тех, кто устал искать безопасность, любовь и самоценность только в деньгах, отношениях, признании и контроле.</p>
        <div className="principle-list">
          <span>Камерная группа</span>
          <span>Бережное пространство</span>
          <span>Практика вместо обещаний</span>
          <span>Свобода участия</span>
        </div>
      </section>

      <section className="intro section" id="about">
        <div className="intro-head">
          <h2>Цель важна. <em>Вы больше цели.</em></h2>
          <div className="lead-copy">
            <p>Деньги, отношения, признание и успех могут быть важными частями жизни. Но иногда один ответ, сумма или чужое решение начинают определять всё внутреннее состояние.</p>
            <p>На программе мы исследуем этот механизм без обвинения себя и других: возвращаем выбор и учимся действовать из ценностей, а не из страха потери.</p>
          </div>
        </div>
        <div className="signal-grid">
          {signals.map((text) => <article key={text}><p>{text}</p></article>)}
        </div>
      </section>

      <section className="outcomes section">
        <div className="outcome-intro">
          <h2>Опора не итог. <em>Это способ быть в пути.</em></h2>
          <p>Не отказаться от желаний, а перестать делать внешний результат единственным источником жизни.</p>
        </div>
        <div className="outcome-grid">
          {outcomes.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="route section" id="program">
        <div className="section-heading">
          <h2>Три дня. <em>Один честный маршрут.</em></h2>
          <p>Два насыщенных дня практики и один свободный день для праздника, отдыха или прогулки по Москве.</p>
        </div>
        <div className="days">
          <article className="day">
            <div className="day-number"><span>03</span><small>сентября</small></div>
            <div className="day-content"><h3>Увидеть механизм своего сценария</h3><ul><li>Открывающий круг и настройка пространства</li><li>«Моя цепочка»: желание, импульс, действие и цена</li><li>Колесо восьми внутренних опор</li><li>Галерея полярностей: проседание, пьедестал, середина</li><li>Практика «5 зачем» и работа в парах</li><li>Йога-цигун и гвоздестояние, по желанию</li><li>Круг интеграции</li></ul></div>
          </article>
          <article className="day rest">
            <div className="day-number"><span>04</span><small>сентября</small></div>
            <div className="day-content"><h3>Джанмаштами: свободный день</h3><p>По желанию можно вместе посетить праздничную программу в вайшнавском храме. Это не обязательная часть тренинга: день можно провести в тишине, погулять по Москве или выбрать свой ритм.</p><span className="optional">Только по желанию</span></div>
          </article>
          <article className="day">
            <div className="day-number"><span>05</span><small>сентября</small></div>
            <div className="day-content"><h3>Выбрать новое действие и внутреннюю опору</h3><ul><li>Круг возвращения и сбор наблюдений</li><li>Мост ценностей: от цели к качеству действия</li><li>Личные мини-беседы и лаборатория действий</li><li>Карма-йога и действие без сделки с миром</li><li>Санкальпа: чистое, осознанное намерение</li><li>Личная практика связи с Высшим</li><li>План интеграции на 21 день</li></ul></div>
          </article>
        </div>
      </section>

      <section className="practice-section section">
        <div className="section-heading compact">
          <h2>Смысл становится <em>личным опытом.</em></h2>
          <p>Каждая практика помогает перевести наблюдение в конкретный следующий шаг.</p>
        </div>
        <div className="practice-grid">
          {practices.map(([title, description], index) => <article className={`practice practice-${index + 1}`} key={title}><h3>{title}</h3><p>{description}</p></article>)}
        </div>
      </section>

      <section className="shift section">
        <div className="shift-head"><h2>Не получить любой ценой. <em>Действовать свободно.</em></h2></div>
        <div className="shift-grid">
          <div className="before"><p className="shift-label">Когда опора только снаружи</p><ul><li>«Если этого не будет, со мной что-то не так»</li><li>Тревога, спешка, контроль и сравнение</li><li>Привязанность к чужому решению</li><li>Импульсивные действия и эмоциональные качели</li></ul></div>
          <div className="after"><p className="shift-label">Когда опора возвращается внутрь</p><ul><li>«Мне важна цель, но я не исчезаю без неё»</li><li>Ясность, уважение к себе и другому</li><li>Ответственность за свой процесс</li><li>Действие из ценности, а не из страха</li></ul></div>
        </div>
      </section>

      <section className="format section" id="format">
        <div className="format-card">
          <h2>Камерная группа. <em>Бережная глубина.</em></h2>
          <div className="format-points"><p><b>8-12 участников</b><span>Место для личного внимания</span></p><p><b>Круги и пары</b><span>Без непрошеных советов</span></p><p><b>Личные беседы</b><span>Уточнение запроса и шага</span></p><p><b>21 день</b><span>Спокойная интеграция после</span></p></div>
          <a className="button primary" href={BOT_URL} target="_blank" rel="noreferrer">Оставить заявку <ArrowIcon /></a>
        </div>
        <aside className="safety-note"><div className="safety-mark">!</div><div><strong>Важно</strong><p>Участие добровольное. Не нужно рассказывать больше, чем вы готовы. Программа не заменяет медицинскую или психотерапевтическую помощь и не обещает конкретных результатов в деньгах, отношениях или здоровье.</p></div></aside>
      </section>

      <section className="facilitator section">
        <div className="facilitator-symbol"><Image src="/logo.jpg" width={220} height={220} alt="" unoptimized /></div>
        <div><h2>Ведущая: Айсу Кам</h2><p>Проводник в духовных практиках, работе с внутренним состоянием, ценностями и жизненными сценариями. Айсу создаёт пространство, где можно честно увидеть свой способ действовать: без давления, «волшебной кнопки» и обесценивания собственного пути.</p><a className="text-link" href={BOT_URL} target="_blank" rel="noreferrer">Написать Айсу <ArrowIcon /></a></div>
      </section>

      <section className="questions section" id="questions">
        <div className="faq-heading"><h2>Всё, что важно <em>знать заранее.</em></h2><p>Если не нашли ответ, напишите Айсу напрямую в Telegram.</p></div>
        <div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="final-cta">
        <div className="final-orbit" aria-hidden="true" />
        <Image className="final-logo" src="/logo.jpg" width={240} height={240} alt="" unoptimized />
        <div><h2>Услышать, на что вы действительно <em>можете опереться.</em></h2><p>Оставьте заявку. В Telegram пришлём детали участия, точное место и лично ответим на вопросы.</p><div className="final-meta">Москва, 3-5 сентября 2026</div><a className="button gold" href={BOT_URL} target="_blank" rel="noreferrer">Оставить заявку <ArrowIcon /></a></div>
      </section>

      <footer><a className="footer-brand" href="#start"><Image src="/logo.jpg" width={36} height={36} alt="" unoptimized /><span><b>Айсу Кам</b><small>© 2026, Внутренняя опора</small></span></a><a href="https://aisukam.ru" target="_blank" rel="noreferrer">aisukam.ru <ArrowIcon /></a></footer>

      <a className="mobile-cta" href={BOT_URL} target="_blank" rel="noreferrer"><span>Оставить заявку</span><ArrowIcon /></a>
    </main>
  );
}

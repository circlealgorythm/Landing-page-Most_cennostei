import Image from "next/image";

const BOT_URL = "https://t.me/Aisu_Kam_bot?start=vnutrennyaya_opora";

const signals = [
  "Вы тревожитесь, когда ответ, деньги или признание задерживаются.",
  "Вам трудно отпустить контроль, даже когда он уже истощает.",
  "Критика или несогласие переживаются как личное отвержение.",
  "Вы хотите оставаться собой, не отказываясь от важных целей.",
];

const program = [
  ["Моя цепочка", "Увидеть, как результат превращается в тревогу, контроль или импульсивное действие — и найти точку выбора."],
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

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#start" aria-label="Внутренняя опора — к началу страницы">
          <Image className="brand-logo" src="/logo.jpg" width={44} height={44} alt="" priority unoptimized />
          <span className="brand-copy"><b>Айсу Кам</b><small>путь внутренней опоры</small></span>
        </a>
        <nav aria-label="Навигация по странице">
          <a href="#about">Для кого</a>
          <a href="#program">Программа</a>
          <a href="#format">Формат</a>
          <a href="#questions">Вопросы</a>
        </nav>
        <a className="top-cta" href={BOT_URL} target="_blank" rel="noreferrer">Оставить заявку <span>↗</span></a>
      </header>

      <section className="hero" id="start">
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span /> Офлайн-программа · Москва</p>
          <h1>Внутренняя <em>опора</em></h1>
          <p className="hero-subtitle">От зависимости от результата — к свободе действовать</p>
          <p className="hero-text">Три дня для тех, кто устал искать безопасность, любовь и самоценность только в деньгах, отношениях, признании и контроле.</p>
          <div className="hero-actions">
            <a className="button primary" href={BOT_URL} target="_blank" rel="noreferrer">Оставить заявку <span>↗</span></a>
            <a className="button quiet" href="#program">Посмотреть программу</a>
          </div>
          <p className="cta-note">Ответим лично в Telegram · без обязательств</p>
          <div className="hero-details" aria-label="Ключевые детали программы">
            <div><b>3–5</b><span>сентября 2026</span></div>
            <div><b>Москва</b><span>адрес — участникам</span></div>
            <div><b>до 12</b><span>человек в группе</span></div>
          </div>
        </div>

        <div className="hero-art" aria-label="Символ программы — золотой лотос">
          <div className="orbit orbit-outer" aria-hidden="true" />
          <div className="orbit orbit-inner" aria-hidden="true" />
          <div className="logo-halo" aria-hidden="true" />
          <Image className="hero-logo" src="/logo.jpg" width={512} height={512} alt="Золотой лотос — символ программы «Внутренняя опора»" priority unoptimized />
          <div className="art-note art-note-top"><span>01</span> увидеть механизм</div>
          <div className="art-note art-note-bottom"><span>02</span> выбрать действие</div>
        </div>

        <a className="scroll-cue" href="#about" aria-label="Листать к описанию"><span /> Листайте</a>
      </section>

      <div className="trust-line" aria-label="Принципы программы">
        <span>Камерная группа</span><i />
        <span>Бережное пространство</span><i />
        <span>Практика вместо обещаний</span><i />
        <span>Свобода участия</span>
      </div>

      <section className="intro section reveal" id="about">
        <div className="section-index">01 / ДЛЯ КОГО</div>
        <div className="intro-grid">
          <div>
            <p className="eyebrow">Когда всё важное будто находится снаружи</p>
            <h2>Цель важна.<br /><em>Но вы — больше цели.</em></h2>
          </div>
          <div className="lead-copy">
            <p>Деньги, отношения, признание и успех могут быть важными частями жизни. Но иногда один ответ, сумма или чужое решение начинают определять всё внутреннее состояние.</p>
            <p>На программе мы исследуем этот механизм без обвинения себя и других: возвращаем выбор и учимся действовать из ценностей, а не из страха потери.</p>
          </div>
        </div>
        <div className="signal-grid">
          {signals.map((text, index) => <article key={text}><span>0{index + 1}</span><p>{text}</p></article>)}
        </div>
      </section>

      <section className="outcomes section reveal">
        <div className="outcome-intro">
          <p className="eyebrow light">С чем вы уйдёте</p>
          <h2>Опора — не итог.<br /><em>Это способ быть в пути.</em></h2>
          <p>Не отказаться от желаний, а перестать делать внешний результат единственным источником жизни.</p>
        </div>
        <div className="outcome-grid">
          {outcomes.map(([title, text], index) => (
            <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>
          ))}
        </div>
      </section>

      <section className="route section reveal" id="program">
        <div className="section-index">02 / МАРШРУТ</div>
        <div className="section-heading">
          <div><p className="eyebrow">3–5 сентября · Москва</p><h2>Три дня.<br /><em>Один честный маршрут.</em></h2></div>
          <p>Два насыщенных дня практики и один свободный день для праздника, отдыха или прогулки по Москве.</p>
        </div>
        <div className="days">
          <article className="day">
            <div className="day-number"><span>03</span><small>сентября</small></div>
            <div className="day-content"><p className="day-kicker">День 1 · увидеть механизм</p><h3>От внешней погони — к пониманию своего сценария</h3><ul><li>Открывающий круг и настройка пространства</li><li>«Моя цепочка»: желание, импульс, действие и цена</li><li>Колесо восьми внутренних опор</li><li>Галерея полярностей: проседание, пьедестал, середина</li><li>Практика «5 зачем» и работа в парах</li><li>Йога-цигун и гвоздестояние — по желанию</li><li>Круг интеграции</li></ul></div>
          </article>
          <article className="day rest">
            <div className="day-number"><span>04</span><small>сентября</small></div>
            <div className="day-content"><p className="day-kicker">День 2 · свободный день</p><h3>Джанмаштами — день рождения Кришны</h3><p>По желанию можно вместе посетить праздничную программу в вайшнавском храме. Это не обязательная часть тренинга: день можно провести в тишине, погулять по Москве или выбрать свой ритм.</p><span className="optional">Только по желанию</span></div>
          </article>
          <article className="day">
            <div className="day-number"><span>05</span><small>сентября</small></div>
            <div className="day-content"><p className="day-kicker">День 3 · выбрать новое действие</p><h3>От результата — к процессу, ценностям и внутренней опоре</h3><ul><li>Круг возвращения и сбор наблюдений</li><li>Мост ценностей: от цели к качеству действия</li><li>Личные мини-беседы и лаборатория действий</li><li>Карма-йога и действие без сделки с миром</li><li>Санкальпа — чистое, осознанное намерение</li><li>Личная практика связи с Высшим</li><li>План интеграции на 21 день</li></ul></div>
          </article>
        </div>
      </section>

      <section className="practice-section section reveal">
        <div className="section-index">03 / ПРАКТИКИ</div>
        <div className="section-heading">
          <div><p className="eyebrow">Не лекция, а проживание</p><h2>Смысл становится<br /><em>личным опытом</em></h2></div>
          <p>Каждая практика помогает перевести наблюдение в конкретный следующий шаг.</p>
        </div>
        <div className="practice-grid">
          {program.map(([title, description], index) => <article className="practice" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}
        </div>
      </section>

      <section className="shift section reveal">
        <div className="section-index">04 / СМЕНА ФОКУСА</div>
        <p className="eyebrow">Что меняется внутри</p>
        <h2>Не «как получить любой ценой»,<br /><em>а «как действовать свободно»</em></h2>
        <div className="shift-grid">
          <div className="before"><p className="shift-label">Когда опора только снаружи</p><ul><li>«Если этого не будет — со мной что-то не так»</li><li>Тревога, спешка, контроль и сравнение</li><li>Привязанность к чужому решению</li><li>Импульсивные действия и эмоциональные качели</li></ul></div>
          <div className="after"><p className="shift-label">Когда опора возвращается внутрь</p><ul><li>«Мне важна цель, но я не исчезаю без неё»</li><li>Ясность, уважение к себе и другому</li><li>Ответственность за свой процесс</li><li>Действие из ценности, а не из страха</li></ul></div>
        </div>
      </section>

      <section className="format section reveal" id="format">
        <div className="format-card">
          <p className="eyebrow">Формат участия</p><h2>Камерная группа.<br /><em>Бережная глубина.</em></h2>
          <div className="format-points"><p><b>8–12 участников</b><span>Место для личного внимания</span></p><p><b>Круги и пары</b><span>Без непрошеных советов</span></p><p><b>Личные беседы</b><span>Уточнение запроса и шага</span></p><p><b>21 день</b><span>Спокойная интеграция после</span></p></div>
          <a className="button primary" href={BOT_URL} target="_blank" rel="noreferrer">Узнать условия участия <span>↗</span></a>
        </div>
        <aside className="safety-note"><div className="safety-mark">!</div><div><span>Важно</span><p>Участие добровольное. Не нужно рассказывать больше, чем вы готовы. Программа не заменяет медицинскую или психотерапевтическую помощь и не обещает конкретных результатов в деньгах, отношениях или здоровье.</p></div></aside>
      </section>

      <section className="facilitator section reveal">
        <div className="facilitator-symbol"><Image src="/logo.jpg" width={220} height={220} alt="" unoptimized /></div>
        <div><p className="eyebrow">Ведущая программы</p><h2>Айсу Кам</h2><p>Проводник в духовных практиках, работе с внутренним состоянием, ценностями и жизненными сценариями. Айсу создаёт пространство, где можно честно увидеть свой способ действовать — без давления, «волшебной кнопки» и обесценивания собственного пути.</p><a className="text-link" href={BOT_URL} target="_blank" rel="noreferrer">Задать вопрос о программе <span>↗</span></a></div>
      </section>

      <section className="questions section reveal" id="questions">
        <div className="section-index">05 / ВОПРОСЫ</div>
        <div className="faq-heading"><div><p className="eyebrow">Перед заявкой</p><h2>Всё, что важно<br /><em>знать заранее</em></h2></div><p>Если не нашли ответ — напишите Айсу напрямую в Telegram.</p></div>
        <div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="final-cta reveal">
        <div className="final-orbit" aria-hidden="true" />
        <Image className="final-logo" src="/logo.jpg" width={240} height={240} alt="" unoptimized />
        <div><p className="eyebrow light">Москва · 3–5 сентября 2026</p><h2>Услышать,<br />на что вы действительно<br /><em>можете опереться.</em></h2><p>Оставьте заявку — в Telegram пришлём детали участия, точное место и лично ответим на вопросы.</p><a className="button gold" href={BOT_URL} target="_blank" rel="noreferrer">Оставить заявку <span>↗</span></a><small>Переход в Telegram · ответим лично</small></div>
      </section>

      <footer><a className="footer-brand" href="#start"><Image src="/logo.jpg" width={36} height={36} alt="" unoptimized /><span><b>Айсу Кам</b><small>© 2026 · Внутренняя опора</small></span></a><a href="https://aisukam.ru" target="_blank" rel="noreferrer">aisukam.ru ↗</a></footer>

      <a className="mobile-cta" href={BOT_URL} target="_blank" rel="noreferrer"><span>Оставить заявку</span><b>↗</b></a>
    </main>
  );
}

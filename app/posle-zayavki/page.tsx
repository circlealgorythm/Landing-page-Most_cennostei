import Image from "next/image";
import Link from "next/link";

export default function AfterApplicationPage() {
  return (
    <main className="after-page">
      <header className="form-topbar after-topbar">
        <Link className="brand" href="/" aria-label="Мост ценностей, на главную страницу">
          <Image className="brand-logo" src="/logo.jpg" width={44} height={44} alt="" priority unoptimized />
          <span className="brand-copy"><b>Айсу Кам</b><small>путь внутренней опоры</small></span>
        </Link>
      </header>
      <section className="after-layout">
        <div className="after-mark" aria-hidden="true"><Image src="/logo.jpg" width={220} height={220} alt="" unoptimized /></div>
        <div>
          <p className="eyebrow">Заявка принята</p>
          <h1>Спасибо за <em>доверие.</em></h1>
          <p className="after-lead">Выберите удобный бот и подпишитесь на него — там мы пришлём детали программы и сможем продолжить общение.</p>
          <p className="after-required">Это обязательный шаг, чтобы не потерять связь с вами.</p>
          <div className="bot-options" aria-label="Боты для связи">
            <div className="bot-option"><span className="bot-kind">Telegram</span><strong>Ссылка на бот появится скоро</strong><p>Сохраните эту страницу или вернитесь к ней из письма.</p></div>
            <div className="bot-option"><span className="bot-kind">VK</span><strong>Ссылка на бот появится скоро</strong><p>Мы добавим её здесь, как только бот будет готов.</p></div>
          </div>
          <p className="after-footnote">Уже подписались? Мы скоро свяжемся с вами.</p>
          <Link className="back-link" href="/">Вернуться на страницу программы</Link>
        </div>
      </section>
    </main>
  );
}

// Promo — компонент с вёрсткой баннера страницы «О проекте»
import { Link } from "react-router-dom";
import Header from "./Header";
import leadLogo from "../images/logo.svg";
import leadLogoDiploma from "../images/lead-logo.svg";

export default function Promo({
  onRegister,
  onLogin,
  onMovies,
  onSavedMovies,
  onMenuClick,
  onProfile,
  islogged,
}) {
  const type = "main";
  return (
    <section className="lead">
      <div className="lead__container">
        <img
          className="lead__logo logo"
          src={leadLogo}
          alt='Логотип сервиса "Фильмы"'
        />
        {islogged ? (
          <Header
            onMovies={onMovies}
            onSavedMovies={onSavedMovies}
            onMenuClick={onMenuClick}
            onProfile={onProfile}
            type={type}
          />
        ) : (
          <>
            <button
              type="button"
              name="register-button"
              aria-label='Кнопка "Регистрация"'
              className="lead__register-button button indicator"
              onClick={onRegister}
            >
              <Link className="lead__register-link link" to="/sign-up">
                Регистрация
              </Link>
            </button>
            <button
              type="button"
              name="entry-button"
              aria-label='Кнопка "Войти"'
              className="lead__entry-button button indicator"
              onClick={onLogin}
            >
              <Link className="lead__entry-link link" to="/sign-in">
                Войти
              </Link>
            </button>
          </>
        )}
      </div>
      <div className="lead__container-info">
        <h1 className="lead__title">
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
        <img
          className="lead__logo-diploma"
          src={leadLogoDiploma}
          alt="Логотип дипломного проекта студента факультета Веб-разработки."
        />
        <p className="lead__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
      </div>
      <button
        type="button"
        name="learn-more-button"
        aria-label='Кнопка "Узнать больше"'
        className="lead__learn-more-button button indicator"
        onClick={onLogin}
      >
        <Link className="lead__link link" to="/sign-in">
          Узнать больше
        </Link>
      </button>
    </section>
  );
}

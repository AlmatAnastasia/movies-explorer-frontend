// Login — компонент страницы авторизации
import { Link } from 'react-router-dom'; 
import loginLogo from "../images/logo.svg";

export default function Login({ onMovies, onRegister }) {
  return (
    <section className="login center">
      <div className="login__container-header container-header">
        <img
          className="login__logo logo"
          src={loginLogo}
          alt='Логотип сервиса &quot;Фильмы&quot;'
        />
        <h1 className="login__title title title-center">Рады видеть!</h1>
      </div>

      <form className="login__form form">
        <fieldset className="login__cell cell line">
          <p className="login__placeholder placeholder">E-mail</p>
          <input
            type="email"
            id="login-email"
            name="login__input_type_email"
            className="login__input login__input_type_email input"
            autoComplete="off"
            required
          />
          <span className="login-email-text-error"></span>
        </fieldset>
        <fieldset className="login__cell cell line">
          <p className="login__placeholder placeholder">Пароль</p>
          <input
            type="password"
            id="login-password"
            name="login__input_type_password"
            className="login__input login__input_type_password input"
            minLength="8"
            maxLength="16"
            autoComplete="new-password"
            required
          />
          <span className="login-password-text-error"></span>
        </fieldset>
      </form>
      <div className="login__container-exit-entry container-exit">
        <button
          type="button"
          name="entry-button"
          aria-label='Кнопка &quot;Войти&quot;'
          className="login__entry-button blue-button indicator"
          onClick={onMovies}
        >
          <Link className="login__login-link button-link link" to="/movies">
            Войти
          </Link>
        </button>
        <div className="login__container-small-register container-small">
          <p className="login__register-text color-text">
            Ещё не зарегистрированы?
          </p>
          <button
            type="button"
            name="register-button"
            aria-label='Кнопка &quot;Регистрация&quot;'
            className="login__register-button button indicator"
            onClick={onRegister}
          >
            <Link className="login__register-link color-link link" to="/sign-up">
              Регистрация
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}

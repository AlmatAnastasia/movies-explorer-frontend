// Register — компонент страницы регистрации
import { Link } from "react-router-dom";
import registerLogo from "../images/logo.svg";

export default function Register({ onLogin }) {
  return (
    <section className="register center">
      <div className="register__container-header container-header">
        <img
          className="register__logo logo"
          src={registerLogo}
          alt='Логотип сервиса &quot;Фильмы&quot;'
        />
        <h1 className="register__title title title-center">Добро пожаловать!</h1>
      </div>

      <form className="register__form form">
        <fieldset className="register__cell cell line">
          <p className="register__placeholder placeholder">Имя</p>
          <input
            type="text"
            id="register-name-text"
            name="register__input_type_name-text"
            className="register__input register__input_type_name-text input"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="register-name-text-error"></span>
        </fieldset>
        <fieldset className="register__cell cell line">
          <p className="register__placeholder placeholder">E-mail</p>
          <input
            type="email"
            id="register-email"
            name="register__input_type_email"
            className="register__input register__input_type_email input"
            autoComplete="off"
            required
          />
          <span className="register-email-text-error"></span>
        </fieldset>
        <fieldset className="register__cell cell line">
          <p className="register__placeholder placeholder">Пароль</p>
          <input
            type="password"
            id="register-password"
            name="register__input_type_password"
            className="register__input register__input_type_password input"
            minLength="8"
            maxLength="16"
            autoComplete="new-password"
            required
          />
          <span className="register-password-text-error"></span>
        </fieldset>
      </form>
      <div className="register__container-exit-login container-exit">
        <button
          type="button"
          name="login-button"
          aria-label='Кнопка &quot;Зарегистрироваться&quot;'
          className="register__login-button blue-button indicator"
          onClick={onLogin}
        >
          <Link className="register__login-link button-link link" to="/sign-in">
            Зарегистрироваться
          </Link>
        </button>
        <div className="register__container-small-entry container-small">
          <p className="register__entry-text color-text">Уже зарегистрированы?</p>
          <button
            type="button"
            name="entry-button"
            aria-label='Кнопка &quot;Войти&quot;'
            className="register__entry-button button indicator"
            onClick={onLogin}
          >
            <Link className="register__entry-link color-link link" to="/sign-in">
              Войти
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}

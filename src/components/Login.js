// Login — компонент страницы авторизации
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import loginLogo from "../images/logo.svg";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import {
  conditionForClassList,
  inputEmailSelector,
  inputPasswordSelector,
} from "../utils/utils.js";

export default function Login({ onRegister, isErrorMessage, onClick }) {
  const isEmail = require("validator/lib/isEmail");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const inputLoginEmailSelector = `login__${inputEmailSelector}`;
  const inputLoginPasswordSelector = `login__${inputPasswordSelector}`;
  // валидация
  const { handleChange, errors, resetForm, setValues, values, isValid } =
    useFormAndValidation();
  const inputEmail = values[inputLoginEmailSelector];
  const inputPassword = values[inputLoginPasswordSelector];
  const errorsInputEmail =
    isValidEmail !== isValid && inputEmail !== undefined
      ? "Должен быть действительный адрес электронной почты"
      : errors[inputLoginEmailSelector];
  const errorsInputPassword = errors[inputLoginPasswordSelector];
  // наличие текста ошибки для каждого из полей
  const conditionForClassListEmail = conditionForClassList(errorsInputEmail);
  const conditionForClassListPassword =
    conditionForClassList(errorsInputPassword);
  // изменение данных при монтировании (авторизация/регистрация)
  useEffect(() => {
    resetForm();
    setValues({});
  }, [setValues, resetForm]);
  // валидация email при изменении значения
  useEffect(() => {
    const email = inputEmail === undefined ? "" : inputEmail;
    const validEmail = isEmail(email);
    setIsValidEmail(validEmail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputEmail]);
  return (
    <section className="login center">
      <div className="login__container-header container-header">
        <Link className="login__logo-link link" to="/">
          <img
            className="login__logo logo"
            src={loginLogo}
            alt='Логотип сервиса "Фильмы"'
          />
        </Link>
        <h1 className="login__title title title-center">Рады видеть!</h1>
      </div>

      <form className="login__form form" noValidate>
        <fieldset className="login__cell cell line">
          <p className="login__placeholder placeholder">E-mail</p>
          <input
            type="email"
            id="login-email"
            name="login__input_type_email"
            className={`login__input login__input_type_email input ${
              conditionForClassListEmail && "input_type_error"
            } ${
              !conditionForClassListEmail && inputEmail && "input_type_active"
            } ${conditionForClassListEmail && "input_type_error-focus"}`}
            value={inputEmail || ""}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <span
            className={`login-email-text-error ${
              conditionForClassListEmail && "input-error"
            }`}
          >
            {errorsInputEmail}
          </span>
        </fieldset>
        <fieldset className="login__cell cell line">
          <p className="login__placeholder placeholder">Пароль</p>
          <input
            type="password"
            id="login-password"
            name="login__input_type_password"
            className={`login__input login__input_type_password input ${
              conditionForClassListPassword && "input_type_error"
            } ${
              !conditionForClassListPassword &&
              inputPassword &&
              "input_type_active"
            } ${conditionForClassListPassword && "input_type_error-focus"}`}
            minLength="8"
            maxLength="16"
            value={inputPassword || ""}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
          <span
            className={`login-password-text-error ${
              conditionForClassListPassword && "input-error"
            }`}
          >
            {errorsInputPassword}
          </span>
        </fieldset>
      </form>
      <div className="login__container-exit-entry container-exit">
        <p className="login__error-message error-message">{isErrorMessage}</p>
        <button
          type="button"
          name="entry-button"
          aria-label='Кнопка "Войти"'
          className={`login__entry-button blue-button ${
            isValid && isValidEmail
              ? "indicator"
              : "blue-button_disabled indicator_disabled"
          }`}
          onClick={onClick(inputEmail, inputPassword)}
          disabled={isValid && isValidEmail ? false : true}
        >
          <Link
            className={`login__login-link button-link link ${
              isValid && isValidEmail ? "indicator" : "indicator_disabled"
            }`}
          >
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
            aria-label='Кнопка "Регистрация"'
            className="login__register-button button indicator"
            onClick={onRegister}
          >
            <Link
              className="login__register-link color-link link"
              to="/sign-up"
            >
              Регистрация
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}

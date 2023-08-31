// Register — компонент страницы регистрации
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import registerLogo from "../images/logo.svg";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import {
  conditionForClassList,
  inputTextSelector,
  inputEmailSelector,
  inputPasswordSelector,
} from "../utils/utils.js";

export default function Register({
  onLogin,
  userRegister,
  setUserRegister,
  isErrorMessage,
  onClick,
}) {
  const isEmail = require("validator/lib/isEmail");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const inputRegisterTextSelector = `register__${inputTextSelector}`;
  const inputRegisterEmailSelector = `register__${inputEmailSelector}`;
  const inputRegisterPasswordSelector = `register__${inputPasswordSelector}`;
  // валидация
  const { handleChange, errors, resetForm, setValues, values, isValid } =
    useFormAndValidation();
  const inputText = userRegister
    ? localStorage.userEmail
    : values[inputRegisterTextSelector];
  const inputEmail = userRegister
    ? localStorage.userEmail
    : values[inputRegisterEmailSelector];
  const inputPassword = userRegister
    ? localStorage.userPassword
    : values[inputRegisterPasswordSelector];
  const errorsInputText = errors[inputRegisterTextSelector];
  const errorsInputEmail =
    !isValidEmail && inputEmail !== undefined
      ? "Должен быть действительный адрес электронной почты"
      : errors[inputRegisterEmailSelector];
  const errorsInputPassword = errors[inputRegisterPasswordSelector];
  // наличие текста ошибки для каждого из полей
  const conditionForClassListText = conditionForClassList(errorsInputText);
  const conditionForClassListEmail = conditionForClassList(errorsInputEmail);
  const conditionForClassListPassword =
    conditionForClassList(errorsInputPassword);
  // изменение данных при монтировании (авторизация/регистрация)
  useEffect(() => {
    resetForm();
    setValues({});
    setUserRegister(false);
  }, [setValues, setUserRegister, resetForm]);
  // валидация email при изменении значения
  useEffect(() => {
    const email = inputEmail === undefined ? "" : inputEmail;
    const validEmail = isEmail(email);
    setIsValidEmail(validEmail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputEmail]);

  return (
    <section className="register center">
      <div className="register__container-header container-header">
        <Link className="register__logo-link link" to="/">
          <img
            className="register__logo logo"
            src={registerLogo}
            alt='Логотип сервиса "Фильмы"'
          />
        </Link>
        <h1 className="register__title title title-center">
          Добро пожаловать!
        </h1>
      </div>

      <form className="register__form form" noValidate>
        <fieldset className="register__cell cell line">
          <p className="register__placeholder placeholder">Имя</p>
          <input
            type="text"
            id="register-name-text"
            name="register__input_type_name-text"
            className={`register__input register__input_type_name-text input ${
              conditionForClassListText && "input_type_error"
            } ${!conditionForClassListText && inputText && "input_type_active"}
            ${conditionForClassListText && "input_type_error-focus"}`}
            minLength="2"
            maxLength="40"
            value={inputText || ""}
            onChange={handleChange}
            required
          />
          <span
            className={`register-name-text-error ${
              conditionForClassListText && "input-error"
            }`}
          >
            {errorsInputText}
          </span>
        </fieldset>
        <fieldset className="register__cell cell line">
          <p className="register__placeholder placeholder">E-mail</p>
          <input
            type="email"
            id="register-email"
            name="register__input_type_email"
            className={`register__input register__input_type_email input ${
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
            className={`register-email-text-error ${
              conditionForClassListEmail && "input-error"
            }`}
          >
            {errorsInputEmail}
          </span>
        </fieldset>
        <fieldset className="register__cell cell line">
          <p className="register__placeholder placeholder">Пароль</p>
          <input
            type="password"
            id="register-password"
            name="register__input_type_password"
            className={`register__input register__input_type_password input ${
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
            className={`register-password-text-error ${
              conditionForClassListPassword && "input-error"
            }`}
          >
            {errorsInputPassword}
          </span>
        </fieldset>
      </form>
      <div className="register__container-exit-login container-exit">
        <p className="register__error-message error-message">
          {isErrorMessage}
        </p>
        <button
          type="button"
          name="login-button"
          aria-label='Кнопка "Зарегистрироваться"'
          className={`register__login-button blue-button ${
            isValid && isValidEmail
              ? "indicator"
              : "blue-button_disabled indicator_disabled"
          }`}
          onClick={onClick(inputText, inputEmail, inputPassword)}
          disabled={isValid && isValidEmail ? false : true}
        >
          <Link
            className={`register__login-link button-link link ${
              isValid && isValidEmail ? "indicator" : "indicator_disabled"
            }`}
          >
            Зарегистрироваться
          </Link>
        </button>
        <div className="register__container-small-entry container-small">
          <p className="register__entry-text color-text">
            Уже зарегистрированы?
          </p>
          <button
            type="button"
            name="entry-button"
            aria-label='Кнопка "Войти"'
            className="register__entry-button button indicator"
            onClick={onLogin}
          >
            <Link
              className="register__entry-link color-link link"
              to="/sign-in"
            >
              Войти
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}

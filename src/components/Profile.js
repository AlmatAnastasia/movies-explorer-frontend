// Profile — компонент страницы изменения профиля
import { useState, useEffect, useContext } from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import {
  conditionForClassList,
  inputTextSelector,
  inputEmailSelector,
} from "../utils/utils.js";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Profile({
  isMenuOpen,
  onMenuClick,
  onMovies,
  onSavedMovies,
  onClickEditButton,
  onClickExitButton,
  isErrorMessage,
  isSuccessMessage,
  onProfile,
}) {
  const type = "profile";
  const isEmail = require("validator/lib/isEmail");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const textMessage = isSuccessMessage ? isSuccessMessage : isErrorMessage;
  // данные текущего пользователя
  const currentUser = useContext(CurrentUserContext);
  const inputProfileEmailSelector = `profile__${inputEmailSelector}`;
  const inputProfileTextSelector = `profile__${inputTextSelector}`;
  // валидация
  const { handleChange, errors, resetForm, setValues, values, isValid } =
    useFormAndValidation();
  const inputText = values[inputProfileTextSelector];
  const inputEmail = values[inputProfileEmailSelector];
  const errorsInputText = errors[inputProfileTextSelector];
  const errorsInputEmail =
    isValidEmail !== isValid && inputEmail !== undefined
      ? "Должен быть действительный адрес электронной почты"
      : errors[inputProfileEmailSelector];
  // наличие текста ошибки для каждого из полей
  const conditionForClassListText = conditionForClassList(errorsInputText);
  const conditionForClassListEmail = conditionForClassList(errorsInputEmail);
  const conditionDisabled =
    inputText === undefined ||
    inputEmail === undefined ||
    (inputText === currentUser.name && inputEmail === currentUser.email);
  // обработка клика по кнопке
  const handleClick = (e) => {
    e.preventDefault();
    // передать значения управляемых компонентов во внешний обработчик
    onClickEditButton({
      name: inputText,
      email: inputEmail,
    });
  };
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
    <>
      <Header
        onMovies={onMovies}
        onSavedMovies={onSavedMovies}
        onMenuClick={onMenuClick}
        onProfile={onProfile}
        type={type}
      />
      <Navigation
        isMenuOpen={isMenuOpen}
        onMenuClick={onMenuClick}
        onMovies={onMovies}
        onSavedMovies={onSavedMovies}
      />
      <section className="profile">
        <div className="profile__container">
          <h1 className="profile__title title">Привет, {currentUser.name}</h1>
          <form className="profile__form" noValidate>
            <fieldset className="profile__cell cell line">
              <p className="profile__placeholder">Имя</p>
              <input
                type="text"
                id="profile-name-text"
                name="profile__input_type_name-text"
                className={`profile__input profile__input_type_name-text ${
                  conditionForClassListEmail && "input_type_error"
                } ${
                  !conditionForClassListEmail &&
                  inputEmail &&
                  "input_type_active"
                } ${conditionForClassListEmail && "input_type_error-focus"}`}
                minLength="2"
                maxLength="40"
                value={inputText || ""}
                onChange={handleChange}
                placeholder={currentUser.name}
                required
              />
              <span
                className={`profile-name-text-error ${
                  conditionForClassListText && "input-error"
                }`}
              >
                {errorsInputText}
              </span>
            </fieldset>
            <fieldset className="profile__cell cell line">
              <p className="profile__placeholder">E-mail</p>
              <input
                type="email"
                id="profile-email"
                name="profile__input_type_email"
                className={`profile__input profile__input_type_email ${
                  conditionForClassListEmail && "input_type_error"
                } ${
                  !conditionForClassListEmail &&
                  inputEmail &&
                  "input_type_active"
                } ${conditionForClassListEmail && "input_type_error-focus"}`}
                value={inputEmail || ""}
                onChange={handleChange}
                autoComplete="off"
                placeholder={currentUser.email}
                required
              />
              <span
                className={`profile-email-text-error ${
                  conditionForClassListEmail && "input-error"
                }`}
              >
                {errorsInputEmail}
              </span>
            </fieldset>
          </form>
          <div className="profile__container-exit">
            <p
              className={`profile__error-message error-message ${
                isSuccessMessage !== "" && "error-message_success"
              }`}
            >
              {textMessage}
            </p>
            <button
              type="button"
              name="edit-button"
              aria-label='Кнопка "Редактировать"'
              className="profile__edit-button button indicator"
              onClick={handleClick}
              disabled={
                !conditionDisabled && isValid && isValidEmail ? false : true
              }
            >
              <Link
                className={`profile__edit-link link ${
                  !conditionDisabled && isValid && isValidEmail
                    ? "indicator"
                    : "indicator_disabled"
                }`}
              >
                Редактировать
              </Link>
            </button>
            <button
              type="button"
              name="exit-button"
              aria-label='Кнопка "Выйти"'
              className="profile__exit-button button indicator"
              onClick={onClickExitButton}
            >
              <Link className="profile__exit-link link">Выйти из аккаунта</Link>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

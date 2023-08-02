// Profile — компонент страницы изменения профиля
import Header from "./Header";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";

export default function Profile({ onMenuClick, isMenuOpen }) {
  return (
    <>
      <Header onMenuClick={onMenuClick} />
      <Navigation isMenuOpen={isMenuOpen} onMenuClick={onMenuClick} />
      <section className="profile">
        <div className="profile__container">
          <h1 className="profile__title title">Привет, Анастасия!</h1>
          <form className="profile__form">
            <fieldset className="profile__cell cell line">
              <p className="profile__placeholder">Имя</p>
              <input
                type="text"
                id="profile-name-text"
                name="profile__input_type_name-text"
                className="profile__input profile__input_type_name-text"
                minLength="2"
                maxLength="40"
                required
              />
              <span className="profile-name-text-error"></span>
            </fieldset>
            <fieldset className="profile__cell cell line">
              <p className="profile__placeholder">E-mail</p>
              <input
                type="email"
                id="profile-email"
                name="profile__input_type_email"
                className="profile__input profile__input_type_email"
                autoComplete="off"
                required
              />
              <span className="profile-email-text-error"></span>
            </fieldset>
          </form>
          <div className="profile__container-exit">
            <button
              type="button"
              name="edit-button"
              aria-label='Кнопка &quot;Редактировать&quot;'
              className="profile__edit-button button indicator"
            >
              <Link className="profile__edit-link link" to="/profile">
                Редактировать
              </Link>
            </button>
            <button
              type="button"
              name="exit-button"
              aria-label='Кнопка &quot;Выйти&quot;'
              className="profile__exit-button button indicator"
            >
              <Link className="profile__exit-link link" to="/">
                Выйти из аккаунта
              </Link>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

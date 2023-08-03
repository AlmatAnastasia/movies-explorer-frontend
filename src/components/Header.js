// Header — компонент, который отрисовывает шапку сайта на страницу
import { Link } from "react-router-dom";
import headerLogo from "../images/logo.svg";

export default function Header({ onMenuClick }) {
  return (
    <header className="header">
      <Link className="header__logo-link link" to="/">
        <img
          className="header__logo"
          src={headerLogo}
          alt='Логотип сервиса &quot;Фильмы&quot;'
        />
      </Link>
      <nav className="header__navigation">
        <ul className="header__movies-links list">
          <li>
            <Link
              className="header__movies-link link header__movies-link_active"
              to="/movies"
            >
              Фильмы
            </Link>
          </li>
          <li>
            <Link className="header__movies-link link" to="/saved-movies">
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <ul className="header__profile-links list">
          <li>
            <Link className="header__profile-link link" to="/profile">
              Аккаунт
            </Link>
          </li>
          <li>
            <Link className="header__profile-link link" to="/profile">
              <button
                type="button"
                name="edit-button"
                aria-label='Кнопка &quot;Редактировать&quot;'
                className="header__profile-edit-button indicator"
              ></button>
            </Link>
          </li>
        </ul>
        <button
          type="button"
          name="menu-button"
          aria-label='Кнопка &quot;Меню&quot;'
          className="header__profile-menu-button indicator"
          onClick={onMenuClick}
        ></button>
      </nav>
    </header>
  );
}

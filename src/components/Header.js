// Header — компонент, который отрисовывает шапку сайта на страницу
import { Link } from "react-router-dom";
import headerLogo from "../images/logo.svg";

export default function Header({
  onMovies,
  onSavedMovies,
  onMenuClick,
  onProfile,
  type,
}) {
  const loggedIn = type === "main";
  return (
    <header className={`header ${loggedIn && "header_loggedIn"}`}>
      <Link className="header__logo-link link" to="/">
        {type !== "main" && (
          <img
            className="header__logo"
            src={headerLogo}
            alt='Логотип сервиса "Фильмы"'
          />
        )}
      </Link>
      <nav className="header__navigation">
        <ul
          className={`header__movies-links list ${
            loggedIn && "header__movies-links_loggedIn"
          }`}
        >
          <li>
            <Link
              className="header__movies-link link header__movies-link_active"
              onClick={onMovies}
              to="/movies"
            >
              Фильмы
            </Link>
          </li>
          <li>
            <Link
              className="header__movies-link link"
              onClick={onSavedMovies}
              to="/saved-movies"
            >
              Сохранённые фильмы
            </Link>
          </li>
        </ul>

        <ul
          className={`header__profile-links list ${
            loggedIn && "header__profile-links_loggedIn"
          }`}
        >
          <li>
            <Link
              className="header__profile-link link"
              onClick={onProfile}
              to="/profile"
            >
              Аккаунт
            </Link>
          </li>
          <li>
            <Link
              className="header__profile-link link"
              onClick={onProfile}
              to="/profile"
            >
              <button
                type="button"
                name="edit-button"
                aria-label='Кнопка "Редактировать"'
                className="header__profile-edit-button indicator"
              ></button>
            </Link>
          </li>
        </ul>
        <button
          type="button"
          name="menu-button"
          aria-label='Кнопка "Меню"'
          className="header__profile-menu-button indicator"
          onClick={onMenuClick}
        />
      </nav>
    </header>
  );
}

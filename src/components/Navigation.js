// Navigation — компонент, который отвечает за меню навигации на сайте
import { Link } from "react-router-dom";
export default function Navigation({ isMenuOpen, onMenuClick }) {
  return (
    <section className={`menu ${isMenuOpen && "menu_opened"}`}>
      <div className="menu__container">
        <button
          type="button"
          name="close-button"
          aria-label='Кнопка "&quot;Закрыть&quot;'
          className="menu__close-button indicator"
          onClick={onMenuClick}
        ></button>
        <nav className="menu__navigation center">
          <ul className="menu__movies-links list">
            <li>
              <Link className="menu__movies-link link" to="/">
                Главная
              </Link>
            </li>
            <li>
              <Link className="menu__movies-link link" href="/movies">
                Фильмы
              </Link>
            </li>
            <li>
              <Link className="menu__movies-link link" to="/saved-movies">
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
          <ul className="menu__profile-links list">
            <li>
              <Link
                className="menu__profile-link link"
                to="/profile"
                onClick={onMenuClick}
              >
                Аккаунт
              </Link>
            </li>
            <li>
              <Link className="menu__profile-link link" to="/profile">
                <button
                  type="button"
                  name="edit-button"
                  aria-label='Кнопка &quot;Редактировать&quot;'
                  className="menu__profile-edit-button indicator"
                  onClick={onMenuClick}
                ></button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}

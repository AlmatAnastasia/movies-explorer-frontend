// Footer — презентационный компонент, который отрисовывает подвал
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <section className="footer center">
      <h2 className="footer__title line">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <ul className="footer__links list">
        <li className="footer__item">
          <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        </li>
        <li className="footer__item">
          <Link
            className="footer__link link"
            to="https://practicum.yandex.ru/"
            target="_blank"
            rel="noreferrer"
          >
            Яндекс.Практикум
          </Link>
        </li>
        <li className="footer__item">
          <Link
            className="footer__link link"
            to="https://github.com/AlmatAnastasia"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </Link>
        </li>
      </ul>
    </section>
  );
}

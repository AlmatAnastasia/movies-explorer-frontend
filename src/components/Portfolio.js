// Portfolio — компонент со ссылками на другие проекты
import { Link } from "react-router-dom";
export default function Portfolio() {
  return (
    <>
      <p className="student__portfolio">Портфолио</p>
      <ul className="student__portfolio-works list">
        <li className="student__portfolio-work">
          <Link
            className="student__work-link link"
            to="https://github.com/AlmatAnastasia/How-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            <p className="student__work-text">Статичный сайт</p>
            <p className="student__work-pointer">↗</p>
          </Link>
        </li>
        <li className="student__portfolio-work">
          <Link
            className="student__work-link link"
            to="https://github.com/AlmatAnastasia/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            <p className="student__work-text">Адаптивный сайт</p>
            <p className="student__work-pointer">↗</p>
          </Link>
        </li>
        <li className="student__portfolio-work">
          <Link
            className="student__work-link link"
            to="https://github.com/AlmatAnastasia/express-mesto-gha"
            target="_blank"
            rel="noreferrer"
          >
            <p className="student__work-text">Одностраничное приложение</p>
            <p className="student__work-pointer">↗</p>
          </Link>
        </li>
      </ul>
    </>
  );
}

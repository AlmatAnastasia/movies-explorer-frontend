// AboutMe — компонент с информацией о студенте
import Portfolio from "./Portfolio";
import { Link } from "react-router-dom";
import studentAvatar from "../images/student-image-avatar.jpg";

export default function AboutMe() {
  return (
    <section className="student">
      <h2 className="student__title title-line">Студент</h2>
      <div className="student__container">
        <div className="student__intro">
          <h3 className="student__intro-title">Анастасия</h3>
          <p className="student__intro-text">Фронтенд-разработчик, 23 года</p>
          <p className="student__intro-about">
            Я родилась в Казани, но живу в Москве (Химки), закончила факультет
            &quot;Радио и телевидение&quot;, направление
            &quot;Программно-защищенные инфокоммуникации&quot; Московского
            технического университета связи и информатики. Я люблю слушать
            музыку, смотреть сериалы и есть печеньки. С 2023 года работаю в
            компании «Рольф Тех». После того, как прошла Яндекс.Практикума
            планирую заниматься фриланс-заказами и искать работу
            веб-разработчиком.
          </p>
        </div>
        <img
          className="student__avatar"
          src={studentAvatar}
          alt='Изображение &quot;Аватар студента&quot;'
        />
        <ul className="student__links list">
          <li>
            <Link
              className="student__link link"
              to="https://github.com/AlmatAnastasia"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </Link>
          </li>
        </ul>
      </div>
      <Portfolio />
    </section>
  );
}

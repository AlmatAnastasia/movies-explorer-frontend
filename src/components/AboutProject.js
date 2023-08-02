// AboutProject — компонент с описанием дипломного проекта.
export default function AboutProject() {
  return (
    <section className="about">
      <h2 className="about__title title-line">О проекте</h2>
      <div className="about__container">
        <h3 className="about__subtitle">Дипломный проект включал 5 этапов</h3>
        <p className="about__text">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <h3 className="about__subtitle">На выполнение диплома ушло 5 недель</h3>
        <p className="about__text">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className="about__container-time-bar">
        <p className="about__time">1 неделя</p>
        <p className="about__time">4 недели</p>
        <p className="about__work">Back-end</p>
        <p className="about__work">Front-end</p>
      </div>
    </section>
  );
}

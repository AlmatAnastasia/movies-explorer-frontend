// Techs — компонент с использованными технологиями.

export default function Techs() {
  return (
    <section className="technologies">
      <div className="technologies__container center">
        <h2 className="technologies__title title-line">Технологии</h2>
        <h3 className="technologies__subtitle">7 технологий</h3>
        <p className="technologies__info">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="technologies__list list">
          <li className="technologies__type">HTML</li>
          <li className="technologies__type">CSS</li>
          <li className="technologies__type">JS</li>
          <li className="technologies__type">React</li>
          <li className="technologies__type">Git</li>
          <li className="technologies__type">Express.js</li>
          <li className="technologies__type">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

// NotFound— компонент со страницей Not Found
import { Link, useNavigate } from "react-router-dom";
export default function NotFoundPage() {
  const navigate = useNavigate();
  // переместить по истории «Назад»
  const goBack = () => {
    navigate(-1);
  };
  return (
    <section className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <h2 className="not-found__subtitle">Страница не найдена</h2>
      </div>
      <Link className="not-found__link link" onClick={goBack}>
        Назад
      </Link>
    </section>
  );
}

// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством
import MoviesCard from "./MoviesCard";
import { movies } from "../utils/utils.js";
export default function MoviesCardList({ type }) {
  const savedMovies = type === "savedMovies";
  return (
    <section className="movies">
      <ul className="movies__list list">
        {savedMovies
          ? movies.map(
              (movie, i) =>
                movie.isSaved && (
                  <MoviesCard
                    key={movie._id}
                    movie={movie}
                    isActive={false}
                    isCompleted={false}
                  />
                )
            )
          : movies.map((movie, i) => (
              <MoviesCard
                key={movie._id}
                movie={movie}
                isActive={movie.isActive}
                isCompleted={movie.isCompleted}
              />
            ))}
      </ul>
      <button
        type="button"
        name="more-button"
        aria-label='Кнопка "Ещё"'
        className="movies__more-button indicator"
      >
        Ещё
      </button>
    </section>
  );
}

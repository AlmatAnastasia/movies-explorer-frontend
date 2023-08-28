// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством
import MoviesNotFound from "./MoviesNotFound";
import MoviesCard from "./MoviesCard";

export default function MoviesCardList({
  type,
  isNotFound,
  isSearchForm,
  movies,
  onSaveButtonClick,
  onMoreButtonClick,
  isMovieCounter,
  isSearchFormValid,
}) {
  const searchText = localStorage.getItem("searchText");
  const isSearchText = searchText === null ? false : true;
  const isMovies = movies === null ? false : true;
  return (
    <>
      {isNotFound.status === true ? (
        <MoviesNotFound isNotFound={isNotFound} />
      ) : (
        ((isSearchForm && isSearchFormValid) || isSearchText) &&
        isMovies && (
          <section className="movies">
            <ul className="movies__list list">
              {movies.slice(0, isMovieCounter.finalValue).map((movie) => (
                <MoviesCard
                  key={movie._id ? movie._id : movie.id}
                  type={type}
                  movie={movie}
                  onSaveButtonClick={onSaveButtonClick}
                />
              ))}
            </ul>
            {isMovieCounter.finalValue < movies.length && (
              <button
                type="button"
                name="more-button"
                aria-label='Кнопка "Ещё"'
                className="movies__more-button indicator"
                onClick={onMoreButtonClick}
              >
                Ещё
              </button>
            )}
          </section>
        )
      )}
    </>
  );
}

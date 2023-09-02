// MoviesCard — компонент одной карточки фильма
import { baseUrlServer, maxMinutes } from "../utils/utils.js";

export default function MoviesCard({ type, movie, onSaveButtonClick }) {
  const savedMovies = type === "savedMovies";
  const movieSaveButtonClassName =
    movie !== undefined &&
    `movie__save-button ${
      movie.status === "isSaved" && "movie__save-button_active indicator"
    } ${movie.status === "isComplited" && "movie__save-button_completed"} ${
      savedMovies &&
      movie.statusDelete === "isDelete" &&
      "movie__save-button_delete indicator"
    }`;
  const movieImageLink = savedMovies
    ? movie.image
    : baseUrlServer + movie.image.url;
  const minutes = movie.duration % maxMinutes;
  const hour = (movie.duration - minutes) / maxMinutes;
  // изменение состояния кнопки
  const handleButtonClick = () => {
    onSaveButtonClick(movie);
  };
  return (
    movie !== undefined && (
      <li className="movie">
        <a
          className="movie__link link"
          href={movie.trailerLink}
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="movie__poster"
            src={movieImageLink}
            alt={`Постер фильма &quot;${movie.nameRU}&quot;`}
          />
        </a>

        <div className="movie__infobox">
          <h2 className="movie__name much-text">{movie.nameRU}</h2>
          <p className="movie__duration">
            {hour !== 0 && `${hour}ч`}
            {`${minutes}м`}
          </p>
        </div>
        <button
          type="button"
          name="save-button"
          aria-label='Кнопка "Сохранить"'
          className={movieSaveButtonClassName}
          onClick={handleButtonClick}
        >
          {movie.status === "isSaved" && "Сохранить"}
        </button>
      </li>
    )
  );
}

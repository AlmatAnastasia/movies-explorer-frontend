// MoviesCard — компонент одной карточки фильма.
export default function MoviesCard({ movie, isActive, isCompleted }) {
  const movieSaveButtonClassName =
    movie !== undefined &&
    `movie__save-button indicator ${isActive && "movie__save-button_active"}`;
  return (
    movie !== undefined && (
      <li className="movie">
        <img
          className="movie__poster"
          src={movie.link}
          alt={`Постер фильма &quot;${movie.name}&quot;`}
        />
        <div className="movie__infobox">
          <h2 className="movie__name much-text">{movie.name}</h2>
          <p className="movie__duration">{movie.duration}</p>
        </div>
        <button
          type="button"
          name="save-button"
          aria-label='Кнопка &quot;Сохранить&quot;'
          className={
            isCompleted
              ? " movie__save-button movie__save-button_completed"
              : movieSaveButtonClassName
          }
        >
          {isActive && "Сохранить"}
        </button>
      </li>
    )
  );
}

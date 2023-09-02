// MoviesNotFound — компонент страницы с результатом поиска по фильмам

export default function MoviesNotFound({ isNotFound }) {
  return <p className="movies-not-found">{isNotFound.message}</p>;
}

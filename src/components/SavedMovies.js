// SavedMovies — компонент страницы с сохранёнными карточками фильмов
import Header from "./Header";
import SearchForm from "./SearchForm";
import MoviesCardList from "./MoviesCardList";
import Footer from "./Footer";
export default function SavedMovies() {
  const type = "savedMovies";
  return (
    <>
      <Header />
      <SearchForm />
      <MoviesCardList type={type} />
      <Footer />
    </>
  );
}

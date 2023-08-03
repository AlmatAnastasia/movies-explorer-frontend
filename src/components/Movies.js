// Movies — компонент страницы с поиском по фильмам
import Header from "./Header";
import SearchForm from "./SearchForm";
import MoviesCardList from "./MoviesCardList";
import Footer from "./Footer";
import Navigation from "./Navigation";
export default function Movies({ onMenuClick, isMenuOpen }) {
  const type = "movies";
  return (
    <>
      <Header onMenuClick={onMenuClick} />
      <Navigation isMenuOpen={isMenuOpen} onMenuClick={onMenuClick} />
      <SearchForm />
      <MoviesCardList type={type} />
      <Footer />
    </>
  );
}

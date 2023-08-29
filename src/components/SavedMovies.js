// SavedMovies — компонент страницы с сохранёнными карточками фильмов
import { useEffect } from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import SearchForm from "./SearchForm";
import MoviesCardList from "./MoviesCardList";
import Preloader from "./Preloader";
import Footer from "./Footer";

export default function SavedMovies({
  onMovies,
  onSavedMovies,
  onMenuClick,
  onProfile,
  isMenuOpen,
  isOpenMovies,
  isOpenSavedMovies,
  onSearchFormMoviesRender,
  onSearchFormSavedMoviesRender,
  onSubmit,
  isNotFound,
  isSaveData,
  onUpdateInputSearch,
  inputSearchValue,
  isShortMovie,
  onCheckboxChange,
  isRenderLoading,
  movies,
  onSearchListClick,
  isSearchList,
  setSearchFormValid,
  isSearchForm,
  onSaveButtonClick,
  onMoreButtonClick,
  isMovieCounter,
  isSearchFormValid,
}) {
  const type = "savedMovies";
  useEffect(() => {
    onSearchFormSavedMoviesRender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header
        onMovies={onMovies}
        onSavedMovies={onSavedMovies}
        onMenuClick={onMenuClick}
        onProfile={onProfile}
      />
      <Navigation
        isMenuOpen={isMenuOpen}
        onMenuClick={onMenuClick}
        onMovies={onMovies}
        onSavedMovies={onSavedMovies}
      />
      <SearchForm
        type={type}
        isOpenMovies={isOpenMovies}
        isOpenSavedMovies={isOpenSavedMovies}
        onSearchFormMoviesRender={onSearchFormMoviesRender}
        onSearchFormSavedMoviesRender={onSearchFormSavedMoviesRender}
        onSubmit={onSubmit}
        isNotFound={isNotFound}
        isSaveData={isSaveData}
        onUpdateInputSearch={onUpdateInputSearch}
        inputSearchValue={inputSearchValue}
        isShortMovie={isShortMovie}
        onCheckboxChange={onCheckboxChange}
        movies={movies}
        onSearchListClick={onSearchListClick}
        isSearchList={isSearchList}
        setSearchFormValid={setSearchFormValid}
      />
      {!isRenderLoading && (
        <MoviesCardList
          type={type}
          isNotFound={isNotFound}
          isSearchForm={isSearchForm}
          movies={movies}
          onSaveButtonClick={onSaveButtonClick}
          onMoreButtonClick={onMoreButtonClick}
          isMovieCounter={isMovieCounter}
          isSearchFormValid={isSearchFormValid}
        />
      )}
      {isRenderLoading && <Preloader />}
      <Footer />
    </>
  );
}

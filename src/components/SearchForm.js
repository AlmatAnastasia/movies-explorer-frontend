// SearchForm — форма поиска, куда пользователь будет вводить запрос
import { useEffect } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import {
  conditionForClassList,
  inputSearchTextSelector,
} from "../utils/utils.js";
import searchIcon from "../images/search-icon.svg";

export default function SearchForm({
  type,
  isOpenMovies,
  isOpenSavedMovies,
  onSearchFormMoviesRender,
  onSearchFormSavedMoviesRender,
  onSubmit,
  onUpdateInputSearch,
  isNotFound,
  isSaveData,
  inputSearchValue,
  isShortMovie,
  onCheckboxChange,
  movies,
  onSearchListClick,
  isSearchList,
  setSearchFormValid,
}) {
  const savedMovies = type === "savedMovies";
  const isOpen = savedMovies ? isOpenSavedMovies : isOpenMovies;
  // валидация
  const { handleChange, errors, setValues, resetForm } = useFormAndValidation();
  const errorsInputSearch = errors[inputSearchTextSelector];
  const isValid = errorsInputSearch ? false : true;
  // наличие текста ошибки
  const conditionForClassListSearch = conditionForClassList(errorsInputSearch);
  const shortMovieStatusBoolean =
    isSaveData.shortMovieStatus === "true" ? true : false;
  const conditionEqual =
    isSaveData.searchText === inputSearchValue &&
    shortMovieStatusBoolean === isShortMovie;
  const conditionDisabledButton =
    isNotFound.status === true || !isValid || conditionEqual;
  const conditionSearchListShow =
    inputSearchValue === null
      ? false
      : isNotFound.true !== true &&
        inputSearchValue.length !== 0 &&
        !conditionEqual &&
        isSearchList &&
        isValid;
  // нажатие на поле формы поиска
  const handleFormChange = (e) => {
    e.preventDefault();
    handleChange(e);
    // передать значение управляемого компонента во внешний обработчик
    const inputSearch = e.target.value;
    onUpdateInputSearch(inputSearch);
  };
  // изменение поля формы поиска
  const handleFormClick = () => {
    onSearchListClick();
  };
  // выбрать вариант из выпадающего списка
  const handleLinkClick = (e) => {
    const linkValue = e.target.textContent;
    onUpdateInputSearch(linkValue);
    onSearchListClick();
  };
  // очистка полей при монтировании
  useEffect(() => {
    resetForm();
    setValues({});
    onUpdateInputSearch(inputSearchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetForm, setValues, onUpdateInputSearch, isOpen]);
  // переключение состояния при размонтировании
  useEffect(() => {
    return () =>
      savedMovies
        ? onSearchFormSavedMoviesRender()
        : onSearchFormMoviesRender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // валидность поля формы поиска
  useEffect(() => {
    setSearchFormValid(isValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputSearchValue]);
  return (
    <section className="search">
      <form
        className="search__form"
        onSubmit={onSubmit}
        disabled={conditionDisabledButton}
        noValidate
      >
        <div className="search__container container-line">
          <img
            className="search__icon"
            src={searchIcon}
            alt='Иконка &quot;Начать поиск&quot;'
          />
          <input
            type="text"
            id="search-text"
            name="search__input_type_text"
            className={`search__input search__input_type_text ${
              savedMovies
                ? !isValid && "search__input_type_error-focus"
                : conditionEqual
                ? ""
                : !isValid && "search__input_type_error-focus"
            }`}
            placeholder="Фильм"
            minLength="2"
            maxLength="40"
            value={inputSearchValue || ""}
            onChange={handleFormChange}
            onClick={handleFormClick}
            required
          />
          <span
            className={`search-input-error ${
              conditionForClassListSearch &&
              "input-error_type_single input-error"
            }`}
          >
            {conditionForClassListSearch && "Нужно ввести ключевое слово"}
          </span>
          {conditionSearchListShow && (
            <ul className="search__list list">
              <li className="search__list-item"></li>
              {movies.map((movie, i) => (
                <li
                  className="search__list-item"
                  key={i}
                  onClick={handleLinkClick}
                >
                  {movie[movie.findName]}
                </li>
              ))}
            </ul>
          )}
          <button
            type="submit"
            name="submit-button"
            aria-label='Кнопка отправки формы &quot;Поиск&quot;'
            className="search__submit-button indicator"
            disabled={conditionDisabledButton}
          />
        </div>
        <div className="search__container">
          <input
            type="checkbox"
            id="search-checkbox"
            name="search__input_type_checkbox"
            className="search__input search__input_type_checkbox indicator"
            checked={isShortMovie || false}
            onChange={onCheckboxChange}
          />
          <label
            type="switch"
            name="switch"
            className="search__switch"
            htmlFor="search-checkbox"
          />
          <p className="search__short-movie">Короткометражки</p>
        </div>
      </form>
    </section>
  );
}

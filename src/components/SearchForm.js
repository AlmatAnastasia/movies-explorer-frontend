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
  // нажатие на поле формы поиска
  const handleFormChange = (e) => {
    e.preventDefault();
    handleChange(e);
    // передать значение управляемого компонента во внешний обработчик
    const inputSearch = e.target.value;
    onUpdateInputSearch(inputSearch);
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
            alt='Иконка "Начать поиск"'
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
          <button
            type="submit"
            name="submit-button"
            aria-label='Кнопка отправки формы "Поиск"'
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

// SearchForm — форма поиска, куда пользователь будет вводить запрос.
import searchIcon from "../images/search-icon.svg";

export default function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
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
            className="search__input search__input_type_text"
            placeholder="Фильм"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="search-input-error"></span>
          <button
            type="submit"
            name="submit-button"
            aria-label='Кнопка отправки формы &quot;Поиск&quot;'
            className="search__submit-button indicator"
          ></button>
        </div>
        <div className="search__container">
          <input
            type="checkbox"
            id="search-checkbox"
            name="search__input_type_checkbox"
            className="search__input search__input_type_checkbox indicator"
            minLength="2"
            maxLength="40"
            required
          />
          <label
            type="switch"
            name="switch"
            className="search__switch"
            htmlFor="search-checkbox"
          ></label>
          <p className="search__short-movie">Короткометражки</p>
        </div>
      </form>
    </section>
  );
}

// описание запросов к almatanastasia.diploma.nomoreparties.sbs
import { baseUrlServer, dataApi } from "../utils/utils.js";

class Api {
  // класс Api, который загружает данные с сервера

  // конструктор принимает: baseUrlServer, baseUrl
  constructor(baseUrlServer, { baseUrl, headers }) {
    this._baseUrlServer = baseUrlServer; // адрес сервера
    this._baseUrl = baseUrl; // адрес личного сервера
    this._type = headers["Content-Type"]; // 'Content-Type'
    this._moviesURL = `${baseUrl}/movies`;
    this._personalURL = `${baseUrl}/users/me`;
  }

  // приватные методы
  _checkForErrors(res) {
    // проверить ответ на ошибки

    if (res.ok) {
      // проверить ответа
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклонить промис
    }
  }

  _returnHeadersGET() {
    // вернуть данные для заголовка GET-запроса
    const token = localStorage.getItem("jwt"); // личный токен
    return {
      headers: {
        Accept: this._type,
        "Content-Type": this._type,
        authorization: token,
      },
    };
  }

  _returnHeadersDELETE() {
    // вернуть данные для заголовка DELETE-запроса
    const token = localStorage.getItem("jwt"); // личный токен
    return {
      method: "DELETE",
      headers: {
        Accept: this._type,
        "Content-Type": this._type,
        authorization: token,
      },
    };
  }

  _returnHeadersData() {
    // вернуть данные для заголовка
    const token = localStorage.getItem("jwt"); // личный токен
    return {
      Accept: this._type,
      "Content-Type": this._type,
      authorization: token,
    };
  }

  _request(url, options) {
    // вернуть результат проверки запроса (обработать результаты)
    return fetch(url, options).then(this._checkForErrors);
  }

  // публичные методы
  getInitialCards() {
    // загрузить карточки с сервера
    return this._request(this._moviesURL, this._returnHeadersGET());
  }

  getProfileInfo() {
    // загрузить информацию о пользователе с сервера
    return this._request(this._personalURL, this._returnHeadersGET());
  }

  editProfileInfo(name, email) {
    // редактировать профиль
    return this._request(this._personalURL, {
      method: "PATCH",
      headers: this._returnHeadersData(),
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    });
  }

  addMovie(movie) {
    // добавить новый
    return this._request(this._moviesURL, {
      method: "POST",
      headers: this._returnHeadersData(),
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${this._baseUrlServer}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `${this._baseUrlServer}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
      }),
    });
  }

  deleteMovie(id) {
    // удалить фильм
    return this._request(
      `${this._moviesURL}/${id}`,
      this._returnHeadersDELETE()
    );
  }
}

// Создание экземпляра класса
const api = new Api(baseUrlServer, dataApi);
export default api;

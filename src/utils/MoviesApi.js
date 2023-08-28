// описание запросов к beatfilm-movies
import { dataMoviesApi } from "../utils/utils.js";

class MoviesApi {
  // класс MoviesApi, который загружает данные с сервера

  // конструктор принимает: baseUrl и headers (authorization, 'Content-Type')
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl; // адрес сервера и идентификатор группы
    this._type = headers["Content-Type"]; // 'Content-Type'
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
        authorization: token,
      },
    };
  }

  _request(url, options) {
    // вернуть результат проверки запроса (обработать результаты)
    return fetch(url, options).then(this._checkForErrors);
  }

  // публичные методы
  getInitialCards() {
    // загрузить карточки с сервера
    return this._request(this._baseUrl, this._returnHeadersGET());
  }
}

// Создание экземпляра класса
const moviesApi = new MoviesApi(dataMoviesApi);
export default moviesApi;

// App — корневой компонент приложения
import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "./Main";
import Movies from "./Movies";
import SavedMovies from "./SavedMovies";
import Profile from "./Profile";
import Register from "./Register";
import Login from "./Login";
import NotFoundPage from "./NotFoundPage";
import ProtectedRouteElement from "./ProtectedRouteElement";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { register, authorize, checkToken } from "../utils/apiAuth.js";
import moviesApi from "../utils/MoviesApi.js";
import api from "../utils/MainApi.js";

function App() {
  const searchText = localStorage.getItem("searchText");
  const shortMovieStatus = localStorage.getItem("shortMovieStatus");
  // переменные состояния
  const [isSearchFormOpenMovies, setIsSearchFormOpenMovies] = useState(false);
  const [isSearchFormOpenSavedMovies, setIsSearchFormOpenSavedMovies] =
    useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [isShortSavedMovie, setIsShortSavedMovie] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [sortSavedMovies, setSortSavedMovies] = useState([]);
  const [isRenderLoading, setIsRenderLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState({
    status: false,
    message: "",
  });
  const [isRequestErrorMessage, setIsRequestErrorMessage] = useState("");
  const [isRequestSuccessMessage, setIsRequestSuccessMessage] = useState("");
  const [inputSearchMovie, setInputSearchMovie] = useState("");
  const [inputSearchSavedMovie, setInputSearchSavedMovie] = useState("");
  const [isSearchFormSubmit, setIsSearchFormSubmit] = useState(false);
  const [isSearchFormValid, setIsSearchFormValid] = useState(false);
  const [isWidth, setIsWidth] = useState(window.innerWidth);
  const [isMovieCounter, setIsMovieCounter] = useState({
    finalValue: 0,
    step: 0,
  });
  const [isSaveData, setIsSaveData] = useState({
    searchText: "",
    shortMovieStatus: null,
  });
  const [userRegister, setUserRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // статус пользователя
  const [currentUser, setCurrentUser] = useState({
    id: "",
    email: "",
    name: "",
    isGetData: false,
  });
  const navigate = useNavigate();
  const stringToBoolean = (stringValue) =>
    stringValue === "true" ? true : false;
  // переадресовать пользователя на страницу /sign-up
  const onRegister = () => {
    setIsRequestErrorMessage("");
    navigate("/sign-up", { replace: true });
  };
  // переадресовать пользователя на страницу /sign-in
  const onLogin = () => {
    setIsRequestErrorMessage("");
    navigate("/sign-in", { replace: true });
  };
  // переадресовать пользователя на страницу /profile
  const onProfile = () => {
    setIsRequestErrorMessage("");
    setIsRequestSuccessMessage("");
    navigate("/profile", { replace: true });
  };
  // открыть/закрыть форму поиска /movies
  const handleSearchFormMoviesRender = () => {
    setIsSearchFormOpenMovies(!isSearchFormOpenMovies);
  };
  // открыть/закрыть форму поиска /saved-movies
  const handleSearchFormSavedMoviesRender = () => {
    setIsSearchFormOpenSavedMovies(!isSearchFormOpenSavedMovies);
  };
  // переадресовать пользователя на страницу /movies
  const onMovies = () => {
    navigate("/movies", { replace: true });
    setIsSearchFormOpenMovies(true);
  };
  // переадресовать пользователя на страницу /saved-movies
  const onSavedMovies = () => {
    navigate("/saved-movies", { replace: true });
    setIsSearchFormOpenSavedMovies(true);
  };
  // открыть/закрыть меню
  const handleMenuButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // переключить чекбокс поиска короткометражек
  const handleSearchCheckboxMovieClick = () => {
    setIsShortMovie(!isShortMovie);
  };
  const handleSearchCheckboxSavedMovieClick = () => {
    setIsShortSavedMovie(!isShortSavedMovie);
  };
  // изменить статус поля формы поиска
  const changeSearchFormStatus = () => {
    setIsSearchFormSubmit(!isSearchFormSubmit);
  };
  // добавление фильмов
  const handleMoreButtonClick = () => {
    setIsMovieCounter({
      finalValue: isMovieCounter.finalValue + isMovieCounter.step,
      step: isMovieCounter.step,
    });
  };
  // отправка формы поиска
  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    e.preventDefault();
    changeSearchFormStatus();
    // очистить локальное хранилище (localStorage)
    localStorage.removeItem("searchText");
    localStorage.removeItem("movies");
    localStorage.removeItem("shortMovieStatus");
    // сохранить данные запроса в localStorage
    // сохранить текст запроса, найденные фильмы и состояние переключателя короткометражек
    localStorage.setItem("searchText", inputSearchMovie);
    localStorage.setItem("movies", JSON.stringify(movies));
    localStorage.setItem(
      "shortMovieStatus",
      isShortMovie === null ? false : isShortMovie
    );
  };

  // проверка результата запроса на ошибки
  const checkRequestForErrors = (res) => {
    if (res === 400) {
      setIsRequestErrorMessage("Ошибка 400: Ошибка проверки");
    } else if (res === 409) {
      setIsRequestErrorMessage("Ошибка 409: Такой пользователь уже существует");
    } else if (res === 401) {
      setIsRequestErrorMessage("Ошибка 401: Неправильные почта или пароль");
    } else {
      return 200;
    }
  };
  // добавить новый фильм на сервер
  const handleAddNewMovie = (movie) => {
    api
      .addMovie(movie)
      .then((newMovie) => {
        movie.status = "isComplited";
        newMovie.statusDelete = "isDelete";
        // расширенная копия текущего массива savedMovies
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((error) => console.log(`${error}. Запрос не выполнен!`)); // вывести ошибку в консоль
  };
  // удалить фильм с сервера
  const handleDeleteMovie = (movie) => {
    api
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((state) => state.filter((c) => c._id !== movie._id));
      })
      .catch((error) => console.log(`${error}. Запрос не выполнен!`)); // вывести ошибку в консоль
  };
  // удалить фильм и с сервера и из найденных фильмов
  const handleDeleteSavedMovie = (movie) => {
    // удалить фильм с сервера
    let id = "";
    savedMovies.forEach((savedMovie) => {
      if (savedMovie.movieId === movie.id) {
        id = savedMovie._id;
      }
    });
    api
      .deleteMovie(id)
      .then(() => {
        setSavedMovies((state) => state.filter((c) => c.movieId !== movie.id));
        movie.status = "isSaved";
      })
      .catch((error) => console.log(`${error}. Запрос не выполнен!`)); // вывести ошибку в консоль
  };
  // сохранение/удаление фильма
  const handleSaveButtonClick = (movie) => {
    if (movie.status === "isSaved") handleAddNewMovie(movie);
    if (movie.status === "isComplited") handleDeleteSavedMovie(movie);
    if (movie.statusDelete === "isDelete") handleDeleteMovie(movie);
  };
  // изменить собственную информацию (данные профиля) на личном сервере
  const handleEditButtonClick = ({ name, email }) => {
    setIsRenderLoading(true);
    api
      .editProfileInfo(name, email)
      .then((info) => {
        setIsRequestSuccessMessage("Данные профиля усешно сохранены!");
        const { _id, email, name } = info;
        // обновление данных о пользователе
        setCurrentUser({
          id: _id,
          email: email,
          name: name,
          isGetData: true,
        });
      })
      .catch((error) => {
        // обработать ошибки
        setIsRequestErrorMessage(error);
        console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
      })
      .finally(() => {
        setIsRenderLoading(false);
      });
  };
  // выход из аккаунта
  const handleExitButtonClick = () => {
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPassword");
    // очистить локальное хранилище (localStorage)
    setMovies([]);
    setIsShortMovie(false);
    localStorage.removeItem("searchText");
    localStorage.removeItem("shortMovieStatus");
    localStorage.removeItem("movies");
    // переадресовать пользователя на страницу /
    navigate("/", { replace: true });
  };
  // добавить параметры фильма
  const addMovieStatus = (name, movie) => {
    movie.findName = name;
  };
  // добавить сообщение с результатом поиска
  const addFindMessage = (findMovies) => {
    let findMessage = {};
    if (findMovies.length === 0) {
      findMessage = { status: true, message: "Ничего не найдено" };
    } else {
      findMessage = { status: false, message: "" };
    }
    setIsNotFound(findMessage);
  };
  // сортировка фильмов
  const sortMovies = (allMovies) => {
    const searchValue = inputSearchMovie.toLowerCase();
    let findMovies = [];
    allMovies.forEach((movie) => {
      // совпадение по nameRU и nameEN
      if (
        movie.nameRU.toLowerCase().includes(searchValue) &&
        movie.nameRU.toLowerCase().includes(searchValue)
      ) {
        addMovieStatus("nameRU", movie);
        findMovies.push(movie);
      } else {
        // совпадение по nameRU
        if (movie.nameRU.toLowerCase().includes(searchValue)) {
          addMovieStatus("nameRU", movie);
          findMovies.push(movie);
        }
        // совпадение по nameEN
        if (movie.nameEN.toLowerCase().includes(searchValue)) {
          addMovieStatus("nameEN", movie);
          findMovies.push(movie);
        }
      }
      findMovies.forEach((movie) => {
        const save = savedMovies.filter((m) => m.movieId === movie.id);
        save.length !== 0
          ? (movie.status = "isComplited")
          : (movie.status = "isSaved");
      });
      setMovies(findMovies);
      localStorage.removeItem("movies");
      localStorage.setItem("movies", JSON.stringify(findMovies));
      addFindMessage(findMovies);
    });
  };
  // запрос фильмов
  const requestMovies = () => {
    setIsRenderLoading(true);
    moviesApi
      .getInitialCards()
      .then((allMovies) => {
        sortMovies(allMovies);
      })
      .catch((error) => {
        // обработать ошибки
        setIsNotFound({
          status: true,
          message:
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
        });
        console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
      })
      .finally(() => {
        setIsRenderLoading(false);
      });
  };
  // добавить данные запроса из localStorage
  const addDataLocalStorage = () => {
    const movies = localStorage.movies
      ? JSON.parse(localStorage.getItem("movies"))
      : [];
    setInputSearchMovie(searchText);
    setIsShortMovie(stringToBoolean(shortMovieStatus));
    movies.forEach((movie) => {
      const save = savedMovies.filter((m) => m.movieId === movie.id);
      save.length !== 0
        ? (movie.status = "isComplited")
        : (movie.status = "isSaved");
    });
    setMovies(movies);
    setIsSaveData({
      searchText: searchText,
      shortMovieStatus: shortMovieStatus,
    });
  };
  // обработка отправки формы формы страницы Register
  // регистрация пользователя
  const handleSignUpSubmit = (inputText, inputEmail, inputPassword) => {
    return (e) => {
      e.preventDefault();
      // сохранить password и email в localStorage
      localStorage.setItem("userPassword", inputPassword);
      localStorage.setItem("userEmail", inputEmail);
      setIsRenderLoading(true);
      register(inputText, inputEmail, inputPassword)
        .then((res) => {
          // проверка результата запроса на ошибки
          const status = checkRequestForErrors(res);
          if (status === 200) {
            setUserRegister(true);
            setLoggedIn(true);
            // перенаправить на страницу /movies
            onMovies();
            // обновление данных о пользователе
            setCurrentUser({
              email: inputEmail,
              name: inputText,
              isGetData: true,
            });
          }
        })
        .catch((error) => console.log(`${error}. Запрос не выполнен!`)) // вывести ошибку в консоль
        .finally(() => {
          setIsRenderLoading(false);
        });
    };
  };
  // обработка отправки формы формы страницы Login
  // авторизация пользователя
  // проверка валидности токена
  const handleSignInSubmit = (inputEmail, inputPassword) => {
    return (e) => {
      e.preventDefault();
      // сохранить email и password в localStorage
      localStorage.setItem("userPassword", inputPassword);
      localStorage.setItem("userEmail", inputEmail);
      setIsRenderLoading(true);
      authorize(inputEmail, inputPassword)
        .then((res) => {
          // проверка результата запроса на ошибки
          const status = checkRequestForErrors(res);
          if (status === 200) {
            // сохранить токен в localStorage
            localStorage.setItem("jwt", res.token);
          }
        })
        // проверка наличия токена и его валидности
        .then(() => checkToken())
        .then((res) => {
          localStorage.setItem("userEmail", res.email);
          setLoggedIn(true);
          // перенаправить на страницу /movies
          onMovies();
          // обновление данных о пользователе
          setCurrentUser({
            email: inputEmail,
            isGetData: true,
          });
        })
        .catch((error) => {
          // обработать ошибки
          setIsRequestErrorMessage(error);
          console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
        })
        .finally(() => {
          setIsRenderLoading(false);
        });
    };
  };
  // загрузить карточки сохраненных фильмов с личного сервера
  const addSavedMovies = () => {
    api
      .getInitialCards()
      .then((allSavedMovies) => {
        allSavedMovies.map((movie) => (movie.statusDelete = "isDelete"));
        let resultMovies = allSavedMovies;
        // поиск короткометражек
        if (isShortSavedMovie) {
          const shortMovies = allSavedMovies.filter((movie) => {
            return movie.duration <= 40;
          });
          resultMovies = shortMovies;
        }
        setSavedMovies(resultMovies);
      })
      .catch((error) => {
        // обработать ошибки
        console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
      });
  };
  // перевод телефона из портретной ориентации в альбомную
  const updateWidthScreen = () => {
    setTimeout(() => {
      setIsWidth(window.innerWidth);
    }, 3000);
  };
  // проверка наличия токена и его валидности
  const handleTokenCheck = useCallback(() => {
    /* проверить, существует ли токен в хранилище браузера*/
    // присвоить токен переменной jwt
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
          }
        })
        .catch((error) => console.log(`${error}. Запрос не выполнен!`)); // вывести ошибку в консоль
    }
  }, []);
  // поиск короткометражек
  useEffect(() => {
    const saveMovies = JSON.parse(localStorage.getItem("movies"));
    const allMovies = saveMovies ? saveMovies : movies;
    const conditionEqual =
      isSaveData.searchText === inputSearchMovie &&
      stringToBoolean(isSaveData.shortMovieStatus) === isShortMovie;
    if (isShortMovie) {
      const shortMovies = allMovies.filter((movie) => {
        return movie.duration <= 40;
      });
      setMovies(shortMovies);
      // сохранить данные запроса в localStorage
      // сохранить найденные фильмы и состояние переключателя короткометражек
      if (!conditionEqual) {
        localStorage.removeItem("movies");
        localStorage.setItem("movies", JSON.stringify(shortMovies));
        localStorage.setItem("shortMovieStatus", isShortMovie);
      }
    }
    localStorage.removeItem("movies");
    localStorage.setItem("movies", JSON.stringify(allMovies));
    localStorage.setItem("shortMovieStatus", isShortMovie);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShortMovie, isRenderLoading]);
  // извлечь данные запроса из localStorage при монтировании Movies
  useEffect(() => {
    // добавить данные запроса из localStorage
    if (isSearchFormOpenMovies === true) {
      // добавить данные запроса из localStorage
      addDataLocalStorage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearchFormOpenMovies]);
  // загрузить данные с сервера при монтировании
  useEffect(() => {
    if (
      isSearchFormOpenMovies === true ||
      isSearchFormOpenSavedMovies === true
    ) {
      // загрузить карточки сохраненных фильмов с личного сервера
      addSavedMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearchFormOpenMovies, isSearchFormOpenSavedMovies]);
  // загрузить отсортированные сохраненные данные
  useEffect(() => {
    const sort = [];
    savedMovies.forEach((movie) => {
      if (movie.nameRU.toLowerCase().includes(inputSearchSavedMovie) === true) {
        sort.push(movie);
      }
    });
    const result = inputSearchSavedMovie === "" ? savedMovies : sort;
    setSortSavedMovies(result);
  }, [savedMovies, inputSearchSavedMovie]);
  // добавить информацию о пользователе с сервера
  useEffect(() => {
    const token = localStorage.getItem("jwt"); // личный токен
    if (token) {
      // эффект при монтировании
      api
        .getProfileInfo()
        .then((info) => {
          const { _id, email, name } = info;
          // обновление данных о пользователе
          setCurrentUser({
            id: _id,
            email: email,
            name: name,
            isGetData: true,
          });
        })
        .catch((error) => {
          // обработать ошибки
          console.log(`${error}. Запрос не выполнен!`); // вывести ошибку в консоль
        });
    }
  }, [loggedIn]);
  // Взаимодействие с сервером beatfilm-movies
  // загрузить карточки фильмов с сервера
  useEffect(() => {
    const conditionEqual =
      isSaveData.searchText === inputSearchMovie &&
      stringToBoolean(isSaveData.shortMovieStatus) === isShortMovie;
    const setData = isSaveData.shortMovieStatus !== null;
    if (!setData && inputSearchMovie) {
      // запрос фильмов
      requestMovies();
      localStorage.setItem("searchText", inputSearchMovie);
    }
    if (setData) {
      const conditionSearch =
        inputSearchMovie === null
          ? false
          : inputSearchMovie.length > 1 && !conditionEqual;
      if (conditionSearch) {
        // запрос фильмов
        requestMovies();
        localStorage.setItem("searchText", inputSearchMovie);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputSearchMovie, isShortMovie]);
  useEffect(() => {
    window.addEventListener("resize", updateWidthScreen);
    return () => window.removeEventListener("resize", updateWidthScreen);
  }, []);
  // адаптивный экран (количество фильмов)
  useEffect(() => {
    const widthScreen = window.innerWidth;
    if (1160 <= widthScreen) {
      setIsMovieCounter({ finalValue: 12, step: 3 });
    } else if (767 <= widthScreen) {
      setIsMovieCounter({ finalValue: 8, step: 2 });
    } else {
      setIsMovieCounter({ finalValue: 5, step: 2 });
    }
  }, [isWidth]);
  // эффект при монтировании
  useEffect(() => {
    // проверка наличия токена и его валидности
    handleTokenCheck();
  }, [handleTokenCheck]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          {/* страница «О проекте» */}
          <Route
            path="/"
            element={
              <Main
                onRegister={onRegister}
                onLogin={onLogin}
                onMovies={onMovies}
                onSavedMovies={onSavedMovies}
                onMenuClick={handleMenuButtonClick}
                onProfile={onProfile}
                islogged={loggedIn}
              />
            }
          />
          {/* страница «Фильмы» */}
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                islogged={loggedIn}
                element={Movies}
                onMovies={onMovies}
                onSavedMovies={onSavedMovies}
                onMenuClick={handleMenuButtonClick}
                onProfile={onProfile}
                isMenuOpen={isMenuOpen}
                isOpenMovies={isSearchFormOpenMovies}
                isOpenSavedMovies={isSearchFormOpenSavedMovies}
                onSearchFormMoviesRender={handleSearchFormMoviesRender}
                onSearchFormSavedMoviesRender={
                  handleSearchFormSavedMoviesRender
                }
                onSubmit={handleSearchFormSubmit}
                isNotFound={isNotFound}
                isSaveData={isSaveData}
                onUpdateInputSearch={setInputSearchMovie}
                inputSearchValue={inputSearchMovie}
                isShortMovie={isShortMovie}
                onCheckboxChange={handleSearchCheckboxMovieClick}
                isRenderLoading={isRenderLoading}
                movies={movies}
                setSearchFormValid={setIsSearchFormValid}
                isSearchForm={isSearchFormSubmit}
                onSaveButtonClick={handleSaveButtonClick}
                onMoreButtonClick={handleMoreButtonClick}
                isMovieCounter={isMovieCounter}
                isSearchFormValid={isSearchFormValid}
              />
            }
          />
          {/* страница «Сохранённые фильмы» */}
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                islogged={loggedIn}
                element={SavedMovies}
                onMovies={onMovies}
                onSavedMovies={onSavedMovies}
                onMenuClick={handleMenuButtonClick}
                onProfile={onProfile}
                isMenuOpen={isMenuOpen}
                isOpenMovies={isSearchFormOpenMovies}
                isOpenSavedMovies={isSearchFormOpenSavedMovies}
                onSearchFormMoviesRender={handleSearchFormMoviesRender}
                onSearchFormSavedMoviesRender={
                  handleSearchFormSavedMoviesRender
                }
                onSubmit={handleSearchFormSubmit}
                isNotFound={isNotFound}
                isSaveData={isSaveData}
                onUpdateInputSearch={setInputSearchSavedMovie}
                inputSearchValue={inputSearchSavedMovie}
                isShortMovie={isShortSavedMovie}
                onCheckboxChange={handleSearchCheckboxSavedMovieClick}
                isRenderLoading={isRenderLoading}
                movies={sortSavedMovies}
                setSearchFormValid={setIsSearchFormValid}
                isSearchForm={isSearchFormSubmit}
                onSaveButtonClick={handleSaveButtonClick}
                onMoreButtonClick={handleMoreButtonClick}
                isMovieCounter={isMovieCounter}
                isSearchFormValid={isSearchFormValid}
              />
            }
          />
          {/* страница страница с профилем пользователя */}
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                islogged={loggedIn}
                element={Profile}
                isMenuOpen={isMenuOpen}
                onMenuClick={handleMenuButtonClick}
                onMovies={onMovies}
                onSavedMovies={onSavedMovies}
                onClickEditButton={handleEditButtonClick}
                onClickExitButton={handleExitButtonClick}
                isErrorMessage={isRequestErrorMessage}
                isSuccessMessage={isRequestSuccessMessage}
                onProfile={onProfile}
              />
            }
          />
          {/* /sign-up — регистрация пользователя */}
          <Route
            path="/sign-up"
            element={
              <Register
                onLogin={onLogin}
                userRegister={userRegister}
                setUserRegister={setUserRegister}
                isErrorMessage={isRequestErrorMessage}
                onClick={handleSignUpSubmit}
              />
            }
          />
          {/* /sign-in — авторизация пользователя */}
          <Route
            path="/sign-in"
            element={
              <Login
                onRegister={onRegister}
                isErrorMessage={isRequestErrorMessage}
                onClick={handleSignInSubmit}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

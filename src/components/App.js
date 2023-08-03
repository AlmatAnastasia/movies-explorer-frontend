import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "./Main";
import Movies from "./Movies";
import SavedMovies from "./SavedMovies";
import Profile from "./Profile";
import Register from "./Register";
import Login from "./Login";
import NotFoundPage from "./NotFoundPage";

// App — корневой компонент приложения
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  // переадресовать пользователя на страницу /sign-up
  const onRegister = () => {
    navigate("/sign-up", { replace: true });
  };
  // переадресовать пользователя на страницу /sign-in
  const onLogin = () => {
    navigate("/sign-in", { replace: true });
  };
  // переадресовать пользователя на страницу /movies
  const onMovies = () => {
    navigate("/movies", { replace: true });
  };
  // открыть меню
  const handleMenuButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="page">
      <Routes>
        {/* страница «О проекте» */}
        <Route
          path="/"
          element={<Main />}
          onRegister={onRegister}
          onLogin={onLogin}
        />
        {/* страница «Фильмы» */}
        <Route
          path="/movies"
          element={
            <Movies
              onMenuClick={handleMenuButtonClick}
              isMenuOpen={isMenuOpen}
            />
          }
        />
        {/* страница «Сохранённые фильмы» */}
        <Route path="/saved-movies" element={<SavedMovies />} />
        {/* страница страница с профилем пользователя */}
        <Route
          path="/profile"
          element={
            <Profile
              onMenuClick={handleMenuButtonClick}
              isMenuOpen={isMenuOpen}
            />
          }
        />
        {/* /sign-up — регистрация пользователя */}
        <Route path="/sign-up" element={<Register onLogin={onLogin} />} />
        {/* /sign-in — авторизация пользователя */}
        <Route
          path="/sign-in"
          element={<Login onMovies={onMovies} onRegister={onRegister} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;

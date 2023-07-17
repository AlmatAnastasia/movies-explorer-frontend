import { Routes, Route } from "react-router-dom";
import Main from "./Main";
import Movies from "./Movies";
import SavedMovies from "./SavedMovies";
import Profile from "./Profile";
import Register from "./Register";
import Login from "./Login";

// App — корневой компонент приложения
function App() {
  return (
    <Routes>
      {/* страница «О проекте» */}
      <Route path="/" element={<Main />} />
      {/* страница «Фильмы» */}
      <Route path="/movies" element={<Movies />} />
      {/* страница «Сохранённые фильмы» */}
      <Route path="/saved-movies" element={<SavedMovies />} />
      {/* страница страница с профилем пользователя */}
      <Route path="/profile" element={<Profile />} />
      {/* /sign-up — регистрация пользователя */}
      <Route path="/sign-up" element={<Register />} />
      {/* /sign-in — авторизация пользователя */}
      <Route path="/sign-in" element={<Login />} />
      <Route
        path="*"
        // element={
        //   loggedIn ? (
        //     <Navigate to="/" replace />
        //   ) : (
        //     <Navigate to="/sign-in" replace />
        //   )
        // }
      />
    </Routes>
  );
}

export default App;

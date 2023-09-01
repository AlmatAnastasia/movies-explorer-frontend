// Main — компонент страницы «О проекте»
import Promo from "./Promo";
import AboutProject from "./AboutProject";
import Techs from "./Techs";
import AboutMe from "./AboutMe";
import Footer from "./Footer";

export default function Main({
  onRegister,
  onLogin,
  onMovies,
  onSavedMovies,
  onMenuClick,
  onProfile,
  isMenuOpen,
  islogged,
}) {
  return (
    <>
      <main className="main">
        <Promo
          onRegister={onRegister}
          onLogin={onLogin}
          onMovies={onMovies}
          onSavedMovies={onSavedMovies}
          onMenuClick={onMenuClick}
          onProfile={onProfile}
          isMenuOpen={isMenuOpen}
          islogged={islogged}
        />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
      <Footer />
    </>
  );
}

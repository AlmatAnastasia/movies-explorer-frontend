// Main — компонент страницы «О проекте»
import Promo from "./Promo";
import AboutProject from "./AboutProject";
import Techs from "./Techs";
import AboutMe from "./AboutMe";
import Footer from "./Footer";

export default function Main({ onRegister, onLogin }) {
  return (
    <>
      <main className="main">
        <Promo onRegister={onRegister} onLogin={onLogin} />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
      <Footer />
    </>
  );
}

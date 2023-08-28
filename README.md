# movies-explorer-frontend
## Фронтенд дипломной работы по курсам от Яндекс Практикума
-----
**_Содержание файла README.md_**

<p>
<a href="#description">Описание</a>
<br>
<a href="#links">Ссылки на проект</a>
<br>
<a href="#figma">Ссылка на макет в Figma</a>
<br>
<a href="#demo">Демонстрация</a>
<br>
<a href="#file_structure">Файловая структура</a>
<br>
<a href="#technologies">Использованные технологии</a>
<br>
<a href="#functionality">Функциональность</a>
</p>

<div id="description"></div>
<h2>Описание</h2>
<p>Данный дипломный проект реализован и запущен с помощью Create React App и представляет собой сервис Movies на Реакте: интерактивную страницу, отображающую карточки фильмов.<br>
В каталоге проекта его можно запустить командой 'npm start movies-explorer-frontend'.</p>

<div id="links"></div>
<h2>Ссылки на проект</h2>
<p>Адрес репозитория: Frontend https://github.com/AlmatAnastasia/movies-explorer-frontend<br>
IP: 158.160.63.218<br>
Frontend:  https://almatanastasia.diploma.fr.nomoreparties.sbs</p>
Pull request: https://github.com/AlmatAnastasia/movies-explorer-frontend/pull/2</p>

<div id="figma"></div>
<h2>Ссылка на макет в Figma</h2> 
<p><a href="https://drive.google.com/file/d/19CypQ1yIBmWpqY8NOTTfrFZ1qE5oxUHf/view?usp=sharing">Макет</a>.</p>

<div id="demo"></div>
<h2>Демонстрация</h2>
<h3>Ссылка на сайт <a href="https://almatanastasia.github.io/react-mesto-auth/">тут</a> !</h3>
<img src="./src/images/Demo_main.png" alt="Демо страницы Main&quot;О проекте&quot;" width="900">

<div id="file_structure"></div>
<h2>Файловая структура</h2>
<pre>
.
├── public             # HTML<br>
├── src                # CSS, JS-файлы, шрифты и изображения<br>
├── .gitignore         # Файл для игнорирования/предотвращения передачи файлов<br>
├── .nojekyll          # Пустой файл для публикации на GitHub Pages<br>
├── package-lock.json  # Файл блокировки, содержащий информацию о зависимостях/пакетах с их точными номерами версий<br>
├── package.json       # Файл управления версиями, используемый для установки нескольких пакетов в проекте<br>
├── README.md          # Файл документации проекта<br>
</pre>
<h2>Файловая структура директории public</h2>
<pre>
.
└── index.html      # Главная страница сервиса
</pre>
<h2>Файловая структура директории src</h2>
<pre>
.
├── blocks          # Файлы стилей блоков<br>
├── components      # Файлы компонентов<br>
├── contexts        # Файлы с объектами контекста<br>
├── hooks           # Файлы с кастомными хуками<br>
├── images          # Файлы изображений<br>
├── utils           # Файлы утилитарных модулей (отдельные функции и константы)<br>
├── vendor          # Файлы сторонних библиотек<br>
├── index.css       # Файл стилей<br>
└── index.js        # Основной JavaScript файл, выполняющий развёртывание React-приложения
</pre>
<h2>Файловая структура директории vendor</h2>
<pre>
.
├── fonts           # Файлы шрифтов<br>
├── normalize.css   # CSS-файл, обеспечивающий для HTML-элементов лучшую кроссбраузерность в стилях по умолчанию<br>
</pre>

<div id="technologies"></div>
<h2>Использованные технологии</h2>
<p>
⬥ HTML<br>
⬥ CSS<br>
⬥ JS<br>
⬥ React<br>
⬥ Git<br>
⬥ Express.js<br>
⬥ mongoDB
</p>

<div id="functionality"></div>
<h2>Функциональность</h2>

<p>✶ Навигация по страницам:</p>
<p>1. / — страница «О проекте», основная функциональность приложения</p>
<img src="./src/images/Demo_main.png" alt="Демо страницы Main&quot;О проекте&quot;" width="900">
<p>2. /movies — страница «Фильмы»</p>
<img src="./src/images/Demo_movies.png" alt="Демо страницы Movies&quot;Фильмы&quot;" width="900">
<p>3. /saved-movies — страница «Сохранённые фильмы»</p>
<img src="./src/images/Demo_savedMovies.png" alt="Демо страницы Saved Movies&quot;Сохранённые фильмы&quot;" width="900">
<p>4. /profile — страница страница с профилем пользователя</p>
<img src="./src/images/Demo_profile.png" alt="Демо страницы Profile&quot;Профиль пользователя&quot;" width="900">
<p>5. /sign-up — регистрация пользователя</p>
<img src="./src/images/Demo_signUp.png" alt="Демо страницы Sign Up&quot;Регистрация пользователя&quot;" width="900">
<p>6. /sign-in — авторизация пользователя</p>
<img src="./src/images/Demo_signIn.png" alt="Демо страницы signIn&quot;Авторизация пользователя&quot;" width="900">
<p>7. * — Страница Not Found</p>
<img src="./src/images/Demo_notFound.png" alt="Демо страницы Not Found&quot;Не найдено&quot;" width="900">
<p>✶ Карточки фильмов</p>
<p>✶ Меню с навигацией на сайте</p>
<p>✶ Два состояния кнопок: обычное и при наведении</p>
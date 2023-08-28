export const baseUrlServer = "https://api.nomoreparties.co";
export const conditionForClassList = (errors) =>
  errors !== undefined && errors !== "";
export const inputSearchTextSelector = "search__input_type_text";
export const inputTextSelector = "input_type_name-text";
export const inputEmailSelector = "input_type_email";
export const inputPasswordSelector = "input_type_password";

export const dataMoviesApi = {
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies", // адрес сервера
  headers: {
    "Content-Type": "application/json",
  },
};

export const dataApi = {
  baseUrl: "https://almatanastasia.diploma.nomoreparties.sbs", // адрес личного сервера
  headers: {
    "Content-Type": "application/json",
  },
};

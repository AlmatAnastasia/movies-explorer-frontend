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

export const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED_ERROR: 401,
  CONFLICTING_REQUEST: 409,
};

export const maxDuration = 40;
export const maxMinutes = 60;

export const longScreenSize = 1160;
export const mediumScreenSize = 767;

export const MovieCounter = {
  oneInRow: { finalValue: 12, step: 3 },
  twoInRow: { finalValue: 8, step: 2 },
  threeInRow: { finalValue: 5, step: 2 },
};

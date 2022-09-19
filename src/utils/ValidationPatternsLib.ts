// prettier-ignore
export const VALIDATION_PATTERN_LIB = {
  username: "^([А-Я]{1}[-а-яё]{1,}|[A-Z]{1}[-a-z]{1,})$",
  login: "^(?![0-9]+$)[a-zA-Z0-9 ]{3,20}$",
  email: `^[\\w\-.]+\\@[\\w-]+[A-Za-z].[a-z]{2,4}$`,
  password: "^(?=.*[A-Z])(?=.*d).{8,40}$",
  phone: "^\\+?\\d{10,15}$",
  message: "^(?!s*$).+",
};

import { COUNTRIES_LANGUAGES, LANGUAGES_MAP } from "./languages.constants";

export const getShortCountryNameByLanguage = (language: string): string | undefined =>
  LANGUAGES_MAP[language] || COUNTRIES_LANGUAGES.find(({ name }) => name.includes(language))?.iso639_1;

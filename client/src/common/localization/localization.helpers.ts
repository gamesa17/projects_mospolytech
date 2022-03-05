import { useTranslation } from "react-i18next";
import { LocalizationsNamespaces } from "./localization.types";

export const useCommonTranslation = () => useTranslation(LocalizationsNamespaces.COMMON);

export const useMainPageTranslation = () => useTranslation(LocalizationsNamespaces.MAIN_PAGE);

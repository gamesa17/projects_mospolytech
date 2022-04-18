import { useTranslation } from "react-i18next";
import { LocalizationsNamespaces } from "./localization.types";

export const useCommonTranslation = () => useTranslation(LocalizationsNamespaces.COMMON);

export const useDashboardTranslation = () => useTranslation(LocalizationsNamespaces.DASHBOARD);

export const useAuthTranslation = () => useTranslation(LocalizationsNamespaces.AUTH);

export const useHomeworkTranslation = () => useTranslation(LocalizationsNamespaces.HOMEWORK);

export const useCoursesTranslation = () => useTranslation(LocalizationsNamespaces.COURSES);

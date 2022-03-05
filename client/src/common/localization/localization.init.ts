import i18n from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";
import { LocalizationsNamespaces } from "./localization.types";

i18n
  .use(initReactI18next)
  .use(
    resourcesToBackend((language, namespace, callback) => {
      import(
        /* webpackChunkName: "lazy~localization-[request]" */
        `./${language}/${namespace}.json`
      )
        .then((resources) => {
          callback(null, resources);
        })
        .catch((error) => {
          callback(error, null);
        });
    })
  )
  .init({
    lng: "ru",
    ns: Object.keys(LocalizationsNamespaces),
    interpolation: {
      escapeValue: false,
    },
  });

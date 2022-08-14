import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./assets/translations/en/translation.json";
import translationAR from "./assets/translations/ar/translation.json";



const fallbackLng = ["en"];
const availableLanguages = ["en", "ar", "fr"];

const resources = {
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationAR
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng,

    detection: {
      order: ['localStorage', 'path','querystring', 'cookie', 'sessionStorage', 'navigator', 'htmlTag',  'subdomain'],
      checkWhitelist: true,
      caches: ['localStorage', 'cookie'],
    },

    debug: false,

    whitelist: availableLanguages,

    loadPath: './assets//translations/{{lng}}/translation.json',

  });

export default i18n;

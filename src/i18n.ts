import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const supportedLocales = ["en", "es"]; // Your supported locales
const defaultLocale = "en"; // Your default locale

function getSupportedLocale(locale) {
  const languageCode = locale.split("-")[0];
  return supportedLocales.includes(languageCode) ? languageCode : defaultLocale;
}

export function loadLocaleMessages(locale: string): Promise<any> {
  return import(`@/locales/${locale}/index`).then((module) => module.default);
}

export const userLocale = getSupportedLocale(navigator.language);

export const i18n = new VueI18n({
  locale: userLocale,
  fallbackLocale: defaultLocale,
  messages: {}, // Messages will be loaded dynamically
});

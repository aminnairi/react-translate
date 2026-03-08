import { createTranslations } from "@aminnairi/react-translate";

export const { LocaleProvider, useTranslate, useLocale, defineTranslation } = createTranslations({
  initialLocale: "en",
  locales: [
    "fr",
    "en"
  ]
});

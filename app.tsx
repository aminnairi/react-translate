import { useCallback } from "react";
import { useLocale, useTranslations } from "./translate";

export function App() {
  const { locale, setLocale } = useLocale();

  const onEnglishSwitchButtonClick = useCallback(() => {
    setLocale("en")
  }, []);

  const onSpanishSwitchButtonClick = useCallback(() => {
    setLocale("es")
  }, []);

  const onFrenchSwitchButtonClick = useCallback(() => {
    setLocale("fr")
  }, []);

  const { translate } = useTranslations({
    title: {
      fr: "Bonjour, tout le monde !",
      en: "Hello, everyone!",
      es: "¡Holà, à todos!"
    }
  });

  return (
    <div>
      Locale: {locale}
      <button onClick={onEnglishSwitchButtonClick}>Switch to english</button>
      <button onClick={onFrenchSwitchButtonClick}>Passer en français</button>
      <button onClick={onSpanishSwitchButtonClick}>Cambiar al Español</button>
      <h1>{translate("title")}</h1>
    </div>
  );
}
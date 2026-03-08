import { useCallback } from "react";
import { defineTranslation, useTranslate, useLocale } from "./translate";

const title = defineTranslation((emails: number) => ({
  en: `Hello! You have ${emails} unread emails.`,
  fr: `Bonjour ! Vous avez ${emails} emails non-lus.`
}));

export function App() {
  const { locale, setLocale } = useLocale();

  console.log("re-render");

  const onEnglishSwitchButtonClick = useCallback(() => {
    setLocale("en")
  }, []);

  const onFrenchSwitchButtonClick = useCallback(() => {
    setLocale("fr")
  }, []);

  const translateTitle = useTranslate(title);

  return (
    <div>
      Locale: {locale}
      <button onClick={onEnglishSwitchButtonClick}>Switch to english</button>
      <button onClick={onFrenchSwitchButtonClick}>Passer en français</button>
      <h1>{translateTitle(456)}</h1>
    </div>
  );
}

import { createContext, type Dispatch, type ReactNode, type SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Translations<Locale extends string> = {
  [key in Locale]: string
}

export type TranslationFunction<Input, Locale extends string> = (input: Input) => Translations<Locale>

export interface InitializeTranslationsOptions<Locale extends string> {
  locales: Locale[],
  initialLocale: Locale
}

export interface TranslationContextInterface<Locale extends string> {
  locale: Locale
  setLocale: Dispatch<SetStateAction<Locale>>
}

export const TranslationContext = createContext<TranslationContextInterface<any>>({
  locale: "",
  setLocale: () => { }
})

export interface LocaleProviderProps {
  children: ReactNode
}

export const createTranslations = <Locale extends string>({ initialLocale }: InitializeTranslationsOptions<Locale>) => {
  const LocaleProvider = ({ children }: LocaleProviderProps) => {
    const [locale, setLocale] = useState(initialLocale);

    const value = useMemo(() => {
      return {
        locale,
        setLocale,
      };
    }, [locale]);

    useEffect(() => {
      console.log(`Locale changed: ${locale}`);
    }, [locale]);

    return (
      <TranslationContext.Provider value={value}>
        {children}
      </TranslationContext.Provider>
    );
  }

  const defineTranslation = <Input,>(translate: TranslationFunction<Input, Locale>): TranslationFunction<Input, Locale> => {
    return translate;
  }

  const useLocale = (): TranslationContextInterface<Locale> => {
    return useContext(TranslationContext);
  }

  const useTranslate = <Input extends unknown>(translate: TranslationFunction<Input, Locale>) => {
    const { locale } = useLocale();

    return useCallback((input: Input) => {
      return translate(input)[locale as keyof Translations<Locale>];
    }, [locale]);
  };

  return {
    defineTranslation,
    LocaleProvider,
    useTranslate,
    useLocale,
  }
}

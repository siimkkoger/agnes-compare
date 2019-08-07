export enum LanguageEnum {
    EST = "es",
    ENG = "en",
}

export function isValidLanguage(language?: string) {
    if (!language) {
        return false;
    }
    return language in [LanguageEnum.EST, LanguageEnum.ENG];
}

export function stringToLanguage(lang: string): LanguageEnum {
    if (lang === "es") {
        return LanguageEnum.EST;
    } else if (lang === "en") {
        return LanguageEnum.ENG;
    }
    return LanguageEnum.EST;
}

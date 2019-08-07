import {EvaluationData} from "@/classes/EvaluationData";
import {LanguageEnum} from "@/enums/LanguageEnum";
import {AppConfig} from "@/AppConfig";

export class LanguageService {
    public static getHypothesisChoices(language?: LanguageEnum) {
        return fetch(`${AppConfig.baseUrl}/hyp-choices`,
            {
                method: "POST",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrer: "no-referrer",
                body: JSON.stringify({
                    lang: language,
                }),
            },
        );
    }

    public static getFirstSentence(language: LanguageEnum, line: number, fileName: string) {
        return fetch(`${AppConfig.baseUrl}/firstSentence`,
            {
                method: "POST",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrer: "no-referrer",
                body: JSON.stringify({
                    lang: language,
                    sentence: line,
                    hypothesis: fileName,
                }),
            },
        );
    }

    public static getNextSentence() {
        return fetch(`${AppConfig.baseUrl}/nextSentence`,
            {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            },
        );
    }

    public static saveAnalysedData(evaluationData: EvaluationData) {
        return fetch(`${AppConfig.baseUrl}/evaluation`,
            {
                method: "POST",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrer: "no-referrer",
                body: JSON.stringify(evaluationData),
            });
    }
}

export enum SentenceEvaluationEnum {
    PERFECT = "PERFECT",
    INCOMPLETE = "INCOMPLETE",
    MEANING_CHANGED = "MEANING_CHANGED",
    NONSENSE = "NONSENSE",
}

export function getAllSentenceEvaluationValues() {
    return [
        SentenceEvaluationEnum.PERFECT,
        SentenceEvaluationEnum.INCOMPLETE,
        SentenceEvaluationEnum.MEANING_CHANGED,
        SentenceEvaluationEnum.NONSENSE,
    ];
}

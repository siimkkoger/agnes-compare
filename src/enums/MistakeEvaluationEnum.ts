export enum MistakeEvaluationEnum {
    NOT_CHANGED = "NOT_CHANGED",
    CORRECTED = "CORRECTED",
    INCOMPLETE = "INCOMPLETE",
    WRONG = "WRONG",
}

export function getAllMistakeEvaluationValues(): MistakeEvaluationEnum[] {
    return [
        MistakeEvaluationEnum.NOT_CHANGED,
        MistakeEvaluationEnum.CORRECTED,
        MistakeEvaluationEnum.INCOMPLETE,
        MistakeEvaluationEnum.WRONG,
    ];
}

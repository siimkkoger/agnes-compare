export enum MistakeTypeEnum {
    LEX = "LEX",
    SPELLING = "SPELLING",
    GRAMMAR = "GRAMMAR",
    ORDER = "ORDER",
}

export function getAllMistakeTypeEnum(): MistakeTypeEnum[] {
    return [
        MistakeTypeEnum.LEX,
        MistakeTypeEnum.SPELLING,
        MistakeTypeEnum.GRAMMAR,
        MistakeTypeEnum.ORDER,
    ];
}

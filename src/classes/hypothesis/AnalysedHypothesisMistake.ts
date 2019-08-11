import {MistakeEvaluationEnum} from "@/enums/MistakeEvaluationEnum";

export class AnalysedHypothesisMistake {
    private _mistakeId?: number;
    private _mistakeEvaluation?: MistakeEvaluationEnum;

    constructor(mistakeId?: number, mistakeEvaluation?: MistakeEvaluationEnum) {
        this._mistakeId = mistakeId;
        this._mistakeEvaluation = mistakeEvaluation;
    }

    get mistakeId(): number | undefined {
        return this._mistakeId;
    }

    set mistakeId(value: number | undefined) {
        this._mistakeId = value;
    }

    get mistakeEvaluation(): MistakeEvaluationEnum | undefined {
        return this._mistakeEvaluation;
    }

    set mistakeEvaluation(value: MistakeEvaluationEnum | undefined) {
        this._mistakeEvaluation = value;
    }
}

export function compareHypoMistakes(a: AnalysedHypothesisMistake, b: AnalysedHypothesisMistake) {
    const genreA: number | undefined = a.mistakeId;
    const genreB: number | undefined = b.mistakeId;

    let comparison = 0;
    if (genreA! < genreB!) {
        comparison = -1;
    } else if (genreA! > genreB!) {
        comparison = 1;
    }
    return comparison;
}

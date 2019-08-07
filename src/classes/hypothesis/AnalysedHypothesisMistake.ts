import {MistakeEvaluationEnum} from "@/enums/MistakeEvaluationEnum";

export class AnalysedHypothesisMistake {
    private _mistakeId: number;
    private _mistakeEvaluation?: MistakeEvaluationEnum;

    constructor(mistakeId: number, mistakeEvaluation?: MistakeEvaluationEnum) {
        this._mistakeId = mistakeId;
        this._mistakeEvaluation = mistakeEvaluation;
    }

    get mistakeId(): number {
        return this._mistakeId;
    }

    set mistakeId(value: number) {
        this._mistakeId = value;
    }

    get mistakeEvaluation(): MistakeEvaluationEnum | undefined {
        return this._mistakeEvaluation;
    }

    set mistakeEvaluation(value: MistakeEvaluationEnum | undefined) {
        this._mistakeEvaluation = value;
    }
}

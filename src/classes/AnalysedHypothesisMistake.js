import {Mistake} from "./Mistake";

export class AnalysedHypothesisMistake extends Mistake{

    _mistakeEvaluation;

    constructor(id, type, needToBeChanged, wordsInvolved, mistakeEvaluation) {
        super(id, type, needToBeChanged, wordsInvolved);
        this._mistakeEvaluation = mistakeEvaluation;
    }

    get mistakeEvaluation() {
        return this._mistakeEvaluation;
    }

    set mistakeEvaluation(value) {
        this._mistakeEvaluation = value;
    }
}
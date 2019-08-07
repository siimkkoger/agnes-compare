import {SentenceEvaluationEnum} from "@/enums/SentenceEvaluationEnum";
import {AnalysedHypothesisMistake} from "@/classes/hypothesis/AnalysedHypothesisMistake";

export class AnalysedHypothesis {
    private _note: string;
    private _unnecessaryChanges: boolean;
    private _sentenceEvaluation: SentenceEvaluationEnum;
    private _analysedMistakes: AnalysedHypothesisMistake[];

    constructor(
        note: string,
        unnecessaryChanges: boolean,
        sentenceEvaluation: SentenceEvaluationEnum,
        analysedMistakes: AnalysedHypothesisMistake[]) {
        this._note = note;
        this._unnecessaryChanges = unnecessaryChanges;
        this._sentenceEvaluation = sentenceEvaluation;
        this._analysedMistakes = analysedMistakes;
    }

    get note(): string {
        return this._note;
    }

    set note(value: string) {
        this._note = value;
    }

    get unnecessaryChanges(): boolean {
        return this._unnecessaryChanges;
    }

    set unnecessaryChanges(value: boolean) {
        this._unnecessaryChanges = value;
    }

    get sentenceEvaluation(): SentenceEvaluationEnum {
        return this._sentenceEvaluation;
    }

    set sentenceEvaluation(value: SentenceEvaluationEnum) {
        this._sentenceEvaluation = value;
    }

    get analysedMistakes(): AnalysedHypothesisMistake[] {
        return this._analysedMistakes;
    }

    set analysedMistakes(value: AnalysedHypothesisMistake[]) {
        this._analysedMistakes = value;
    }
}

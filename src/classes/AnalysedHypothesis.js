export class AnalysedHypothesis {

    _note = "";
    _unnecessaryChanges = false;
    _sentenceEvaluation = "null";
    _analysedMistakes = [];
    
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

    get sentenceEvaluation(): string {
        return this._sentenceEvaluation;
    }

    set sentenceEvaluation(value: string) {
        this._sentenceEvaluation = value;
    }

    get analysedMistakes(): Array {
        return this._analysedMistakes;
    }

    set analysedMistakes(value: Array) {
        this._analysedMistakes = value;
    }
}
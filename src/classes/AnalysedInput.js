export class AnalysedInput {
    _note = "";
    _mistakes = [];

    get note(): string {
        return this._note;
    }

    set note(value: string) {
        this._note = value;
    }

    get mistakes(): Array {
        return this._mistakes;
    }

    set mistakes(value: Array) {
        this._mistakes = value;
    }
}
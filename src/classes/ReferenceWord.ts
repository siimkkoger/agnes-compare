export class ReferenceWord {
    private _word: string;
    private _inComparison: boolean;

    constructor(word: string, inComparison: boolean) {
        this._word = word;
        this._inComparison = inComparison;
    }
    
    get word(): string {
        return this._word;
    }

    set word(value: string) {
        this._word = value;
    }

    get inComparison(): boolean {
        return this._inComparison;
    }

    set inComparison(value: boolean) {
        this._inComparison = value;
    }
}

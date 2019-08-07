import {Mistake} from "@/classes/Mistake";

export class AnalysedInput {
    private _note: string;
    private _mistakes: Mistake[];

    constructor(note: string, mistakes: Mistake[]) {
        this._note = note;
        this._mistakes = mistakes;
    }

    get note(): string {
        return this._note;
    }

    set note(value: string) {
        this._note = value;
    }

    get mistakes(): Mistake[] {
        return this._mistakes;
    }

    set mistakes(value: Mistake[]) {
        this._mistakes = value;
    }
}

import {ReferenceWord} from "@/classes/ReferenceWord";
import {InputWord} from "@/classes/input/InputWord";

export class InputComparison {
    private _inputSentence: InputWord[];
    private _referenceSentences: ReferenceWord[][];

    constructor(inputSentence: InputWord[], referenceSentences: ReferenceWord[][]) {
        this._inputSentence = inputSentence;
        this._referenceSentences = referenceSentences;
    }

    get inputSentence(): InputWord[] {
        return this._inputSentence;
    }

    set inputSentence(value: InputWord[]) {
        this._inputSentence = value;
    }

    get referenceSentences(): ReferenceWord[][] {
        return this._referenceSentences;
    }

    set referenceSentences(value: ReferenceWord[][]) {
        this._referenceSentences = value;
    }
}

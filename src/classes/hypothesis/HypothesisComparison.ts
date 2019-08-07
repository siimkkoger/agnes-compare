import {ReferenceWord} from "@/classes/ReferenceWord";
import {HypothesisWord} from "@/classes/hypothesis/HypothesisWord";

export class HypothesisComparison {
    private _hypSentence: HypothesisWord[];
    private _referenceSentences: ReferenceWord[][];

    constructor(hypSentence: HypothesisWord[], referenceSentences: ReferenceWord[][]) {
        this._hypSentence = hypSentence;
        this._referenceSentences = referenceSentences;
    }

    get hypSentence(): HypothesisWord[] {
        return this._hypSentence;
    }

    set hypSentence(value: HypothesisWord[]) {
        this._hypSentence = value;
    }

    get referenceSentences(): ReferenceWord[][] {
        return this._referenceSentences;
    }

    set referenceSentences(value: ReferenceWord[][]) {
        this._referenceSentences = value;
    }
}

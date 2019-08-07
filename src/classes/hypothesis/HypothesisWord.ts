import {ReferenceTagEnum} from "@/enums/ReferenceTagEnum";

export class HypothesisWord {
    private _word: string;
    private _referenceTag: ReferenceTagEnum;
    private _inInput: boolean;

    constructor(word: string, referenceTag: ReferenceTagEnum, inInput: boolean) {
        this._word = word;
        this._referenceTag = referenceTag;
        this._inInput = inInput;
    }

    get word(): string {
        return this._word;
    }

    set word(value: string) {
        this._word = value;
    }

    get referenceTag(): ReferenceTagEnum {
        return this._referenceTag;
    }

    set referenceTag(value: ReferenceTagEnum) {
        this._referenceTag = value;
    }

    get inInput(): boolean {
        return this._inInput;
    }

    set inInput(value: boolean) {
        this._inInput = value;
    }
}

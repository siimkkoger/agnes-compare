import {ReferenceTagEnum} from "@/enums/ReferenceTagEnum";

export class InputWord {
    private _word: string;
    private _referenceTag: ReferenceTagEnum;

    constructor(word: string, referenceTag: ReferenceTagEnum) {
        this._word = word;
        this._referenceTag = referenceTag;
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
}

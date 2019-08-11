import {MistakeTypeEnum} from "@/enums/MistakeTypeEnum";

export class Mistake {
    private _id?: number;
    private _type: MistakeTypeEnum;
    private _needToBeChanged: boolean;
    private _wordsInvolved: string[];

    constructor(id: number | undefined, type: MistakeTypeEnum, needToBeChanged: boolean, wordsInvolved: string[]) {
        this._id = id;
        this._type = type;
        this._needToBeChanged = needToBeChanged;
        this._wordsInvolved = wordsInvolved;
    }

    get id(): number | undefined {
        return this._id;
    }

    set id(value: number | undefined) {
        this._id = value;
    }

    get type(): MistakeTypeEnum {
        return this._type;
    }

    set type(value: MistakeTypeEnum) {
        this._type = value;
    }

    get needToBeChanged(): boolean {
        return this._needToBeChanged;
    }

    set needToBeChanged(value: boolean) {
        this._needToBeChanged = value;
    }

    get wordsInvolved(): string[] {
        return this._wordsInvolved;
    }

    set wordsInvolved(value: string[]) {
        this._wordsInvolved = value;
    }
}

export function compareMistakes(a: Mistake, b: Mistake) {
    const genreA: number | undefined = a.id;
    const genreB: number | undefined = b.id;

    let comparison = 0;
    if (genreA! < genreB!) {
        comparison = -1;
    } else if (genreA! > genreB!) {
        comparison = 1;
    }
    return comparison;
}

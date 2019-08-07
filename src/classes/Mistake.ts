import {MistakeTypeEnum} from "@/enums/MistakeTypeEnum";

export class Mistake {
    private _id: number;
    private _type: MistakeTypeEnum;
    private _needToBeChanged: boolean;
    private _wordsInvolved: string[];

    constructor(id: number, type: MistakeTypeEnum, needToBeChanged: boolean, wordsInvolved: string[]) {
        this._id = id;
        this._type = type;
        this._needToBeChanged = needToBeChanged;
        this._wordsInvolved = wordsInvolved;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
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

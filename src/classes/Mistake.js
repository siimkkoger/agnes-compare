export class Mistake {

    _id;
    _type;
    _needToBeChanged;
    _wordsInvolved = [];

    constructor(id, type, needToBeChanged, wordsInvolved) {
        this._id = id;
        this._type = type;
        this._needToBeChanged = needToBeChanged;
        this._wordsInvolved = wordsInvolved;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get needToBeChanged() {
        return this._needToBeChanged;
    }

    set needToBeChanged(value) {
        this._needToBeChanged = value;
    }

    get wordsInvolved() {
        return this._wordsInvolved;
    }

    set wordsInvolved(value) {
        this._wordsInvolved = value;
    }
}
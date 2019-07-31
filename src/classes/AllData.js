import {AnalysedHypothesis} from "./AnalysedHypothesis";
import {AnalysedInput} from "./AnalysedInput";
import {HypothesisComparison} from "./HypothesisComparison";

export class AllData {
    _analysedHypothesisSentence = new AnalysedHypothesis();
    _analysedInputSentence = new AnalysedInput();
    _hypothesisComparison = new HypothesisComparison();
    _inputComparison = new HypothesisComparison();

    constructor({analysedHypothesisSentence, analysedInputSentence, hypothesisComparison, inputComparison}) {
        this.analysedHypothesisSentence = analysedHypothesisSentence;
        this.analysedInputSentence = analysedInputSentence;
        this.hypothesisComparison = hypothesisComparison;
        this.inputComparison = inputComparison;
    }


    get analysedHypothesisSentence() {
        return this._analysedHypothesisSentence;
    }

    set analysedHypothesisSentence(value) {
        this._analysedHypothesisSentence = value;
    }

    get analysedInputSentence() {
        return this._analysedInputSentence;
    }

    set analysedInputSentence(value) {
        this._analysedInputSentence = value;
    }

    get hypothesisComparison() {
        return this._hypothesisComparison;
    }

    set hypothesisComparison(value) {
        this._hypothesisComparison = value;
    }

    get inputComparison() {
        return this._inputComparison;
    }

    set inputComparison(value) {
        this._inputComparison = value;
    }
}
import {AnalysedHypothesis} from "@/classes/hypothesis/AnalysedHypothesis";
import {AnalysedInput} from "@/classes/input/AnalysedInput";
import {HypothesisComparison} from "@/classes/hypothesis/HypothesisComparison";
import {InputComparison} from "@/classes/input/InputComparison";

export class AllData {
    private _analysedHypothesisSentence?: AnalysedHypothesis;
    private _analysedInputSentence?: AnalysedInput;
    private _hypothesisComparison?: HypothesisComparison;
    private _inputComparison?: InputComparison;

    get analysedHypothesisSentence(): AnalysedHypothesis | undefined {
        return this._analysedHypothesisSentence;
    }

    set analysedHypothesisSentence(value: AnalysedHypothesis | undefined) {
        this._analysedHypothesisSentence = value;
    }

    get analysedInputSentence(): AnalysedInput | undefined {
        return this._analysedInputSentence;
    }

    set analysedInputSentence(value: AnalysedInput | undefined) {
        this._analysedInputSentence = value;
    }

    get hypothesisComparison(): HypothesisComparison | undefined {
        return this._hypothesisComparison;
    }

    set hypothesisComparison(value: HypothesisComparison | undefined) {
        this._hypothesisComparison = value;
    }

    get inputComparison(): InputComparison | undefined {
        return this._inputComparison;
    }

    set inputComparison(value: InputComparison | undefined) {
        this._inputComparison = value;
    }
}

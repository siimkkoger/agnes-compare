import {AnalysedHypothesis} from "@/classes/hypothesis/AnalysedHypothesis";
import {AnalysedInput} from "@/classes/input/AnalysedInput";

export class EvaluationData {
    private _analysedHypothesisSentence?: AnalysedHypothesis;
    private _analysedInputSentence?: AnalysedInput;

    constructor(analysedHypothesisSentence?: AnalysedHypothesis, analysedInputSentence?: AnalysedInput) {
        this._analysedHypothesisSentence = analysedHypothesisSentence;
        this._analysedInputSentence = analysedInputSentence;
    }

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
}

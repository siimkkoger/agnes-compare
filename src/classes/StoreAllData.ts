import Vue from "vue";
import {AllData} from "@/classes/AllData";
import {AnalysedHypothesis} from "@/classes/hypothesis/AnalysedHypothesis";
import {AnalysedInput} from "@/classes/input/AnalysedInput";
import {HypothesisComparison} from "@/classes/hypothesis/HypothesisComparison";
import {InputComparison} from "@/classes/input/InputComparison";
import {Mistake} from "@/classes/Mistake";

export const store = Vue.observable({
    allData: new AllData(),
});

export const storeMutations = {
    setAllData(allData: AllData) {
        store.allData = allData;
    },
    setAnalysedHypothesisSentence(analysedHypothesisSentence: AnalysedHypothesis) {
        store.allData.analysedHypothesisSentence = analysedHypothesisSentence;
    },
    setAnalysedInputSentence(analysedInputSentence: AnalysedInput) {
        store.allData.analysedInputSentence = analysedInputSentence;
    },
    setHypothesisComparison(hypothesisComparison: HypothesisComparison) {
        store.allData.hypothesisComparison = hypothesisComparison;
    },
    setInputComparison(inputComparison: InputComparison) {
        store.allData.inputComparison = inputComparison;
    },
    addInputMistake(mistake: Mistake) {
        if (store.allData.analysedInputSentence) {
            store.allData.analysedInputSentence.mistakes.push(mistake);
        } else {
            store.allData.analysedInputSentence = new AnalysedInput("default note", [mistake]);
        }
    },
    addInputNote(note: string) {
        if (store.allData.analysedInputSentence) {
            store.allData.analysedInputSentence.note = note;
        } else {
            store.allData.analysedInputSentence = new AnalysedInput(note, []);
        }
    },
};

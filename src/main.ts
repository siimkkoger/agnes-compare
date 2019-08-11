import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import {AllData} from "@/classes/AllData";
import {AnalysedHypothesis} from "@/classes/hypothesis/AnalysedHypothesis";
import {AnalysedInput} from "@/classes/input/AnalysedInput";
import {HypothesisComparison} from "@/classes/hypothesis/HypothesisComparison";
import {InputComparison} from "@/classes/input/InputComparison";
import {compareMistakes, Mistake} from "@/classes/Mistake";
import {MistakeTypeEnum} from "@/enums/MistakeTypeEnum";
import {SentenceEvaluationEnum} from "@/enums/SentenceEvaluationEnum";
import {AnalysedHypothesisMistake, compareHypoMistakes} from "@/classes/hypothesis/AnalysedHypothesisMistake";

Vue.config.productionTip = false;

Vue.use(Vuex);
const dataStore: any = new Vuex.Store<any>({
    state: {
        allData: new AllData(),
    },
    getters: {
        allData: () => dataStore.state.allData,
        analysedHypothesisSentence: () => dataStore.state.allData.analysedHypothesisSentence,
        analysedInputSentence: () => dataStore.state.allData.analysedInputSentence,
        hypothesisComparison: () => dataStore.state.allData.hypothesisComparison,
        inputComparison: () => dataStore.state.allData.inputComparison,
    },
    mutations: {
        setAllData: (state, allData: AllData) => {
            state.allData = allData;
            if (!state.allData.analysedHypothesisSentence || !state.allData.analysedHypothesisSentence.analysedMistakes) {
                state.allData.analysedHypothesisSentence =
                    new AnalysedHypothesis("", false, SentenceEvaluationEnum.INCOMPLETE, []);
            }
            if (!state.allData.analysedInputSentence || !state.allData.analysedInputSentence.mistakes) {
                state.allData.analysedInputSentence = new AnalysedInput("", []);
            }
            for (let i = 0; i < state.allData.analysedInputSentence.mistakes.length; i++) {
                const inputMistake: Mistake = state.allData.analysedInputSentence.mistakes[i];
                let inHypothesis: boolean = false;
                for (let j = 0; j < state.allData.analysedHypothesisSentence.analysedMistakes.length; j++) {
                    if (state.allData.analysedHypothesisSentence.analysedMistakes[j].mistakeId === inputMistake.id) {
                        inHypothesis = true;
                    }
                }
                if (!inHypothesis) {
                    const hypothesisMistake: AnalysedHypothesisMistake =
                        state.allData.analysedHypothesisSentence.analysedMistakes[i];
                    if (!hypothesisMistake || inputMistake.id !== hypothesisMistake.mistakeId) {
                        state.allData.analysedHypothesisSentence.analysedMistakes
                            .splice(i, 0, new AnalysedHypothesisMistake(inputMistake.id, undefined));
                    }
                }
            }
            state.allData.analysedHypothesisSentence.analysedMistakes.sort(compareHypoMistakes);
            state.allData.analysedInputSentence.mistakes.sort(compareMistakes);
        },
        setAnalysedHypothesisSentence: (state, analysedHypothesisSentence: AnalysedHypothesis) => {
            state.allData.analysedHypothesisSentence = analysedHypothesisSentence;
        },
        setAnalysedInputSentence: (state, analysedInputSentence: AnalysedInput) => {
            state.allData.analysedInputSentence = analysedInputSentence;
        },
        setHypothesisComparison: (state, hypothesisComparison: HypothesisComparison) => {
            state.allData.hypothesisComparison = hypothesisComparison;
        },
        setInputComparison: (state, inputComparison: InputComparison) => {
            state.allData.inputComparison = inputComparison;
        },
        addInputMistake: (state, mistake: Mistake) => {
            const inputMistakes: Mistake[] = dataStore.state.allData.analysedInputSentence.mistakes;
            if (inputMistakes.length === 0) {
                mistake.id = 0;
            } else {
                mistake.id = inputMistakes[inputMistakes.length - 1].id! + 1;
            }
            inputMistakes.push(mistake);
            const hypMistake = new AnalysedHypothesisMistake(mistake.id, undefined);
            state.allData.analysedHypothesisSentence.analysedMistakes.push(hypMistake);
        },
        deleteInputMistake: (state, mistakeId: number) => {
            for (let i = 0; i < state.allData.analysedInputSentence.mistakes.length; i++) {
                const mistake: Mistake = state.allData.analysedInputSentence.mistakes[i];
                if (mistake.id === mistakeId) {
                    state.allData.analysedInputSentence.mistakes.splice(i, 1);
                }
            }
            for (let i = 0; i < state.allData.analysedHypothesisSentence.analysedMistakes.length; i++) {
                const mistake: AnalysedHypothesisMistake = state.allData.analysedHypothesisSentence.analysedMistakes[i];
                if (mistake.mistakeId === mistakeId) {
                    state.allData.analysedHypothesisSentence.analysedMistakes.splice(i, 1);
                }
            }
        },
        addInputNote: (state, note: string) => {
            dataStore.state.allData.analysedInputSentence.note = note;
        },
        addHypothesisNote: (state, note: string) => {
            dataStore.state.allData.analysedHypothesisSentence.note = note;
        },
    },
});

new Vue({
    render: (h) => h(App),
    store: dataStore,
}).$mount("#app");

export const STORE_MUTATIONS = {
    SET_ALL_DATA: "setAllData",
    SET_ANALYSED_HYPOTHESIS_SENTENCE: "setAnalysedHypothesisSentence",
    SET_ANALYSED_INPUT_SENTENCE: "setAnalysedInputSentence",
    SET_HYPOTHESIS_COMPARISON: "setHypothesisComparison",
    SET_INPUT_COMPARISON: "setInputComparison",
    ADD_INPUT_MISTAKE: "addInputMistake",
    ADD_INPUT_NOTE: "addInputNote",
    ADD_HYPOTHESIS_NOTE: "addHypothesisNote",
    REMOVE_INPUT_MISTAKE: "deleteInputMistake",
};

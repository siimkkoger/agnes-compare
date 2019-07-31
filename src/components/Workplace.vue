<template>
    <div>
        <button v-if="loadingServerData" class="btn btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading data from server...
        </button>
        <button v-if="sendingServerData" class="btn btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading data from server...
        </button>
        <div v-if="!loadingServerData && !sendingServerData" class="card shadow mb-4">
            <Navbar :clearSentences="clearSentences"
                    :getSentences="getFirstSentence"
                    :sendAnalysedDataToServer="sendAnalysedDataToServer"/>
            <div class="row">
                <div class="col-md-6">
                    <div id="inputReferences" v-if="allData.inputComparison.referenceSentences.length > 0">
                        <ul class="list-group" v-for="(s, index) in allData.inputComparison.referenceSentences">
                            <Sentence :index="index" :words="s"/>
                        </ul>
                    </div>
                    <Input :sentence="allData.inputComparison.inputSentence"
                           :mistakes="allData.analysedInputSentence.mistakes"
                           :note="allData.analysedInputSentence.note"
                           :updateHypothesisMistakes="updateHypothesisMistakes"
                           v-if="allData.inputComparison.referenceSentences.length > 0"/>
                </div>
                <div class="col-md-6">
                    <div id="predictionReferences" v-if="allData.hypothesisComparison.referenceSentences.length > 0">
                        <ul class="list-group" v-for="(s, index) in allData.hypothesisComparison.referenceSentences">
                            <Sentence :index="index" :words="s"/>
                        </ul>
                    </div>
                    <Prediction :sentence="allData.hypothesisComparison.hypSentence"
                                :mistakes="allData.analysedHypothesisSentence.analysedMistakes"
                                :note="allData.analysedHypothesisSentence.note"
                                v-if="allData.hypothesisComparison.referenceSentences.length > 0 && allData.analysedHypothesisSentence"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Sentence from './Sentence.vue'
    import Input from './Input.vue'
    import Prediction from './Prediction.vue'
    import Navbar from "./Navbar";
    import {languageService} from "../services/languageService";
    import {AllData} from "../classes/AllData";

    export default {
        name: "Workplace",
        components: {
            Navbar,
            Sentence,
            Input,
            Prediction
        },
        data: () => {
            return {
                showMotivation: false,
                loadingServerData: false,
                sendingServerData: false,
                allData: new AllData()
            };
        },
        methods: {
            getFirstSentence(language, line, fileName) {
                this.loadingServerData = true;
                let data = languageService.getFirstSentence(language, line, fileName);
                data.then(res => res.json())
                    .then(res => {
                        this.allData = res;
                        if (!this.allData.analysedHypothesisSentence) {
                            this.allData.analysedHypothesisSentence = {
                                note: "",
                                unnecessaryChanges: false,
                                sentenceEvaluation: "null",
                                analysedMistakes: []
                            }
                        }
                        if (!this.allData.analysedInputSentence) {
                            this.allData.analysedInputSentence = {
                                note: "",
                                mistakes: []
                            }
                        }
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.loadingServerData = false;
                    });
            },
            sendAnalysedDataToServer() {
                this.sendingServerData = true;
                let sendAnalyseData = {
                    analysedHypothesis: this.allData.analysedHypothesis,
                    analysedInputs: this.allData.analysedInputs
                };
                return languageService.saveAnalysedData(sendAnalyseData)
                    .then(response => response.json())
                    .catch(error => console.error(error))
                    .finally(() => {
                        this.sendingServerData = false;
                    });
            },
            updateHypothesisMistakes(mistakes) {
                let updatedArray = [];
                mistakes.forEach(mistake => {
                    updatedArray.push({
                        mistake: mistake,
                        mistakeEvaluation: ""
                    })
                });
                this.allData.analysedHypothesisSentence.analysedMistakes = updatedArray;
            },
            clearSentences() {
                this.predictionSentences = [];
                this.inputSentences = [];
            }
        }
    }
</script>

<style scoped>
    #inputReferences {
        margin-top: 20px;
        margin-right: 10px;
        margin-left: 10px;
    }

    #predictionReferences {
        margin-top: 20px;
        margin-right: 10px;
        margin-left: 10px;
    }
</style>
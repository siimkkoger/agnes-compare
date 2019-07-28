<template>
    <div class="card shadow mb-4">
        <Navbar :clearSentences="clearSentences" :getSentences="readJson"/>
        <div class="row">
            <div class="col-md-6">
                <div id="inputReferences" v-if="allData.inputComparison.referenceSentences.length > 0">
                    <ul class="list-group" v-for="(s, index) in allData.inputComparison.referenceSentences">
                        <Sentence :index="index" :words="s"/>
                    </ul>
                </div>
                <Input :sentence="allData.inputComparison.inputSentence"
                       :notes="allData.inputComparison.notes"
                       v-if="allData.inputComparison.referenceSentences.length > 0"/>
            </div>
            <div class="col-md-6">
                <div id="predictionReferences" v-if="allData.hypothesisComparison.referenceSentences.length > 0">
                    <ul class="list-group" v-for="(s, index) in allData.hypothesisComparison.referenceSentences">
                        <Sentence :index="index" :words="s"/>
                    </ul>
                </div>
                <Prediction :sentence="allData.hypothesisComparison.hypSentence"
                            v-if="allData.hypothesisComparison.referenceSentences.length > 0"/>
            </div>
        </div>
    </div>
</template>

<script>
    import allDataJson from '../json/allData.json'
    import Sentence from './Sentence.vue'
    import Input from './Input.vue'
    import Prediction from './Prediction.vue'
    import Navbar from "./Navbar";

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
                allData: {
                    analysedHypothesis: {
                        analysedHypothesisSentences: {},
                        analysedMistakes: {}
                    },
                    analysedInputs: {
                        mistakes: {}
                    },
                    hypothesisComparison: {
                        notes: "",
                        hypSentence: [],
                        referenceSentences: []
                    },
                    inputComparison: {
                        notes: "",
                        inputSentence: [],
                        referenceSentences: []
                    }
                }
            };
        },
        methods: {
            // When start using server
            askFromServer() {
                fetch("https://pokeapi.co/api/v2/pokemon/?limit=4",
                    {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                        }
                    }
                ).then(
                    res => res.json(),
                    error => this.console.log(error)
                ).then(res => {
                    this.sentences = res.results
                });
            },
            readJson(lineNr, language) {
                console.log(lineNr);
                console.log(language);
                this.allData = allDataJson;
            },
            clearSentences() {
                this.predictionSentences = [];
                this.inputSentences = [];
            }
        }
    }
</script>

<style scoped>
    #inputSentences {
        margin-top: 20px;
        margin-right: 10px;
        margin-left: 10px;
    }
    #predictionSentences {
        margin-top: 20px;
        margin-right: 10px;
        margin-left: 10px;
    }
</style>
<template>
    <div id="hypothesis-container">
        <div class="card">
            <div class="card-header"><h4>Hypothesis</h4></div>
            <div class="card-body">
                <li class="list-group-item">
                    <span v-for="w in localHypothesisComparison.hypSentence">
                        <span v-if='w.referenceTag === referenceTagEnum.ALL && w.inInput'
                              class="word badge badge-pill badge-success"
                              @click="selectWord(w.word)">{{ w.word }}</span>
                        <span v-if='w.referenceTag === referenceTagEnum.SOME && w.inInput'
                              class="word badge badge-pill badge-warning"
                              @click="selectWord(w.word)">{{ w.word }}</span>
                        <span v-if='w.referenceTag === referenceTagEnum.NONE && w.inInput'
                              class="word badge badge-pill badge-danger"
                              @click="selectWord(w.word)">{{ w.word }}</span>
                        <span v-if='w.referenceTag === referenceTagEnum.ALL && !w.inInput'
                              class="word badge badge-pill badge-info"
                              @click="selectWord(w.word)">{{ w.word }}</span>
                        <span v-if='w.referenceTag === referenceTagEnum.SOME && !w.inInput'
                              class="word badge badge-pill badge-info"
                              @click="selectWord(w.word)">{{ w.word }}</span>
                        <span v-if='w.referenceTag === referenceTagEnum.NONE && !w.inInput'
                              class="word badge badge-pill badge-secondary"
                              @click="selectWord(w.word)">{{ w.word }}</span>
                    </span>
                </li>
                <input id="hypothesis-workplace-note"
                       @change="updateHypothesisSentence"
                       v-model="localAnalysedHypothesisSentence.note"
                       class="form-control mr-sm-2 inputfield"
                       type="search"
                       placeholder="Note"
                       aria-label="Search">
                <div id="hypothesis-workplace-options">
                    <form>
                        <div class="form-check form-check-inline">
                            <div v-for="sentenceEvaluation in sentenceEvaluationEnumValues">
                                <div class="custom-control custom-radio">
                                    <input v-model="localAnalysedHypothesisSentence.sentenceEvaluation"
                                           @change="updateHypothesisSentence"
                                           v-bind:value="sentenceEvaluation"
                                           type="radio"
                                           class="custom-control-input" :id="'sentenceEvaluation-' + sentenceEvaluation"
                                           name="defaultExampleRadios">
                                    <label class="custom-control-label" :for="'sentenceEvaluation-' + sentenceEvaluation">{{sentenceEvaluation}}</label>
                                </div>
                            </div>
                        </div>
                        <div class="">
                            <input id="unnecessaryChanges"
                                   @change="updateHypothesisSentence"
                                   type="checkbox"
                                   v-model="localAnalysedHypothesisSentence.unnecessaryChanges">
                            <label for="unnecessaryChanges">Unnecessary changes</label>
                        </div>
                    </form>
                </div>
                <div v-if="localAnalysedHypothesisSentence">
                    <div v-for="mistake in localAnalysedHypothesisSentence.analysedMistakes">
                        <li class="list-group-item">
                            <div class="row">
                                <div class="col-1">
                                    {{mistake.mistakeId}}
                                </div>
                                <div class="col-md-3">
                                    {{mistake.mistakeEvaluation || "undefined"}}
                                </div>
                                <div class="col-8">
                                    <div class="form-check-inline">
                                        <div v-for="evaluation in mistakeEvaluationEnumValues">
                                            <div class="custom-control custom-radio">
                                                <input v-model="mistake.mistakeEvaluation"
                                                       v-bind:value="evaluation"
                                                       @click="updateHypothesisSentence"
                                                       type="radio"
                                                       class="custom-control-input"
                                                       :id="mistake.mistakeId + 'evaluation-' + evaluation"
                                                       name="defaultExampleRadios">
                                                <label class="custom-control-label"
                                                       :for="mistake.mistakeId + 'evaluation-' + evaluation">
                                                    {{evaluation}}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </div>
                </div>
            </div>
            <div class="card-footer"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {HypothesisWord} from "@/classes/hypothesis/HypothesisWord";
    import PredictionMistake from "@/components/PredictionMistake.vue";
    import {ReferenceTagEnum} from "@/enums/ReferenceTagEnum";
    import {getAllMistakeEvaluationValues, MistakeEvaluationEnum} from "@/enums/MistakeEvaluationEnum";
    import {STORE_MUTATIONS} from "@/main";
    import {getAllSentenceEvaluationValues, SentenceEvaluationEnum} from "@/enums/SentenceEvaluationEnum";

    @Component({
        components: {
            PredictionMistake,
        },
    })
    export default class HypothesisWorkplace extends Vue {
        get localHypothesisComparison() {
            return this.$store.getters.hypothesisComparison;
        }
        get localAnalysedHypothesisSentence() {
            return this.$store.getters.analysedHypothesisSentence;
        }

        private mistakeEvaluationEnum = MistakeEvaluationEnum;
        private referenceTagEnum = ReferenceTagEnum;
        private selectedWord?: HypothesisWord;
        private unnecessaryChanges: boolean = false;
        private hypothesisWorkplaceNote: string = "";
        private mistakeEvaluationEnumValues = getAllMistakeEvaluationValues();
        private sentenceEvaluationEnumValues = getAllSentenceEvaluationValues();
        private selectedSentenceEvaluation: SentenceEvaluationEnum = SentenceEvaluationEnum.PERFECT;

        private selectWord(w: HypothesisWord) {
            this.selectedWord = w;
        }

        private updateHypothesisSentence(note: string) {
            this.$store.commit(STORE_MUTATIONS.SET_ANALYSED_HYPOTHESIS_SENTENCE, this.localAnalysedHypothesisSentence)
        }
    }
</script>

<style scoped>
    .word {
        transition: all .2s ease-in-out;
    }

    #hypothesis-container {
        margin-top: 20px;
        margin-bottom: 20px;
        margin-right: 5px;
        margin-left: 5px;
    }

    #hypothesis-workplace-options {
        margin-top: 20px;
    }
</style>

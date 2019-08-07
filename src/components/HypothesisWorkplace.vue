<template>
    <div id="input-container">
        <div class="card">
            <div class="card-header"><h4>Hypothesis</h4></div>
            <div class="card-body">
                <li class="list-group-item">
                    <span v-for="w in hypSentence">
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
                <input class="form-control mr-sm-2 inputfield" type="search"
                       placeholder="Notes" aria-label="Search">
            </div>
            <div v-if="analysedHypothesisSentence">
                <PredictionMistake v-for="mistake in analysedHypothesisSentence.analysedMistakes"
                                   :mistakeId="mistake.mistakeId"
                                   :mistakeEvaluation="mistake.mistakeEvaluation"/>
            </div>
            <div class="card-footer"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {HypothesisWord} from "@/classes/hypothesis/HypothesisWord";
    import PredictionMistake from "@/components/PredictionMistake.vue";
    import {AnalysedHypothesis} from "@/classes/hypothesis/AnalysedHypothesis";
    import {ReferenceTagEnum} from "@/enums/ReferenceTagEnum";

    @Component({
        components: {
            PredictionMistake,
        },
    })
    export default class HypothesisWorkplace extends Vue {
        @Prop()
        private hypSentence?: HypothesisWord[];
        @Prop()
        private analysedHypothesisSentence?: AnalysedHypothesis;
        private referenceTagEnum = ReferenceTagEnum;
        private selectedWord?: HypothesisWord;

        private selectWord(w: HypothesisWord) {
            this.selectedWord = w;
        }
    }
</script>

<style scoped>
    .word {
        transition: all .2s ease-in-out;
    }

    .word:hover {
        background-color: cornflowerblue;
        size: 200%;
        cursor: pointer;
        transform: scale(1.1);
    }

    #input-container {
        margin-top: 20px;
        margin-bottom: 20px;
        margin-right: 10px;
        margin-left: 10px;
    }
</style>

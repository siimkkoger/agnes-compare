<template>
    <div>
        <div class="row" v-if="allData.inputComparison && allData.hypothesisComparison">
            <div class="col-md-6">
                <div id="inputReferences" v-if="allData && allData.inputComparison.referenceSentences.length > 0">
                    <ul class="list-group" v-for="s in allData.inputComparison.referenceSentences">
                        <ReferenceSentence :words="s"/>
                    </ul>
                </div>
                <InputWorkplace v-if="allData"
                                :sentence="allData.inputComparison.inputSentence"
                                :analysedInputSentence="allData.analysedInputSentence"
                                :updateHypothesisMistakes="updateHypothesisMistakes"/>
            </div>
            <div class="col-md-6">
                <div id="predictionReferences" v-if="allData.hypothesisComparison.referenceSentences.length > 0">
                    <ul class="list-group" v-for="s in allData.hypothesisComparison.referenceSentences">
                        <ReferenceSentence :words="s"/>
                    </ul>
                </div>
                <HypothesisWorkplace v-if="allData"
                                     :sentence="allData.hypothesisComparison.hypSentence"
                                     :analysedHypothesisSentence="allData.analysedHypothesisSentence"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import InputWorkplace from "./InputWorkplace.vue";
    import HypothesisWorkplace from "./HypothesisWorkplace.vue";
    import {AllData} from "@/classes/AllData";
    import {Mistake} from "@/classes/Mistake";
    import {AnalysedHypothesisMistake} from "@/classes/hypothesis/AnalysedHypothesisMistake";
    import ReferenceSentence from "@/components/ReferenceSentence.vue";

    @Component({
        components: {
            ReferenceSentence,
            InputWorkplace,
            HypothesisWorkplace,
        },
    })
    export default class Workplace extends Vue {
        @Prop()
        private allData?: AllData;

        private updateHypothesisMistakes(mistakes: Mistake[]) {
            const updatedArray: AnalysedHypothesisMistake[] = [];
            mistakes.forEach((mistake: Mistake) => {
                updatedArray.push(new AnalysedHypothesisMistake(mistake.id, undefined));
            });
            this.allData!.analysedHypothesisSentence!.analysedMistakes = updatedArray;
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

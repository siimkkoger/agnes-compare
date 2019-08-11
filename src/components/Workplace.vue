<template>
    <div>
        <div class="row" v-if="localAllDataInputComparison && localAllDataHypothesisComparison">
            <div class="col-md-6">
                <div id="inputReferences" class="references"
                     v-if="showReferences && localAllDataInputComparison.referenceSentences">
                    <ul class="list-group" v-for="s in localAllDataInputComparison.referenceSentences">
                        <ReferenceSentence :words="s"/>
                    </ul>
                </div>
                <InputWorkplace v-if="localAllData"/>
            </div>
            <div class="col-md-6">
                <div id="predictionReferences" class="references"
                     v-if="showReferences && localAllDataHypothesisComparison.referenceSentences">
                    <ul class="list-group" v-for="s in localAllDataHypothesisComparison.referenceSentences">
                        <ReferenceSentence :words="s"/>
                    </ul>
                </div>
                <HypothesisWorkplace v-if="localAllData"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import InputWorkplace from "./InputWorkplace.vue";
    import HypothesisWorkplace from "./HypothesisWorkplace.vue";
    import ReferenceSentence from "@/components/ReferenceSentence.vue";
    import {Prop} from "vue-property-decorator";

    @Component({
        components: {
            ReferenceSentence,
            InputWorkplace,
            HypothesisWorkplace,
        },
    })
    export default class Workplace extends Vue {
        get localAllData() {
            return this.$store.state.allData;
        }

        get localAllDataInputComparison() {
            return this.$store.getters.inputComparison;
        }

        get localAllDataHypothesisComparison() {
            return this.$store.getters.hypothesisComparison;
        }

        @Prop()
        private showReferences?: boolean;
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

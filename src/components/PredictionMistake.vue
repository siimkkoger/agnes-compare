<template>
    <div>
        <li class="list-group-item">Id: {{mistakeId}}, Mistake Evaluation: {{mistakeEvaluation}}</li>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {MistakeEvaluationEnum} from "@/enums/MistakeEvaluationEnum";

    @Component({})
    export default class PredictionMistake extends Vue {
        @Prop()
        private mistakeId?: number;
        @Prop()
        private mistakeEvaluation?: MistakeEvaluationEnum;
    }
</script>

<style scoped>

</style>

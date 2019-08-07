<template>
    <div>
        <li class="list-group-item">Type: {{type}}, Words: {{wordsInvolved}}, Needs Change: {{needToBeChanged}}</li>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {MistakeTypeEnum} from "@/enums/MistakeTypeEnum";

    @Component({})
    export default class InputMistake extends Vue {
        @Prop()
        private id?: number;
        @Prop()
        private type?: MistakeTypeEnum;
        @Prop()
        private wordsInvolved: string[] = [];
        @Prop()
        private needToBeChanged?: boolean;
    }
</script>

<style scoped>

</style>

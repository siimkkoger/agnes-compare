<template>
    <li class="list-group-item">
        <span v-for="w in words">
            <span v-if='w.inComparison'>{{ w.word }}</span>
            <span v-if='!w.inComparison' class="underline-span">{{ w.word }}</span>
        </span>
    </li>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import Workplace from "@/components/Workplace.vue";
    import {ReferenceWord} from "@/classes/ReferenceWord";

    @Component({
        components: {
            Workplace,
        },
    })
    export default class ReferenceSentence extends Vue {
        @Prop()
        private words?: ReferenceWord[];
    }
</script>

<style scoped>
    span {
        margin-right: 2px;
    }

    .underline-span {
        box-shadow: inset 0 0px 0 white, inset 0 -1px 0 red;
    }
</style>

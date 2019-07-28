<template>
    <li class="list-group-item">
        <span v-for="w in words">
            <span v-if='w.inComparison'>{{ w.word }}</span>
            <span v-if='!w.inComparison' class="underline-span">{{ w.word }}</span>
        </span>
    </li>
</template>

<script>
    export default {
        name: "Sentence",
        props: ["words", "index"]
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
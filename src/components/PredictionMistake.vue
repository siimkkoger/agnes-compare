<template>
    <div>
        <li class="list-group-item">Type: {{type}}, Words: {{wordsInvolved}}, Needs Change: {{needToBeChanged}}</li>
    </div>
</template>

<script>
    export default {
        name: "PredictionMistake",
        props: ["wordsInvolved", "type", "needToBeChanged"]
    }
</script>

<style scoped>

</style>
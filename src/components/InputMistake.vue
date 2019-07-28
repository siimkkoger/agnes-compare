<template>
    <div>
        <li class="list-group-item">Type: {{type}}, Words: {{words}}</li>
    </div>
</template>

<script>
    export default {
        name: "InputMistake",
        props: ["words", "type"]
    }
</script>

<style scoped>

</style>
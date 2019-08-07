<template>
    <div id="app">
        <NavBar></NavBar>
    </div>
</template>

<script lang="ts">
    import "bootstrap";
    import "bootstrap/dist/css/bootstrap.min.css";
    import {Component, Vue} from "vue-property-decorator";
    import NavBar from "@/components/NavBar.vue";

    @Component({
        components: {
            NavBar,
        },
    })
    export default class App extends Vue {
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    body {
        background-image: url("./assets/wolf-bg.jpg");
        opacity: 1;
    }
</style>

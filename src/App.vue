<template>
    <div id="app">
        <Workplace/>
    </div>
</template>

<script>
    import 'bootstrap'
    import 'bootstrap/dist/css/bootstrap.min.css'
    import Workplace from './components/Workplace.vue'

    export default {
        name: 'app',
        components: {
            Workplace
        }
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

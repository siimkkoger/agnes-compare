<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a class="navbar-brand" href="#">Predict</a>
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li>
                        <button v-on:click="clearSentences" class="btn btn-outline-danger my-2 my-sm-0">Clear</button>
                    </li>
                    <li>
                        <button v-on:click="toggleMotivation" class="btn btn-outline-success my-2 my-sm-0">Motivation</button>
                    </li>
                </ul>
                <div class="form-inline my-2 my-lg-0">
                    <select id="language-select" class="browser-default custom-select colorful-select dropdown-primary">
                        <option disabled selected value="">Language</option>
                        <option value="EST">EST</option>
                        <option value="ENG">ENG</option>
                    </select>
                    <input class="form-control mr-sm-2" v-model="lineNr" type="number" :min="minLine" :max="maxLine" placeholder="Line nr" aria-label="Line Nr">
                    <button v-on:click="getSentencesPrep" class="btn btn-outline-success my-2 my-sm-0">Get sentences</button>
                    <button v-on:click="sendAnalysedDataToServer" class="btn btn-outline-warning my-2 my-sm-0">Save</button>
                </div>
            </div>
        </nav>
        <div id="lineNrAlert" class="alert alert-warning alert-dismissible" role="alert" style="display: none">
            <strong>Damn girl...!</strong> Please insert line between <strong>0</strong> and <strong>74</strong>.
            And choose a <strong> language </strong> goddammit!
            <button @click="showListMessage(false)" type="button" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <Rocky id="motivationComponent" style="display: none"/>
    </div>
</template>

<script>
    import Rocky from "./Rocky";

    export default {
        name: "navbar",
        components: {
            Rocky
        },
        data: () => {
            return {
                lineNr: null,
                maxLine: 74,
                minLine: 0
            };
        },
        props: [
            "getSentences",
            "clearSentences",
            "sendAnalysedDataToServer"
        ],
        methods: {
            getSentencesPrep() {
                if (this.lineNr == null || this.lineNr < this.minLine || this.lineNr > this.maxLine) {
                    this.showListMessage(true);
                    return;
                }
                let languageSelectElement = document.getElementById("language-select");
                let language = languageSelectElement.options[languageSelectElement.selectedIndex].value;
                if (language !== "EST" && language !== "ENG") {
                    this.showListMessage(true);
                    return;
                }
                this.getSentences(this.lineNr, language);
                this.showListMessage(false);
            },
            showListMessage(show) {
                var x = document.getElementById("lineNrAlert");
                if (show) {
                    x.style.display = "block";
                } else {
                    x.style.display = "none";
                }
            },
            toggleMotivation() {
                var x = document.getElementById("motivationComponent");
                if (x.style.display === "none") {
                    x.style.display = "block";
                } else {
                    x.style.display = "none";
                }
            }
        }
    }
</script>

<style scoped>

</style>
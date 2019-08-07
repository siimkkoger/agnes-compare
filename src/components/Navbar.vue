<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a class="navbar-brand" href="#">Predict</a>
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li>
                        <button class="btn btn-outline-danger my-2 my-sm-0">Clear</button>
                    </li>
                    <li>
                        <button v-on:click="toggleMotivation"
                                class="btn btn-outline-success my-2 my-sm-0">Motivation
                        </button>
                    </li>
                </ul>
                <div class="form-inline my-2 my-lg-0">
                    <div v-if="availableFiles.length === 0">
                        <select id="language-select" class="browser-default custom-select colorful-select dropdown-primary">
                            <option disabled selected value="">Language</option>
                            <option>{{languageEnum.EST}}</option>
                            <option>{{languageEnum.ENG}}</option>
                        </select>
                        <button v-on:click="getFileChoices"
                                class="btn btn-outline-success my-2 my-sm-0">
                            Get files
                        </button>
                    </div>
                    <div v-if="availableFiles.length !== 0">
                        <select id="file-select"
                                class="browser-default custom-select colorful-select dropdown-primary">
                            <option disabled selected value="">File name</option>
                            <option v-for="file in availableFiles">{{file}}</option>
                        </select>
                        <input class="form-control mr-sm-2" v-model="lineNr" type="number" :min="MIN_LINE"
                               placeholder="Line nr" aria-label="Line Nr">
                        <button v-on:click="getSentences"
                                class="btn btn-outline-success my-2 my-sm-0">
                            Get sentences
                        </button>
                        <button v-on:click="sendAnalysedDataToServer"
                                class="btn btn-outline-warning my-2 my-sm-0">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </nav>
        <div id="lineNrAlert" class="alert alert-warning alert-dismissible" role="alert" style="display: none">
            <strong>Damn girl...!</strong> Line has to be positive integer.
            And choose a <strong> language </strong> goddammit!
            <button @click="showGetFirstSentenceErrorMessage(false)" type="button" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div id="serverError" class="alert alert-warning alert-dismissible" role="alert" style="display: none">
            <strong>{{serverErrorMessage}}</strong>
            <button @click='showServerErrorMessage(undefined)' type="button" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <Rocky id="motivationComponent"/>
        <button v-if="loadingServerData" class="btn btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading data from server...
        </button>
        <button v-if="sendingServerData" class="btn btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Sending data to server...
        </button>
        <Workplace v-if="allData && !sendingServerData && !loadingServerData" :allData="allData"></Workplace>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {LanguageEnum, stringToLanguage} from "@/enums/LanguageEnum";
    import {AllData} from "@/classes/AllData";
    import {EvaluationData} from "@/classes/EvaluationData";
    import Rocky from "@/components/Rocky.vue";
    import {LanguageService} from "@/services/LanguageService";
    import Workplace from "@/components/Workplace.vue";

    @Component({
        components: {
            Rocky,
            Workplace,
        },
    })
    export default class NavBar extends Vue {
        private allData: AllData = new AllData();
        private languageEnum = LanguageEnum;
        private loadingServerData: boolean = false;
        private sendingServerData: boolean = false;
        private chosenLanguage: LanguageEnum = this.languageEnum.EST;
        private lineNr?: number = 1;
        private availableFiles: string[] = [];
        private MIN_LINE: number = 0;
        private serverErrorMessage = "Something went wrong with server request - check console";

        private getFileChoices() {
            const langElement = document.getElementById("language-select") as HTMLSelectElement;
            if (!langElement) {
                return;
            }
            this.chosenLanguage = stringToLanguage(langElement.options[langElement.selectedIndex].value);
            this.loadingServerData = true;
            LanguageService.getHypothesisChoices(stringToLanguage(this.chosenLanguage!))
                .then((res) => res.json())
                .then((res) =>  this.availableFiles = res)
                .catch((error) => this.showServerErrorMessage(error))
                .finally(() => this.loadingServerData = false);
        }

        private getSentences() {
            const langElement = document.getElementById("file-select") as HTMLSelectElement;
            if (!langElement) {
                return;
            }
            const fileName = langElement.options[langElement.selectedIndex].value;
            if (!this.lineNr || !fileName || this.lineNr < this.MIN_LINE) {
                this.showGetFirstSentenceErrorMessage(true);
                return;
            }
            this.loadingServerData = true;
            LanguageService.getFirstSentence(this.chosenLanguage!, this.lineNr, fileName!)
                .then((res) => res.json())
                .then((res) => this.allData = res)
                .catch((error) => this.showServerErrorMessage(error))
                .finally(() => this.loadingServerData = false);
            this.showGetFirstSentenceErrorMessage(false);
        }

        private sendAnalysedDataToServer() {
            this.sendingServerData = true;
            const evaluationData = new EvaluationData(
                this.allData!.analysedHypothesisSentence,
                this.allData!.analysedInputSentence);
            LanguageService.saveAnalysedData(evaluationData)
                .then((response) => response.json())
                .catch((error) => this.showServerErrorMessage(error))
                .finally(() => this.sendingServerData = false);
        }

        private showGetFirstSentenceErrorMessage(show: boolean) {
            const x = document.getElementById("lineNrAlert");
            if (!x) {
                return;
            }
            if (show) {
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }
        }

        private showServerErrorMessage(message?: string) {
            const x = document.getElementById("serverError");
            if (!x) {
                return;
            }
            x.style.display = "block";
            if (message) {
                x.innerText = message;
            }
        }

        private toggleMotivation() {
            const x = document.getElementById("motivationComponent");
            if (!x) {
                return;
            }
            if (x.style.display === "none") {
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }
        }
    }
</script>

<style scoped>
    #motivationComponent {
        display: none;
    }
</style>

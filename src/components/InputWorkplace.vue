<template>
    <div id="input-container">
        <div class="card">
            <div class="card-header"><h4>Input</h4></div>
            <div class="card-body">
                <li class="list-group-item">
                    <span v-for="w in localInputComparison.inputSentence">
                        <span v-if='w.referenceTag === referenceTagEnum.ALL'
                              class="word badge badge-pill badge-success"
                              @click="selectWord">{{ w.word }}</span>
                        <span v-if='w.referenceTag === referenceTagEnum.SOME'
                              class="word badge badge-pill badge-warning"
                              @click="selectWord">{{ w.word }}</span>
                        <span v-if='w.referenceTag === referenceTagEnum.NONE'
                              class="word badge badge-pill badge-danger"
                              @click="selectWord">{{ w.word }}</span>
                    </span>
                </li>
                <input id="input-workplace-note"
                       @change="updateNote($event.target.value)"
                       v-model="localAnalysedInputSentence.note"
                       class="form-control mr-sm-2 inputfield"
                       type="search"
                       placeholder="Note">
                <div id="input-workplace-options" class="row">
                    <div class="col-md-9">
                        <form>
                            <div class="form-check form-check-inline">
                                <div v-for="mistake in allMistakeTypeValues">
                                    <div class="custom-control custom-radio">
                                        <input v-model="selectedMistakeType"
                                               v-bind:value="mistake"
                                               type="radio"
                                               class="custom-control-input" :id="'mistake-' + mistake"
                                               name="defaultExampleRadios">
                                        <label class="custom-control-label" :for="'mistake-' + mistake">{{mistake}}</label>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div>
                            <input id="mistakeNeedsChange" type="checkbox" v-model="needToBeChanged">
                            <label for="mistakeNeedsChange">Mistake needs change</label>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <button type="button" class="btn btn-primary" @click="confirmMistake">Add mistake</button>
                    </div>
                </div>
                <div v-if="localAnalysedInputSentence">
                    <div v-for="mistake in localAnalysedInputSentence.mistakes">
                        <li class="list-group-item">
                            <div class="row">
                                <div class="col-1">
                                    <span>{{mistake.id}}</span>
                                </div>
                                <div class="col-2">
                                    {{mistake.type}}
                                </div>
                                <div class="col-7">
                                    Needs Change: {{mistake.needToBeChanged}}
                                </div>
                                <div class="col-2">
                                    <button @click="removeMistake(mistake.id)"
                                            type="button"
                                            class="btn btn-outline-danger ">
                                        remove
                                    </button>
                                </div>
                                <div class="col-12">
                                    Words: {{mistake.wordsInvolved}}
                                </div>
                            </div>
                        </li>
                    </div>
                </div>
            </div>
            <div class="card-footer"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {getAllMistakeTypeEnum, MistakeTypeEnum} from "@/enums/MistakeTypeEnum";
    import {Mistake} from "@/classes/Mistake";
    import {ReferenceTagEnum} from "@/enums/ReferenceTagEnum";
    import {STORE_MUTATIONS} from "@/main";

    @Component({})
    export default class InputWorkplace extends Vue {
        get localInputComparison() {
            return this.$store.getters.inputComparison;
        }

        get localAnalysedInputSentence() {
            return this.$store.getters.analysedInputSentence;
        }

        private mistakeTypeEnum = MistakeTypeEnum;
        private referenceTagEnum = ReferenceTagEnum;
        private selectedWords: string[] = [];
        private needToBeChanged: boolean = false;
        private selectedMistakeType: MistakeTypeEnum = MistakeTypeEnum.LEX;
        private allMistakeTypeValues: MistakeTypeEnum[] = getAllMistakeTypeEnum();
        private inputWorkplaceNote: string = "";

        private selectWord(event: any) {
            if (event.target.classList.contains("word-selected")) {
                event.target.classList.remove("word-selected");
                this.selectedWords.splice(this.selectedWords.indexOf(event.target.textContent), 1);
            } else {
                event.target.classList.add("word-selected");
                this.selectedWords.push(event.target.textContent);
            }
        }

        private confirmMistake() {
            if (this.selectedWords.length < 1) {
                return;
            }
            this.$store.commit(STORE_MUTATIONS.ADD_INPUT_MISTAKE,
                new Mistake(
                    undefined,
                    this.selectedMistakeType,
                    this.needToBeChanged,
                    this.selectedWords,
                ));
            this.selectedWords = [];
            this.selectedMistakeType = MistakeTypeEnum.LEX;
            this.needToBeChanged = false;
            for (const element of document.getElementsByClassName("word")) {
                element.classList.remove("word-selected");
            }
        }

        private removeMistake(mistakeId: number) {
            this.$store.commit(STORE_MUTATIONS.REMOVE_INPUT_MISTAKE, mistakeId)
        }

        private updateNote(note: string) {
            this.$store.commit(STORE_MUTATIONS.ADD_INPUT_NOTE, note)
        }

        private showListMessage(close: boolean) {
            const x = document.getElementById("alreadyInErrorList");
            if (!x) {
                return;
            }
            if (close) {
                x.style.display = "none";
            } else {
                x.style.display = "block";
            }
        }
    }
</script>

<style scoped>
    .word {
        transition: all .2s ease-in-out;
    }

    .word-selected {
        background-color: cornflowerblue;
        size: 200%;
        cursor: pointer;
        transform: scale(1.1);
    }

    .word:hover {
        background-color: cornflowerblue;
        size: 200%;
        cursor: pointer;
        transform: scale(1.1);
    }

    #input-container {
        margin-top: 20px;
        margin-bottom: 20px;
        margin-right: 5px;
        margin-left: 5px;
    }

    #input-workplace-options {
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>

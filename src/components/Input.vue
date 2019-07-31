<template>
    <div id="input-container">
        <div class="card">
            <div class="card-header"><h4>Input</h4></div>
            <div class="card-body">
                <li class="list-group-item">
                    <span v-for="w in sentence">
                        <span v-if='w.referenceTag === TYPE_ALL' class="word badge badge-pill badge-success"
                              @click="selectWord">{{ w.word }}</span>
                        <span v-if='w.referenceTag === TYPE_SOME' class="word badge badge-pill badge-warning"
                              @click="selectWord">{{ w.word }}</span>
                        <span v-if='w.referenceTag === TYPE_NONE' class="word badge badge-pill badge-danger"
                              @click="selectWord">{{ w.word }}</span>
                    </span>
                </li>
                <input class="form-control mr-sm-2 inputfield" v-model="note" type="search" placeholder="Note" aria-label="Search">
                <div class="">
                    <button type="button" class="btn btn-primary" @click="confirmMistake">Add mistake</button>
                    <form>
                        <div class="form-group">
                            <div v-for="error in errorTypes">
                                <div class="custom-control custom-radio">
                                    <input v-model="selectedErrorType" v-bind:value="error" type="radio"
                                           class="custom-control-input" :id="'error-' + error"
                                           name="defaultExampleRadios">
                                    <label class="custom-control-label" :for="'error-' + error">{{error}}</label>
                                </div>
                            </div>
                            <input id="mistakeNeedsChange" type="checkbox" v-model="selectedNeedToBeChanged">
                            <label for="mistakeNeedsChange">Mistake needs change</label>
                        </div>
                    </form>
                </div>
                <div v-for="mistake in mistakes">
                    <InputMistake :wordsInvolved="mistake.wordsInvolved" :type="mistake.type" :needToBeChanged="mistake.needToBeChanged"/>
                </div>
            </div>
            <div class="card-footer"></div>
        </div>
    </div>
</template>

<script>
    import InputMistake from "./InputMistake";

    export default {
        name: "input-component",
        components: {InputMistake},
        props: ["sentence", "note", "mistakes", "updateHypothesisMistakes"],
        data: () => {
            return {
                selectedWords: [],
                selectedErrorType: "",
                selectedNeedToBeChanged: false,
                errorTypes: ["Lex", "Spelling", "Grammar", "Order"],
                TYPE_ALL: "ALL",
                TYPE_SOME: "SOME",
                TYPE_NONE: "NONE"
            };
        },
        methods: {
            selectWord(event) {
                if (event.target.classList.contains("word-selected")) {
                    event.target.classList.remove("word-selected");
                    this.selectedWords.splice(this.selectedWords.indexOf(event.target.textContent), 1);
                } else {
                    event.target.classList.add("word-selected");
                    this.selectedWords.push(event.target.textContent);
                }
            },
            confirmMistake() {
                if (this.selectedWords.length < 1 || !this.errorTypes.includes(this.selectedErrorType)) {
                    console.log("PLEASE FILL WHOLE FORM");
                    return;
                }
                this.mistakes.push({
                    wordsInvolved: this.selectedWords,
                    type: this.selectedErrorType,
                    needToBeChanged: this.selectedNeedToBeChanged
                });
                this.selectedWords = [];
                this.selectedErrorType = "";
                this.selectedNeedToBeChanged = false;
                let wordTags = document.getElementsByClassName("word");
                for (let i = 0; i < wordTags.length; i++) {
                    let element = wordTags[i];
                    element.classList.remove("word-selected");
                }
                this.updateHypothesisMistakes(this.mistakes);
            },
            showListMessage(close) {
                var x = document.getElementById("alreadyInErrorList");
                if (close) {
                    x.style.display = "none";
                } else {
                    x.style.display = "block";
                }
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
        margin-right: 10px;
        margin-left: 10px;
    }
</style>
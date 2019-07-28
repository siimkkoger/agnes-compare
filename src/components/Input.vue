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
                <input class="form-control mr-sm-2 inputfield" v-bind:aria-valuetext="notes" type="search" placeholder="Notes" aria-label="Search">
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
                        </div>
                    </form>
                </div>
                <div v-for="mistake in inputMistakes">
                    <InputMistake :words="mistake.words" :type="mistake.type"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import InputMistake from "./InputMistake";

    export default {
        name: "inputMistake",
        components: {InputMistake},
        props: ["sentence", "notes"],
        data: () => {
            return {
                selectedWords: [],
                inputMistakes: [],
                selectedErrorType: "",
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
                this.inputMistakes.push({
                    words: this.selectedWords,
                    type: this.selectedErrorType
                });
                this.selectedWords = [];
                this.selectedErrorType = "";
                let wordTags = document.getElementsByClassName("word");
                for (let i = 0; i < wordTags.length; i++) {
                    let element = wordTags[i];
                    element.classList.remove("word-selected");
                }
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
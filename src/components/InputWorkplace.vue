<template>
    <div id="input-container">
        <div class="card">
            <div class="card-header"><h4>Input</h4></div>
            <div class="card-body">
                <li class="list-group-item">
                    <span v-for="w in sentence">
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
                <input class="form-control mr-sm-2 inputfield"
                       type="search"
                       placeholder="Note" aria-label="Search">
                <div class="">
                    <button type="button" class="btn btn-primary" @click="confirmMistake">Add mistake</button>
                    <form>
                        <div class="form-group">
                            <div v-for="error in [
                                    mistakeTypeEnum.LEX,
                                    mistakeTypeEnum.SPELLING,
                                    mistakeTypeEnum.GRAMMAR,
                                    mistakeTypeEnum.ORDER,
                                ]">
                                <div class="custom-control custom-radio">
                                    <input v-model="selectedMistakeType"
                                           v-bind:value="error"
                                           type="radio"
                                           class="custom-control-input" :id="'error-' + error"
                                           name="defaultExampleRadios">
                                    <label class="custom-control-label" :for="'error-' + error">{{error}}</label>
                                </div>
                            </div>
                            <input id="mistakeNeedsChange" type="checkbox" v-model="needToBeChanged">
                            <label for="mistakeNeedsChange">Mistake needs change</label>
                        </div>
                    </form>
                </div>
                <div v-if="analysedInputSentence">
                    <InputMistake v-for="mistake in analysedInputSentence.mistakes"
                                  :wordsInvolved="mistake.wordsInvolved"
                                  :type="mistake.type"
                                  :needToBeChanged="mistake.needToBeChanged"/>
                </div>
            </div>
            <div class="card-footer"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {MistakeTypeEnum} from "@/enums/MistakeTypeEnum";
    import {Mistake} from "@/classes/Mistake";
    import {InputWord} from "@/classes/input/InputWord";
    import InputMistake from "@/components/InputMistake.vue";
    import {AnalysedInput} from "@/classes/input/AnalysedInput";
    import {ReferenceTagEnum} from "@/enums/ReferenceTagEnum";

    @Component({
        components: {
            InputMistake,
        },
    })
    export default class InputWorkplace extends Vue {
        @Prop({default: new AnalysedInput("Hardcoded note", [])})
        private analysedInputSentence?: AnalysedInput;
        @Prop()
        private sentence?: InputWord[];
        @Prop()
        private updateHypothesisMistakes?: (mistakes: Mistake[]) => null;
        private referenceTagEnum = ReferenceTagEnum;
        private selectedWords: string[] = [];
        private selectedMistakeType: MistakeTypeEnum = MistakeTypeEnum.LEX;
        private mistakeTypeEnum = MistakeTypeEnum;
        private needToBeChanged: boolean = false;

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
            this.analysedInputSentence!.mistakes.push(new Mistake(
                this.analysedInputSentence!.mistakes.length + 1,
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
            this.updateHypothesisMistakes!(this.analysedInputSentence!.mistakes);
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
        margin-right: 10px;
        margin-left: 10px;
    }
</style>

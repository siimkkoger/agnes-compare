<template>
    <div id="input-container">
        <div class="card">
            <div class="card-header"><h4>Hypothesis</h4></div>
            <div class="card-body">
                <li class="list-group-item">
                    <span v-for="w in sentence">
                        <span v-if='w.referenceTag === TYPE_ALL && w.inInput' class="word badge badge-pill badge-success"
                              data-toggle="modal" data-target="#exampleModal" @click="selectWord(w.word)">{{ w.word }}</span>
                        <span v-if='w.referenceTag === TYPE_SOME && w.inInput' class="word badge badge-pill badge-warning"
                              data-toggle="modal" data-target="#exampleModal" @click="selectWord(w.word)">{{ w.word }}</span>
                        <span v-if='w.referenceTag === TYPE_NONE && w.inInput' class="word badge badge-pill badge-danger"
                              data-toggle="modal" data-target="#exampleModal" @click="selectWord(w.word)">{{ w.word }}</span>
                        <span v-if='w.referenceTag === TYPE_ALL && !w.inInput' class="word badge badge-pill badge-info"
                              data-toggle="modal" data-target="#exampleModal" @click="selectWord(w.word)">{{ w.word }}</span>
                        <span v-if='w.referenceTag === TYPE_SOME && !w.inInput' class="word badge badge-pill badge-info"
                              data-toggle="modal" data-target="#exampleModal" @click="selectWord(w.word)">{{ w.word }}</span>
                        <span v-if='w.referenceTag === TYPE_NONE && !w.inInput' class="word badge badge-pill badge-secondary"
                              data-toggle="modal" data-target="#exampleModal" @click="selectWord(w.word)">{{ w.word }}</span>
                    </span>
                </li>
                <input class="form-control mr-sm-2 inputfield" type="search" placeholder="Notes" aria-label="Search">
            </div>
            <div class="card-footer"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Prediction",
        props: ["sentence"],
        data: () => {
            return {
                selectedWord: "null",
                TYPE_ALL: "ALL",
                TYPE_SOME: "SOME",
                TYPE_NONE: "NONE"
            };
        },
        methods: {
            selectWord(w) {
                this.selectedWord = w;
            }
        }
    }
</script>

<style scoped>
    .word {
        transition: all .2s ease-in-out;
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
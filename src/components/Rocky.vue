<template>
    <div class="img-container">
        <img id="rocky-img" alt="Vue logo" @click="nextPic" :src="motivationalPictures[chosenIndex]">
    </div>
</template>

<script>
    export default {
        name: "rocky",
        data: () => {
            return {
                showRocky: true,
                motivationalPictures: [
                    "https://scontent-atl3-1.cdninstagram.com/vp/f36bc268ec86c1d487d936c69c9bdc89/5D94B2E7/t51.2885-15/e35/44535199_193685374861534_690019524629171677_n.jpg?_nc_ht=scontent-atl3-1.cdninstagram.com",
                    "https://images.unsplash.com/photo-1543869664-290274af6667?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
                    "https://media1.tenor.com/images/472e9ca21494da82981b0c259826754d/tenor.gif?itemid=14278042"
                ],
                chosenIndex: 0
            };
        },
        methods: {
            nextPic: function () {
                let newIndex = this.chosenIndex;
                while (newIndex === this.chosenIndex) {
                    newIndex = this.getRandomInt(this.motivationalPictures.length);
                }
                this.chosenIndex = newIndex;
            },
            getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            }
        }
    }
</script>

<style scoped>
    #rocky-img {
        height: 300px;
    }

    .img-container {
        position: relative;
        text-align: center;
        color: white;
    }
</style>
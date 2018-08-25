<template>
    <div class="page-home">
        <ProgressBar>
            <Progress v-for="(_, $index) in images"
                    :key="$index"
                    :complete="isProgress($index)"
                    @click="setActive($index)"
            />
        </ProgressBar>
        <Slideshow :image="images[currentIndex].img"/>

        <div class="page-home__btn-prev" @click="prev"></div>
        <div class="page-home__btn-next" @click="next"></div>
    </div>
</template>
<script>
import ProgressBar from '../components/ProgressBar';
import Progress from '../components/Progress';
import Slideshow from '../components/Slideshow';

const images = [{img: 'https://pp.userapi.com/r-z9WvNx13Z8X_690Wg2MpchE2sMccOWGreq4Q/3n1v7xdEYNk.jpg'}, {img: 'https://pp.userapi.com/SaSqMUkCVek4LjAPAi3HgAlcOAEt5Q-BwcIJhQ/jOPYUvuV82o.jpg'}, {img: 'https://pp.userapi.com/c625526/v625526028/458c0/rwSm8bxT1yY.jpg'}, {img: 'https://pp.userapi.com/c625526/v625526028/458c9/9vHr-Pdh9RA.jpg'}, {img: 'https://pp.userapi.com/c10400/u878028/101811078/z_f706b88c.jpg'}]
const DURATION = 9000;

let interval = null;

export default {
    name: 'Home',

    components: { Slideshow, ProgressBar, Progress },

    data() {
        return {
            currentIndex: 0,
            time: 0,
            progress: 0
        }
    },

    created() {
        this.images = images;
    },

    methods: {
        isProgress(index) {
            if (index < this.currentIndex) {
                return 100;
            } else if (index === this.currentIndex) {
                return this.progress;
            } else {
                return 0;
            }

        },

        setActive(index) {
            this.stop();

            this.currentIndex = index;

            this.play();
        },

        stop() {
            clearInterval(interval);

            this.time = 0;

            this.progress = 0;
        },

        pause() {
            clearInterval(interval);
        },

        play() {
            const step = 100;

            interval = setInterval(() => {
                if (this.time === DURATION) {
                    if (this.currentIndex < this.images.length - 1) {
                        this.currentIndex++;
                    } else {
                        this.currentIndex = 0;
                    }

                    this.time = 0;
                } else {
                    this.time += step;
                }

                this.progress = this.time / DURATION * 100;
            }, step);
        },

        prev() {
            if (this.currentIndex > 0) {
                this.setActive(this.currentIndex - 1);
            } else {
                this.setActive(this.images.length - 1);
            }
        },

        next() {
            if (this.currentIndex < this.images.length - 1) {
                this.setActive(this.currentIndex + 1);
            } else {
                this.setActive(0);
            }
        }
    },


    activated() {
        this.play();
    },

    deactivated() {
        this.pause();
    }
}
</script>
<style lang="stylus">
.page-home {
    width: 100%;
    height: 100vh;
    position: relative;

    .progress-bar {
        left: 0;
        right: 0;
        top: 0;
        position: absolute;
        z-index: 3;

        .progress {
            max-width: 70px;    
        } 
    }

    &__btn-prev, &__btn-next {
        width: 50%;
        height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 1;
    }

    &__btn-prev {
        left: 0;    
    }

    &__btn-next {
        right: 0;    
    }    
}
</style>

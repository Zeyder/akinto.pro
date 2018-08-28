<template>
    <div class="page-home">
        <Loader/>

        <template v-if="images.length">
            <transition name="fade" mode="out-in" appear>
                <ProgressBar v-if="images.length > 1">
                    <Progress v-for="(_, $index) in images"
                            :key="$index"
                            :complete="isProgress($index)"
                            @click.prevent="setActive($index)"
                    />
                </ProgressBar>
            </transition>
            
            <transition name="fade" mode="out-in" appear>
                <Slideshow :image="images[currentIndex]"/>
            </transition>

            <div class="page-home__btn-prev" @click.prevent.stop="prev"></div>
            <div class="page-home__btn-next" @click.prevent.stop="next"></div>
        </template>
    </div>
</template>
<script>
import ProgressBar from '../components/ProgressBar';
import Progress from '../components/Progress';
import Slideshow from '../components/Slideshow';
import Loader from '../components/Loader';

import imageLoader from '../utils/imageLoader';

const DURATION = 12000;

let interval = null;

export default {
    name: 'Home',

    components: { Loader, Slideshow, ProgressBar, Progress },

    data() {
        return {
            currentIndex: 0,
            time: 0,
            progress: 0,
            isLoading: false
        }
    },

    beforeMount() {
        this.images = this.$appContent.slides || [];

        this.isLoading = true;

        imageLoader(this.images).then((arr) => {
            this.isLoading = false;

            if (arr.length > 1) {
                this.play();
            }

        });
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
        if (this.images.length > 1) {
            this.play();
        }
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

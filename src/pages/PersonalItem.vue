<template>
    <div v-touch:swipe.left="goToNext" v-touch:swipe.right="goToPrev" class="page-personal-item">
        <transition name="fade" mode="out-in">
            <div :style="backgroundImage"
                :key="($route.params && $route.params.id) || 0"
                class="page-personal-item__background"
            ></div>
        </transition>
        <div class="page-personal-item__wrapper">
            <div class="page-personal-item__header">
                <transition name="fade" mode="out-in">
                    <ProgressBar v-if="isLoaded">
                        <Progress v-for="(_, $index) in images"
                            :key="$index"
                            :complete="isComplete($index)"
                            :active="$index === currentIndex"
                            @click.prevent="setImage($index)"
                        />
                    </ProgressBar>
                </transition>

                <button class="page-personal-item__btn-close" tabindex="-1" @click.prevent="close"></button>
            </div>
            <transition name="fade" mode="out-in">
                <div v-if="isLoaded"
                    class="page-personal-item__body"
                >
                    <div class="page-personal-item__btn-prev" @click.prevent.stop="prev"></div>
                    <div class="page-personal-item__images" @mousedown="pause" @mouseup="start">
                        <div v-for="(item, $index) in images" :key="$index" class="page-personal-item__image" :style="`background-image: url('${item}');opacity:${opacity($index)}`"></div>
                    </div>
                    <div class="page-personal-item__btn-next" @click.prevent.stop="next"></div>
                </div>
            </transition>

            <Loader v-if="!isLoaded"/>
        </div>
    </div>
</template>
<script>
import ProgressBar from '../components/ProgressBar';
import Progress from '../components/Progress';
import Loader from '../components/Loader';

import imageLoader from '../utils/imageLoader';

let interval = null;

const findWork = (id) => {
    const personal = window.$appContent && window.$appContent.personal || {};

    return id in personal;
}

export default {
    name: 'PersonalItem',
    components: { ProgressBar, Progress, Loader },

    beforeRouteEnter(to, _, next) {
        if (to.params.id && findWork(to.params.id)) {
            next();
        } else {
            next({name: 'NotFound'});
        }
    },

    beforeRouteUpdate(to, _, next) {
        if (to.name === 'PersonalItem' && findWork(to.params.id)) {
            this.setWork(to.params.id);
        }

        next();
    },

    data() {
        return {
            time: 0,
            currentIndex: 0,
            inProgress: false,
            progress: 100,
            images: [],
            isLoaded: false
        }
    },

    beforeMount() {
        this.setWork(this.$route.params.id);
    },

    mounted() {
        window.addEventListener('keydown', this.onKeydown);
    },

    destroyed() {
        window.removeEventListener('keydown', this.onKeydown);
    },

    computed: {
        backgroundImage() {
            if (this.images.length) {
                return `background-image: url('${this.images[this.images.length - 1]}')`;
            }

            return '';
        },

        prevWorkId() {
            const keys = Object.keys(this.$appContent.personal);
            const currentWorkIndex = keys.indexOf(this.$route.params.id);

            if (currentWorkIndex - 1 >= 0) {
                return this.$appContent.personal[keys[currentWorkIndex - 1]].id;
            } else {
                return this.$appContent.personal[keys[keys.length - 1]].id;
            }
        },

        nextWorkId() {
            const keys = Object.keys(this.$appContent.personal);
            const currentWorkIndex = keys.indexOf(this.$route.params.id);

            if (currentWorkIndex + 1 <= keys.length - 1) {
                return this.$appContent.personal[keys[currentWorkIndex + 1]].id;
            } else {
                return this.$appContent.personal[keys[0]].id;
            }
        }
    },

    methods: {
        close() {
            this.$router.replace('/personal');
        },

        start() {
            const DURATION = 2000;
            const INTERVAL_STEP = 100;

            this.inProgress = true;

            interval = setInterval(() => {
                if (this.time === DURATION) {
                    if (this.currentIndex + 1 < this.images.length) {
                        this.currentIndex++;
                        this.time = 0;
                    } else {
                        clearInterval(interval);
                    }
                } else {
                    this.time += INTERVAL_STEP;
                }

                this.progress = this.time / DURATION * 100;
            }, INTERVAL_STEP);

        },

        pause() {
            clearInterval(interval);

            this.inProgress = false;
        },

        stop() {
            clearInterval(interval);

            this.time = 0;
            this.progress = 100;
            this.inProgress = false;
        },

        isComplete(index) {
            if (index < this.currentIndex) {
                return 100;
            } else if (index === this.currentIndex) {
                return this.progress;
            }

            return 0;
        },

        opacity(index) {
            if (index === 0 || index < this.currentIndex) {
                return 1;
            } else if (index === this.currentIndex) {
                return this.progress / 100;
            }

            return 0;
        },

        setImage(index) {
            this.currentIndex = index;
            
            if (!this.inProgress) {
                this.start();
            }
        },

        setWork(id) {
            this.isLoaded = false;
            this.images = this.$appContent.personal[id].images;
            this.currentIndex = this.images.length - 1;

            imageLoader(this.images).then(() => {
                this.isLoaded = true;
            });
        },

        prev() {
            if (this.currentIndex - 1 >= 0) {
                this.pause();
                this.progress = 0;
                this.time = 0;
                this.setImage(--this.currentIndex);
            } else {
                this.goToPrev();
            }
            
        },

        goToPrev() {
            this.stop();
            this.$router.push({name: 'PersonalItem', params: {id: this.prevWorkId}});
        },

        next() {
            if (this.currentIndex + 1 < this.images.length) {
                this.pause();
                this.time = 0;
                this.progress = 0;
                this.setImage(++this.currentIndex);
            } else {
                this.goToNext();
            }
        },

        goToNext() {
            this.stop();
            this.$router.push({name: 'PersonalItem', params: {id: this.nextWorkId}});
        },

        onKeydown(e) {
            const keyCode = e.keyCode || e.which;

            switch(keyCode) {
                // Esc
                case 27: {
                    this.close();
                } break;

                // Left
                case 37: {
                    this.isLoaded && this.prev();
                } break;

                // Right

                case 39: {
                    this.isLoaded && this.next();
                } break;
            }
        }
    }

}
</script>
<style lang="stylus">
@import '../css/_variables';

html.no-scroll {
    &, & > body {
        overflow: hidden;    
    }

    .app-header {
        opacity: 0;    
    }

    .page-personal > .photo-grid {
        visibility: none;
        opacity: 0;    
    }
}

.page-personal-item {
    width: 100%;
    height: @width;
    top: -70px;
    bottom: 0;
    left: 0;
    right: @left;
    position: fixed;
    background-color: $body-background;
    padding-bottom: @top * -1;
    transform: translateY(@top * -1);
    box-sizing: content-box;
    z-index: 9999;
    overflow: hidden;

    &--animate-enter-active, &--animate-leave-active {
        transition: transform 700ms ease, opacity 700ms ease;
    }

    &--animate-enter, &--animate-leave-to {
        transform: translateY(100%);
        opacity: 0;  
    }

    &__background {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        filter: blur(10px);
        opacity: .5;
    }

    &__wrapper {
        width: 100%;
        height: @width;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        align-items: stretch;
    }

    &__header {
        width: 100%;
        height: 45px;   
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 3;
    }

    &__btn-close {
        width: 20px;
        height: @width;
        background: transparent url('../assets/close.svg') no-repeat center;
        background-size: 100%;
        position: absolute;
        top: 20px;
        right: 10px;

        @media screen and (max-width: 1024px) {
            width: 15px;
            height: @width;    
        }
    }

    &__body {
        padding: 45px 0;    
    }

    &__body, &__images {
        width: 100%;
        height: 100%;
        position: relative;
    }

    &__image {
        width: 100%;
        height: @width;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        position: absolute;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;    
    }

    &__btn-prev, &__btn-next {
        width: 25%;
        position: absolute;
        top: 45px;
        bottom: 0;
        z-index: 3;
        background-repeat: no-repeat;
        background-size: 30px;
        opacity: 0;
        transition: opacity 450ms ease;

        @media screen and (min-width: 1024px) {
            cursor: pointer;
            opacity: .4; 

            &:hover {
                opacity: 1;
            } 
        }    
    }

    &__btn-prev {
        left: 0;
        background-image: url('../assets/left-arrow.svg');
        background-position: 10% 50%;    
    }

    &__btn-next {
        right: 0;    
        background-image: url('../assets/right-arrow.svg');
        background-position: 90% 50%;    
    }
}
</style>


<template functional>
    <div class="slideshow">
        <transition name="slideshow__item--animate">
            <div :key="props.image"
                 :style="`background-image: url(${props.image})`"
                 class="slideshow__item"
            ></div>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'Slideshow',

    props: {
        image: {
            type: String,
            required: true
        }
    }
}
</script>
<style lang="stylus">
.slideshow {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;

    &__item {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        animation: zoomIn 30s linear infinite;

        &--animate-enter-active, &--animate-leave-active {
            transition: opacity 1.5s ease-in-out;    
        }


        &--animate-enter, &--animate-leave-to {
            opacity: 0;
        }
    }
}

@keyframes zoomIn {
    to {
        transform: scale(1.1);
    }    
}
</style>


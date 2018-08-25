<template functional>
    <div class="progress" v-on="data.on">
        <div :class="['progress__complete', {'progress__complete--active': props.active}]" :style="`width:${props.complete}%`"></div>
    </div>
</template>
<script>
export default {
    name: 'Progress',

    props: {
        active: {
            type: Boolean,
            default: false
        },
        complete: {
            type: Number,
            required: true,
            validator: val => val >= 0 && val <= 100
        }
    }
}
</script>
<style lang="stylus">
.progress {
    flex: 1 0 auto;
    overflow: hidden;
    background-color: rgba(#fff, .5);
    box-shadow: 0 0 20px rgba(#000, .5);
    cursor: pointer;


    &, &__complete {
        height: 4px;
        border-radius: 50px;

        @media screen and (max-width: 1024px) {
            height: 2px;    
        }
    }

    &__complete {
        width: auto;
        max-width: 100%;
        background-color: #fff;

        &--active {
            transition: width 100ms linear;    
        }    
    }
}
</style>


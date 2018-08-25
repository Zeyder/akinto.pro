<template functional>
    <transition-group name="photo-grid__column--animate" class="photo-grid" tag="div" appear>
        <router-link v-for="(item, $index) in props.items"
            :to="item.link"
            :key="$index"
            :style="`background-image: url(${item.img})`"
            class="photo-grid__column"
        ></router-link>
    </transition-group>
</template>
<script>
export default {
    name: 'PhotoGrid',

    props: {
        items: {
            type: Array,
            required: true
        }
    }
}
</script>
<style lang="stylus">
@import '../css/_variables.styl';

.photo-grid {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 7.5px;
    transition: opacity 450ms ease;

    &__column {
        flex: 1 0 200px;
        margin: 7.5px;
        background-color: rgba(#fff, .1);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        cursor: pointer;

        &:after {
            content: '';
            display: block;
            padding-top: 100%;
        }

        &--animate-enter-active {
            transition: opacity 450ms ease, transform 450ms ease;
        }

        &--animate-enter {
            transform: translateY(10px);
            opacity: 0;
        }

        for i in 1..15 {
            &:nth-child({i}) {
                transition-delay: unit(i * 100, 'ms');
            }
        }

    }
}
</style>

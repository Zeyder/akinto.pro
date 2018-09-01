<template functional>
    <transition-group name="photo-grid__column--animate" class="photo-grid" tag="div" appear>
        <router-link v-for="(item, key, index) in props.items"
            :to="{name: 'PersonalItem', params: {id: item.id}}"
            :key="key"
            :style="{backgroundImage: `url('${item.img}')`, transitionDelay: `${index / 10}s`}"
            class="photo-grid__column"
        ></router-link>
    </transition-group>
</template>
<script>
export default {
    name: 'PhotoGrid',

    props: {
        items: {
            type: [Array, Object],
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
    transition: opacity 450ms ease, visibility 450ms ease;

    &__column {
        flex: 1 0 250px;
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
    }
}
</style>

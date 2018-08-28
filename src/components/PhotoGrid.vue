<template functional>
    <transition-group name="photo-grid__column--animate" class="photo-grid" tag="div" appear>
        <router-link v-for="(item, key) in props.items"
            :to="{name: 'PersonalItem', params: {id: item.id}}"
            :key="key"
            :style="{backgroundImage: `url('${item.img}')`}"
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
    padding: 7.5px;
    transition: opacity 450ms ease, visibility 450ms ease;

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
    }
}
</style>

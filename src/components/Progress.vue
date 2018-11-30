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
    cursor: pointer;
    overflow: hidden;
    border-radius: 50px;
    background-color: rgba(#fff, .5);
    box-shadow: 0 0 20px rgba(#000, .5);

    &__complete {
        width: auto;
        max-width: 100%;
        height: 4px;
        background-color: #fff;

        &--active {
            transition: width 100ms linear;
        }

        @media screen and (max-width: 1024px) {
            height: 2px;
        }
    }
}
</style>

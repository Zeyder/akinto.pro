<script>
import AppHeader from '@/components/AppHeader';
export default {
  name: 'app',
  functional: true,
  render: h => h('div', {class: 'app-layout'}, [
    h(AppHeader), null, [
      h('main', null, [
        h('transition', {props: {
          name: 'page--animate',
          mode: 'out-in',
          appear: true
        }}, [
          h('keep-alive', null, [
            h('router-view')])
          ])
        ])
      ]
    ])
}
</script>
<style lang="stylus">
@import '../css/_variables.styl';
@import '../css/index.styl';

.app-layout {
  width: 100%;
  transition: padding 450ms ease;
  
  @media screen and (min-width: 1024px) {
    padding-left: $app-header-width;  
  }
}

.page {
    &--animate-enter-active, &--animate-leave-active {
      transition: opacity 700ms ease;
    }

    &--animate-enter, &--animate-leave-to {
      opacity: 0;
    } 
  }
</style>

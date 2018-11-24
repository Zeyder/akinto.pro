<template>
  <div class="app-layout">
    <AppHeader :class="{'app-header--hide': isHideHeader}"/>

    <main>
      <transition name="page--animate" mode="out-in" appear>
        <keep-alive :exclude="excludeRoutes">
          <router-view/>
        </keep-alive>
      </transition>
    </main>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
export default {
  name: 'app',
  components: { AppHeader },
  computed: {
    isHideHeader () {
      return this.$route.name === 'PersonalItem'
    },

    excludeRoutes () {
      return ['Contacts', 'PersonalItem', 'CommercialItem']
    }
  }
}
</script>
<style lang="stylus">
@import '../css/_variables.styl';
@import '../css/index.styl';

.app-layout {
  width: 100%;
  transition: padding 350ms ease;

  @media screen and (min-width: 1024px) {
    padding-left: $app-header-width;
  }
}

.page {
  &--animate-enter-active, &--animate-leave-active {
    transition: opacity 600ms ease;
  }

  &--animate-enter, &--animate-leave-to {
    opacity: 0;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 350ms ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

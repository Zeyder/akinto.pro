<template>
    <div v-touch:swipe.left="goToNext" v-touch:swipe.right="goToPrev" class="page-personal-item">
      <div class="container">
        <transition name="fade" mode="out-in">
          <div v-if="isLoaded" ref="header" class="page-personal-item__header">
            <button v-if="inProgress" class="page-personal-item__btn page-personal-item__btn--pause" tabindex="-1" @click.left.prevent="pause"></button>
            <button v-else class="page-personal-item__btn page-personal-item__btn--play" tabindex="-1" @click.left.prevent="rePlay"></button>

            <ProgressBar>
                <Progress v-for="(_, $index) in images"
                    :key="$index"
                    :complete="isComplete($index)"
                    :active="$index === currentImageIndex"
                    @click.left.prevent="setImage($index)"
                />
            </ProgressBar>

            <button class="page-personal-item__btn page-personal-item__btn--close" tabindex="-1" @click.left.prevent="close"></button>
          </div>
        </transition>
        <transition name="fade" mode="out-in">
            <div v-if="isLoaded"
                class="page-personal-item__body"
            >
              <div class="page-personal-item__btn-prev" @click.left.prevent="prev"></div>
              <img v-for="(item, $index) in images"
                  :key="$index"
                  :src="item"
                  :style="`opacity:${opacity($index)}`"
                  class="page-personal-item__image"
                  alt=""
                  @mousedown.left.prevent="pause"
                  @mouseup.left.prevent="play"
              />
              <div class="page-personal-item__btn-next" @click.left.prevent="next"></div>
            </div>
        </transition>

        <Loader v-if="!isLoaded"/>
      </div>
    </div>
</template>
<script>
import ProgressBar from '../components/ProgressBar'
import Progress from '../components/Progress'
import Loader from '../components/Loader'

import imageLoader from '../utils/imageLoader'
import findWork from '../utils/findWork'
import _debounce from 'lodash/debounce'

let interval = null

export default {
  name: 'PersonalItem',
  components: { ProgressBar, Progress, Loader },

  beforeRouteEnter (to, _, next) {
    if (to.params.id && findWork(to.params.id, 'personal')) {
      next()
    } else {
      next({ name: 'NotFound' })
    }
  },

  beforeRouteUpdate (to, _, next) {
    if (to.name === 'PersonalItem' && findWork(to.params.id, 'personal')) {
      this.setWork(to.params.id)
    }

    next()
  },

  data () {
    return {
      time: 0,
      currentImageIndex: 0,
      inProgress: false,
      progress: 100,
      images: [],
      isLoaded: false
    }
  },

  beforeMount () {
    this.setWork(this.$route.params.id)
  },

  mounted () {
    window.addEventListener('keydown', this.onKeydown)
    window.addEventListener('resize', this.setWidthHeader)
  },

  beforeDestroy () {
    this.stop()

    window.removeEventListener('keydown', this.onKeydown)
    window.removeEventListener('resize', this.setWidthHeader)
  },

  computed: {
    prevWorkId () {
      const keys = Object.keys(this.$appContent.personal)
      const currentWorkIndex = keys.indexOf(this.$route.params.id)

      if (currentWorkIndex - 1 >= 0) {
        return this.$appContent.personal[keys[currentWorkIndex - 1]].id
      } else {
        return this.$appContent.personal[keys[keys.length - 1]].id
      }
    },

    nextWorkId () {
      const keys = Object.keys(this.$appContent.personal)
      const currentWorkIndex = keys.indexOf(this.$route.params.id)

      if (currentWorkIndex + 1 <= keys.length - 1) {
        return this.$appContent.personal[keys[currentWorkIndex + 1]].id
      } else {
        return this.$appContent.personal[keys[0]].id
      }
    }
  },

  methods: {
    close () {
      this.$router.replace('/personal')
    },

    play () {
      const TOTAL_SECONDS = 30
      const MILLISECOND = 100
      this.inProgress = true

      interval = setInterval(() => {
        if (this.time < TOTAL_SECONDS * MILLISECOND) {
          this.time += MILLISECOND
          this.progress = Math.round((this.time / (TOTAL_SECONDS * MILLISECOND)) * 100)
        } else if (this.currentImageIndex < this.images.length - 1) {
          this.time = 0
          this.progress = 0
          this.currentImageIndex++
        } else {
          this.pause()
        }
      }, MILLISECOND)
    },

    pause () {
      clearInterval(interval)

      this.inProgress = false
    },

    stop () {
      clearInterval(interval)

      this.time = 0
      this.progress = 0
      this.inProgress = false
    },

    isComplete (index) {
      if (index < this.currentImageIndex) {
        return 100
      } else if (index === this.currentImageIndex) {
        return this.progress
      }

      return 0
    },

    opacity (index) {
      if (index === 0 || index <= this.currentImageIndex) {
        return 1
      }

      return 0
    },

    setImage (index) {
      this.stop()

      this.currentImageIndex = index

      this.play()
    },

    setWork (id) {
      this.isLoaded = false
      this.images = this.$appContent.personal[id].images.slice().reverse()
      this.images.push(this.images[0])
      this.currentImageIndex = 0

      imageLoader(this.images).then(() => {
        this.isLoaded = true

        this.$nextTick(this.setWidthHeader)

        this.play()
      })
    },

    prev: _debounce(function () {
      if (this.currentImageIndex - 1 >= 0) {
        this.setImage(--this.currentImageIndex)
      } else {
        this.goToPrev()
      }
    }, 100, { leading: true, trailing: false }),

    goToPrev () {
      this.stop()
      this.$router.push({ name: 'PersonalItem', params: { id: this.prevWorkId } })
    },

    next: _debounce(function () {
      if (this.currentImageIndex < this.images.length - 1) {
        this.setImage(++this.currentImageIndex)
      } else {
        this.goToNext()
      }
    }, 100, { leading: true, trailing: false }),

    goToNext () {
      this.stop()
      this.$router.push({ name: 'PersonalItem', params: { id: this.nextWorkId } })
    },

    onKeydown (e) {
      const keyCode = e.keyCode || e.which

      switch (keyCode) {
        // Esc
        case 27:
          this.close()

          break
          // Left
        case 37:
          this.isLoaded && this.prev()

          break

          // Right

        case 39:
          this.isLoaded && this.next()

          break
      }
    },

    setWidthHeader () {
      this.$refs.header.style.width = this.$el.querySelector('.page-personal-item__image').clientWidth + 'px'
    },

    rePlay () {
      if (this.currentImageIndex === this.images.length - 1) {
        this.setImage(0)
      } else {
        this.play()
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
    transform: translateY(@top * -1);
    box-sizing: content-box;
    z-index: 9999;
    overflow: hidden;

    .container {
      width: 100%;
      height: 100%;
      max-width: 1024px;
      display: flex;
      flex-direction: column;
      justify-content: stretch;
      align-items: stretch;
      padding: 0 10px 10px;
      margin: auto;
    }

    &__header {
        flex: 0 0 auto;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: auto;
    }

    &__btn {
        width: 20px;
        height: @width;
        background-size: 100%;

        &--close {
          background: transparent url('../assets/close.svg') no-repeat center;
          position: fixed;
          top: 16px;
          right: 15px;

          z-index: 3;

          @media screen and (max-width: 1024px) {
            margin-left: 10px;
            position: static;
          }
        }

        &--play, &--pause {
          margin-right: 10px;
        }

        &--play {
          background: transparent url('../assets/play.svg') no-repeat center;
        }

        &--pause {
          background: transparent url('../assets/pause.svg') no-repeat center;
        }
    }

    &__body {
        flex: 1 1 auto;
        padding: 0 10%;
        position: relative;
    }

    &__image {
        max-width: 100%;
        max-height: 100%;
        margin: auto;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
    }

    &__btn-prev, &__btn-next {
        width: 45%;
        position: fixed;
        top: 40px;
        bottom: 10px;
        margin: auto;
        background-repeat: no-repeat;
        background-size: 30px;
        opacity: 0;
        transition: opacity 450ms ease;
        z-index: 3;

        @media screen and (min-width: 1025px) {
            width: 50%;
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

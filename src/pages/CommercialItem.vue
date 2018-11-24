<template>
  <div class="page-commercial-item">
    <button class="page-commercial-item__btn-back"
            @click="goBack"
    ></button>

    <div v-if="isLoaded"
        class="container"
    >
      <div v-if="isShowInfo" class="page-commercial-item__info">
        <p v-for="(value, $key, $index) in info"
          :key="$index"
        >
          <span v-text="$key + ':'"></span>
          <span v-text="value"></span>
        </p>
      </div>

      <img v-for="(img, $index) in images"
          :key="$index"
          :src="img"
          alt=""
      />
    </div>

    <Loader v-else/>
  </div>
</template>
<script>
import findWork from '../utils/findWork'
import imageLoader from '../utils/imageLoader'

import Loader from '../components/Loader'

export default {
  name: 'CommercialItem',
  components: { Loader },
  beforeRouteEnter (to, _, next) {
    if (to.params.id && findWork(to.params.id, 'commercial')) {
      next()
    } else {
      next({ name: 'NotFound' })
    }
  },

  data () {
    return {
      isLoaded: false
    }
  },

  beforeMount () {
    imageLoader(this.images).then(() => (this.isLoaded = true))
  },

  computed: {
    project () {
      return this.$appContent.commercial[this.$route.params.id]
    },

    images () {
      return this.project.images || []
    },

    info () {
      return this.project.info || {}
    },

    isShowInfo () {
      return Object.keys(this.info).length > 0
    }
  },

  methods: {
    goBack () {
      this.$router.replace('/commercial')
    }
  }
}
</script>
<style lang="stylus">
@import '../css/_variables.styl';

.page-commercial-item {
  position: relative;
  min-height: 100vh;
  padding: 5px;

  &__btn-back {
    width: 40px;
    height: 40px;
    position: fixed;
    top: 10px;
    left: $app-header-width + 10px;
    background: transparent url('../assets/back.svg') no-repeat center;
    background-size: 70%;

    @media screen and (max-width: 1023px) {
      top: 5px;
      left: 5px;
    }
  }

  .container {
    max-width: 100%;
    margin: auto;

    @media screen and (min-width: 1024px) {
      max-width: 768px;
    }
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    max-width: 100%;
    margin-bottom: 5px;
  }

  &__info {
    margin-top: 50px;
    margin-bottom: 17px;
    font-size: 1.4rem;

    p {
      display: flex;
      margin-bottom: 3px;
    }

    span:first-child {
      color: rgba(#fff, .3);
      margin-right: 5px;
    }

    span:last-child {
      color: #fff;
    }
  }
}
</style>

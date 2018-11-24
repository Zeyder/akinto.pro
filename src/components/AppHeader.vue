<template>
    <header class="app-header">
        <button class="app-header__btn"
                tabindex="-1"
                @click="isOpenBar = !isOpenBar"
        >
            <span :class="['app-header__btn-icon', {'app-header__btn-icon--active': isOpenBar}]">
                <span></span>
                <span></span>
                <span></span>
            </span>
        </button>

        <div :class="['app-header__overlay', {'app-header__overlay--show': isOpenBar}]" @click="isOpenBar = !isOpenBar"></div>

        <nav :class="['app-header__nav', {'app-header__nav--open': isOpenBar}]">
            <div class="app-header__nav-scrollbar">
                <router-link to="/"
                             class="app-header__user-info"
                >
                    <div ref="avatar"
                         class="app-header__avatar"
                    ></div>

                    <div class="app-header__userdesc">
                        <h1 class="app-header__username">Serge Akinto</h1>
                        <span class="app-header__position">retoucher</span>
                    </div>
                </router-link>

                <router-link to="/" class="app-header__link">Home</router-link>
                <router-link to="/personal" class="app-header__link">Personal</router-link>
                <router-link to="/commercial" class="app-header__link">Commercial</router-link>
                <router-link to="/videos" class="app-header__link">Videos</router-link>
                <router-link to="/contacts" class="app-header__link">Contacts</router-link>

                <div class="app-header__social-bar">
                    <span class="twitter" @click.prevent="openLink('twitter')"></span>
                    <span class="instagram" @click.prevent="openLink('instagram')"></span>
                    <span class="behance" @click.prevent="openLink('behance')"></span>
                    <span class="facebook" @click.prevent="openLink('facebook')"></span>
                    <span class="vimeo" @click.prevent="openLink('vimeo')"></span>
                    <span class="fivepx" @click.prevent="openLink('500px')"></span>
                </div>
            </div>
        </nav>
    </header>
</template>
<script>
export default {
  name: 'AppHeader',

  watch: {
    '$route': 'toggleBar'
  },

  data () {
    return {
      isOpenBar: false
    }
  },

  mounted () {
    const avatar = this.$appContent.settings && this.$appContent.settings.avatar

    this.$refs.avatar.style.backgroundImage = `url(${avatar})`

    this.toggleBar()

    window.addEventListener('resize', this.toggleBar)
  },

  methods: {
    toggleBar () {
      this.isOpenBar = window.innerWidth >= 1024
    },

    openLink (socialName) {
      const socialLinks = (this.$appContent.settings && this.$appContent.settings.socialLinks) || {}

      if (socialName in socialLinks) {
        const otherWindow = window.open()

        otherWindow.opener = null
        otherWindow.location = socialLinks[socialName]
      }
    }
  }
}
</script>
<style lang="stylus">
@import '../css/_variables.styl';

.app-header {
    transition: opacity 600ms ease;

    &__btn-icon {
        width: 30px;
        height: 20px;
        display: flex;

        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;

        span {
            width: 100%;
            height: 2px;
            border-radius: 3px;
            background-color: #fff;
            box-shadow: 0 0 20px rgba(#000, .5);
            transition: all 350ms ease;

            &:nth-child(2) {
                width: 85%;
            }

            &:nth-child(3) {
                width: 70%;
            }
        }

        &--active span {
            &:nth-child(1) {
                transform: rotate(-45deg) translateX(-21%) translateY(6.3px);
            }

            &:nth-child(2) {
                transform: rotate(45deg) translateX(-1px) translateY(-1.6px);
            }

            &:nth-child(3) {
                transform: rotate(45deg) translateX(1px) translateY(-9.6px);
            }
        }
    }

    &__btn {
        width: 45px;
        height: 45px;
        position: fixed;
        right: 0px;
        top: 0px;
        display: flex;
        z-index: 3;

        justify-content: center;
        align-items: center;

        @media screen and (min-width: 1024px) {
            display: none;
        }
    }

    @media screen and (max-width: 1023px) {
        &__overlay {
            position: fixed;
            top: -70px;
            left: 0;
            right: 0;
            bottom: -70px;
            z-index: 2;
            background-color: rgba(#000, .8);
            transition: opacity 350ms ease, visibility 350ms ease;
            opacity: 0;
            visibility: hidden;

            &--show {
                opacity: 1;
                visibility: visible;
            }
        }
    }

    &__nav {
        left: 0;
        top: 0;
        bottom: 0;
        width: $app-header-width;
        height: 100%;
        background-color: $app-header-background;
        position: fixed;
        top: 0;
        left: 0;
        overflow: hidden;
        transition: transform 350ms ease;
        transform: translateX($app-header-width * -1);
        z-index: 99;

        &--open {
            transform: translateX(0);
        }
    }

    &__nav-scrollbar {
        width: $app-header-width + 17px;
        height: 100%;
        overflow-y: scroll;
        padding: 20px 25px 20px 20px;
        -webkit-overflow-scrolling: touch;
        scroll-behavior: smooth;
    }

    &__user-info {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding-bottom: 20px;
        margin-bottom: 15px;
        border-bottom: 1px solid rgba(#fff, .1);
    }

    &__avatar {
        width: 80px;
        height: @width;
        border-radius: 50%;
        background-color: rgba(#fff, .1);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        margin-right: 15px;
    }

    &__userdesc {
        width: 90px;
    }

    &__username {
        font-size: 2.4rem;
        color: #fff;
    }

    &__position {
        margin-top: 5px;
        color: rgba(#fff, .3);
        font-size: 1.4rem;
    }

    &__link {
        display: block;
        width: 100%;
        padding: 10px 0;
        font-size: 1.6rem;
        font-weight: 500;
        color: #fff;
        transition: color 350ms ease;

        @media screen and (min-width: 1024px) {
            &:hover {
                color: $violet;
            }
        }
    }

    &__social-bar {
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        margin-top: 15px;
        padding-top: 20px;
        border-top: 1px solid rgba(#fff, .1);

        span {
            flex-grow: 1;
            flex-shrink: 1;
            flex-basis: auto;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            background-color: transparent;
            transition: background-color 350ms ease;

            &:after {
                content: '';
                display: block;
                padding-top: 100%;
            }

            @media screen and (min-width: 1024px) {
                &:hover {
                    cursor: pointer;
                    background-color: $violet;
                }
            }
        }

        .twitter {
            background-image: url('../assets/twitter.svg');
        }

        .behance {
            background-image: url('../assets/behance.svg');
        }

        .instagram {
            background-image: url('../assets/instagram.svg');
        }

        .facebook {
            background-image: url('../assets/facebook.svg');
        }

        .fivepx {
            background-image: url('../assets/500px.svg');
        }

        .vimeo {
            background-image: url('../assets/vimeo.svg');
        }
    }

    &--hide {
        opacity: 0;
    }
}
</style>

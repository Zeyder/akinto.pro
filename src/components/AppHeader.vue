<template>
    <header class="app-header">
        <button :class="['app-header__btn', {'app-header__btn--active': isOpenBar}]"
                tabindex="-1"
                @click="isOpenBar = !isOpenBar"
        >
            <span></span>
            <span></span>
            <span></span>
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
                    <a href="#" class="twitter" @click.prevent="openLink('#')"></a>
                    <a href="#" class="instagram" @click.prevent="openLink('#')"></a>
                    <a href="#" class="behance" @click.prevent="openLink('#')"></a>
                    <a href="#" class="facebook" @click.prevent="openLink('#')"></a>
                    <a href="#" class="vimeo" @click.prevent="openLink('#')"></a>
                    <a href="#" class="fivepx" @click.prevent="openLink('#')"></a>
                </div>
            </div>
        </nav>
    </header>
</template>
<script>
export default {
    name: 'AppHeader',

    watch: {
        '$route'() {
            this.isOpenBar = window.innerWidth > 1024;
        }
    },

    data() {
        return {
            isOpenBar: false
        }
    },

    mounted() {
        this.init();

        window.addEventListener('resize', this.init);

        this.$refs.avatar.style.backgroundImage = `url('https://pp.userapi.com/c824409/v824409427/43826/5c_Hb6AXkoo.jpg?ava=1')`;
    },

    methods: {
        init() {
            if (window.innerWidth > 1024) {
                this.isOpenBar = true;
            } else {
                this.isOpenBar = false;
            }
        },

        openLink(link) {
            let otherWindow = window.open();
            otherWindow.opener = null;
            otherWindow.location = link;
        }
    }
}
</script>
<style lang="stylus">
@import '../css/_variables.styl';

.app-header {
    &__btn {
        width: 30px;
        height: 20px;
        position: fixed;
        right: 10px;
        top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
        z-index: 3;


        span {
            width: 100%;
            height: 2px;
            border-radius: 3px;
            background-color: #fff;
            box-shadow: 0 0 20px rgba(#000, .5);
            transition: all 450ms ease;

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

        @media screen and (min-width: 1024px) {
            display: none;
        }   
    }

    @media screen and (max-width: 1024px) {
        &__overlay {
            position: fixed;
            top: -70px;
            left: 0;
            right: 0;
            bottom: -70px;
            z-index: 2;
            background-color: rgba(#000, .8);
            transition: opacity 450ms ease, visibility 450ms ease;
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
        transition: transform 450ms ease;
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
        transition: color 450ms ease;

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

        a {
            flex-grow: 1;
            flex-shrink: 1;
            flex-basis: auto;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            background-color: transparent;
            transition: background-color 450ms ease;

            &:after {
                content: '';
                display: block;
                padding-top: 100%;    
            }

            @media screen and (min-width: 1024px) {
                &:hover {
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
}
</style>


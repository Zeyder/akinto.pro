<template>
    <div class="page-personal">
        <PhotoGrid :items="images"/>

        <transition name="page-personal-item--animate" duration="700" appear @enter="enter" @after-leave="afterLeave">
            <router-view/>
        </transition>
    </div>
</template>
<script>
import PhotoGrid from '../components/PhotoGrid';

export default {
    name: 'Personal',
    components: { PhotoGrid },

    created() {
        this.images = [
            {img: 'https://pp.userapi.com/r-z9WvNx13Z8X_690Wg2MpchE2sMccOWGreq4Q/3n1v7xdEYNk.jpg',link: '/personal/1'},
            {img: 'https://pp.userapi.com/SaSqMUkCVek4LjAPAi3HgAlcOAEt5Q-BwcIJhQ/jOPYUvuV82o.jpg',link: '/personal/1'},
            {img: 'https://pp.userapi.com/c625526/v625526028/458c0/rwSm8bxT1yY.jpg', link: '/personal/1'},
            {img: 'https://pp.userapi.com/c625526/v625526028/458c9/9vHr-Pdh9RA.jpg', link: '/personal/1'},
            {img: 'https://pp.userapi.com/r-z9WvNx13Z8X_690Wg2MpchE2sMccOWGreq4Q/3n1v7xdEYNk.jpg',link: '/personal/1'},
            {img: 'https://pp.userapi.com/SaSqMUkCVek4LjAPAi3HgAlcOAEt5Q-BwcIJhQ/jOPYUvuV82o.jpg',link: '/personal/1'},
            {img: 'https://pp.userapi.com/c625526/v625526028/458c0/rwSm8bxT1yY.jpg', link: '/personal/1'},
            {img: 'https://pp.userapi.com/c625526/v625526028/458c9/9vHr-Pdh9RA.jpg', link: '/personal/1'},
            {img: 'https://pp.userapi.com/r-z9WvNx13Z8X_690Wg2MpchE2sMccOWGreq4Q/3n1v7xdEYNk.jpg',link: '/personal/1'},
            {img: 'https://pp.userapi.com/SaSqMUkCVek4LjAPAi3HgAlcOAEt5Q-BwcIJhQ/jOPYUvuV82o.jpg',link: '/personal/1'},
            {img: 'https://pp.userapi.com/c625526/v625526028/458c0/rwSm8bxT1yY.jpg', link: '/personal/1'},
            {img: 'https://pp.userapi.com/c625526/v625526028/458c9/9vHr-Pdh9RA.jpg', link: '/personal/1'},
            {img: 'https://pp.userapi.com/c10400/u878028/101811078/z_f706b88c.jpg', link: '/personal/1'}
        ]
    },

    methods: {
        enter() {
            document.body.style.paddingRight = window.outerWidth - document.body.clientWidth + 'px';
            document.querySelector('html').classList.add('no-scroll');
        },

        afterLeave() {
            document.querySelector('html').classList.remove('no-scroll');
            document.body.style.paddingRight = 0
        }
    }
}
</script>


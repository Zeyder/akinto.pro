<template>
    <div class="page-personal">
        <PhotoGrid :items="$appContent.personal || []"/>

        <transition name="page-personal-item--animate" appear @enter="enter" @after-leave="afterLeave">
            <router-view/>
        </transition>
    </div>
</template>
<script>
let scrollTop = 0;

import PhotoGrid from '../components/PhotoGrid';

export default {
    name: 'Personal',
    components: { PhotoGrid },

    methods: {
        enter() {
            scrollTop = document.body.scrollTop;
            document.body.style.paddingRight = window.outerWidth - document.body.clientWidth + 'px';
            document.querySelector('html').classList.add('no-scroll');
        },

        afterLeave() {
            document.querySelector('html').classList.remove('no-scroll');
            document.body.style.paddingRight = 0;
            document.body.scrollTop = scrollTop;
        }
    }
}
</script>


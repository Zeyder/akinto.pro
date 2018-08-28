<template>
    <div class="page-videos">
        <div v-for="(video, $index) in videos" :key="$index" class="page-videos__embed">
            <iframe :src="video" class="page-videos__video" frameborder="0" allowfullscreen></iframe>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Videos',
    beforeMount() {
        this.videos = this.$appContent.settings && this.$appContent.settings.videos;
    }
}
</script>
<style lang="stylus">
@import '../css/_variables.styl';

$sidebar-width = 230px;

.page-videos {
    padding: 0 20px 20px;
    &__embed {
        width: 100%;
        position: relative;
        padding-top: 56.1%;
        margin-top: 20px;
        background-color: rgba(#fff, .1);
    }

    &__video {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
    }
}
</style>


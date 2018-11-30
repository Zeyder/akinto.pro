<template functional>
    <div class="progress-bar">
        <slot/>
    </div>
</template>
<script>
export default {
  name: 'ProgressBar'
}
</script>
<style lang="stylus">
.progress-bar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .progress + .progress {
        margin-left: 4px;
    }
}
</style>

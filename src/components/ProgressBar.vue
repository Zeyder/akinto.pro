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
    padding: 0 10px;

    .progress + .progress {
        margin-left: 2px;
    }
}
</style>

<template>
    <div class="not-found">404</div>
</template>
<script>
export default {
    name: 'NotFound'
}
</script>
<style lang="stylus">
@import "../css/_variables.styl";
.not-found {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    font-size: 12rem;
    color: rgba(#fff, .1);
    font-weight: 700;
}
</style>

<script>
export default {
    name: 'Loader',
    functional: true,
    render: h => h('div', {class: 'loader'})
}
</script>
<style lang="stylus">
@import "../css/_variables.styl";
.loader {
    width: 40px;
    height: @width;
    margin-top: (@height / -2);
    margin-left: (@width / -2);
    border: 1px solid transparent;
    border-top: 2px solid #fff;
    border-left: 2px solid #fff;
    animation: rotation 2s linear infinite;    
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
}

@keyframes rotation {
    to {
        transform: rotate(360deg);
    }    
}
</style>


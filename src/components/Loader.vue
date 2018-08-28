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
    border-top: 2px solid $violet;
    border-bottom: 2px solid $violet;
    animation: rotation 2s linear infinite alternate-reverse;    

    &, &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 50%;
    }

    &:after {
        width: 50px;
        height: @width;
        margin-top: (@height / -2);
        margin-left: (@width / -2);
        border: 1px solid transparent;
        border-left: 2px solid $violet;
        border-right: 2px solid $violet;
        animation: rotation 3.5s linear infinite alternate-reverse;    
    }
}

@keyframes loading {
    50% {
        transform: scale(1.2);    
    }
}

@keyframes rotation {
    to {
        transform: rotate(360deg);
    }    
}
</style>


<template>
    <div class="poster-bg"></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Poster',
    computed: {
        getBg(){
            mapGetters('movies', ['bg'])
        }
    }
}
</script>


<style lang="scss" scoped>
    .poster-bg{
        background-color: aqua;
        z-index: -2;
        opacity: 0.7;
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>
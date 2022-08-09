<template>
    <div class="poster-bg" :style="`background: ${posterBg}` "></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Poster',
    computed: {
            ...mapGetters('movies', ['posterBg'])
       
    }
}
</script>


<style lang="scss" scoped>
    .poster-bg{
        z-index: -2;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-repeat: no-repeat !important;
        background-position: center !important;
        background-size: cover !important;
        transition: all 0.2s ease;
        &::before{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: linear-gradient(45deg, rgb(0,3,38) 0%, rgb(82, 15, 117) 100%);
            opacity: 0.9;
        }
    }
</style>
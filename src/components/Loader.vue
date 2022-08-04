<template>
    <div v-if="isShowLoader" class="loader-wrap">
        <b-spinner class="spinner"  variant="light" type="grow" label="Loading..."></b-spinner>  
    </div>
</template>



<script>
import { mapGetters } from 'vuex'
export default {
    name: "Loader",
    computed:{
        ...mapGetters(['isShowLoader'])
    }
}
</script>



<style lang="scss" scoped>
    .loader-wrap {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
    }
    .loader-wrap ::v-deep .sr-only {
        position: absolute;
        left: 40px;
        top: 5px;
    }
</style>
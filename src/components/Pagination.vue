<template>
    <div class="movies-pagination d-flex justify-content-center">
        <BPagination v-model="currentPageModel"
         :per-page="perPage" 
         :total-rows="total" 
         prev-text="Prev" 
         next-text="Next"
         /> 
    </div>
    
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: "Pagination",
    props:{
        currentPage: {
            type: Number,
            default: 1,
        },
        total: {
            type: Number,
            default: 1,
        },
        perPage: {
            type: Number,
            default: 1,
        }
    },
    computed: {
        currentPageModel: {
            get(){
                return this.currentPage;
            },
            set(value){
                this.$emit("pageChanged", value);
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    .movies-pagination {
        margin-top: 30px;
    }
    .movies-pagination ::v-deep .pagination .page-item .page-link {
        background-color: transparent;
        font-size: 16px;
        color: #fff;
        box-shadow: none;
        // position: fixed;
        // bottom: 20px;
    }
    .movies-pagination ::v-deep .pagination .page-item.active .page-link{
        border-color: #fff;
        background-color: #fff;
        color: #000;
    }
    .movies-pagination ::v-deep .pagination .page-item.disabled .page-link{
        color: gray;
        // background-color: green;
    }
</style>
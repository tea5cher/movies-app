<template>
    <header class="header">
         <BNavbar type="dark" class="navbar" variant="dark">
            <BContainer>
                <BNavbarBrand href="#">MovieDB</BNavbarBrand>
                <BNavForm>
                    <BFormInput @keypress.enter.prevent="onSearchValueChanged" v-model="searchValue" debounce="500" class="mr-sm-2 search-input" placeholder="Search..."></BFormInput>        
                </BNavForm>
            </BContainer>
        </BNavbar>
    </header>
    
</template>


<script>
import { computed } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Header',
    data(){
        return{
            searchValue: '',        
        }
    },
    methods: {
        ...mapActions('movies', ['searchMovieAndChangeList','fetchMovies', 'toggleSearchState']),
        onSearchValueChanged(val){
            if(val){
                this.toggleSearchState(true);
                this.searchMovieAndChangeList(val);
                
            } else {
                this.toggleSearchState(false);
                this.fetchMovies()
            }
            
        }
    },
    watch: {
        searchValue: 'onSearchValueChanged'
    },
}
</script>


<style lang="scss" scoped>
    .header {
        margin-bottom: 30px;
        
    }
    .navbar {
        background-color: rgba(0,0,0,0.7) !important;
        display: flex;
        align-items: center;
    }
    .search-input {
        color: #6c757d;
        background-color: rgba(255,255,255,0.7);
        border-color: rgba(0,0,0,0.6);
        &:focus{
            box-shadow: none;
            background-color: rgba(255,255,255,0.7);
            border-color: rgba(0,0,0,0.6);
            color: #6c757d;
        }
    }
</style>
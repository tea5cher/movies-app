<template>
    <b-container>
        <h3 class="list-title">{{ listTitle }}</h3>
        <b-row>
            <template v-if='isExist'>
                <b-col cols="3" v-for="(movie, key) in list" :key="key">
                    <MovieItem @removeMovie="onRemoveMovie" :movie="movie"/>
                </b-col>
            </template>
            <template v-else>
                <div>Empty list</div>
            </template>
        </b-row>
    </b-container>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';
import MovieItem from './MovieItem.vue'

export default {
    name: 'MoviesList',
    components: {
        MovieItem
    },
    props: {
        list: {
            type: Object,
            default: ()=> ({}),
        }
    },
    methods: {
        ...mapActions('movies', ['removeMovieFromList']),
        ...mapActions(['showNotify']),
        async onRemoveMovie({id, title}) {
            const bool = await this.$bvModal.msgBoxConfirm(
                `Are you sure delete '${title}'?
            `)
            if (bool){
                this.removeMovieFromList(id);
                this.showNotify({
                    msg: "Movie deleted successful",
                    variant: "success",
                    title: "Success"
                });
            }
        }   
    },
    computed: {
        ...mapGetters('movies', ['isSearch']),
        isExist(){
            return Boolean(Object.keys(this.list).length)
        },
        listTitle() {
            return this.isSearch ? 'Search results' : 'Top 250 IMDB'
        },
        
    },
}
</script>

<style lang="scss" scoped>
    .list-title {
        font-size: 50px;
        margin-bottom: 30px;
        color: #fff;
    }
</style>
<template>
    <b-container>
        <h3 class="list-title">{{ listTitle }}</h3>
        <b-row>
            <template v-if='isExist'>
                <b-col cols="3" v-for="(movie, key) in list" :key="key">
                    <MovieItem @emitOpenModalMovie='onOpenModalMovie' @removeMovie="onRemoveMovie" :movie="movie"/>
                </b-col>
            </template>
            <template v-else>
                <div>Empty list</div>
            </template>
        </b-row>
        <BModal body-class="movie-modal-body" :id="modalID" size="xl" hide-footer hide-header>
            <!-- <p class="my-4">{{this.list[this.movieID]}}</p> -->
            <MovieModalInfo :movie="modalMovie" @closeModal='onCloseModal'/>
        </BModal>
    </b-container>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';
import MovieItem from './MovieItem.vue'
import MovieModalInfo from './MovieModalInfo.vue'

export default {
    name: 'MoviesList',
    components: {
        MovieItem,
        MovieModalInfo
    },
    data(){
        return{
            modalID: 'modal-movie',
            movieID: '',
        }
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
        },
        onOpenModalMovie(id){
            this.movieID = id;
            this.$bvModal.show('modal-movie')
        },
        onCloseModal() {
            this.movieID = null;
            this.$bvModal.hide('modal-movie')
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
        modalMovie() {
            return this.modalID ? this.list[this.movieID] : null
        }
        
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


<style lang="scss">
     .movie-modal-body {
        padding: 0 !important;
    }
</style>
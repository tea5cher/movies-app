<template>
  <div id="app">
      <Poster />
      <Loader />
      <MoviesList :list="moviesList" />
      <Pagination @pageChanged="onPageChanged" :current-page="currentPage" :per-page="moviesPerPage" :total="moviesLength"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MoviesList from './components/MoviesList.vue'
import Poster from './components/Poster.vue'
import Pagination from './components/Pagination.vue'
import Loader from './components/Loader.vue'

export default {
  name: 'App',
  components: {
    MoviesList,
    Poster,
    Pagination,
    Loader
  },
  computed: {
    ...mapGetters('movies', ['moviesList', 'currentPage', 'moviesPerPage', 'moviesLength'])
  },
  methods: {
    ...mapActions('movies', ['changeCurrentPage']),
    onPageChanged(page){
      this.$router.push({ query: {page}});
      this.changeCurrentPage(page);
      
    },
    onPageQueryChange({ page = 1 }) {
      this.changeCurrentPage(+page);
    }
  },
  watch: {
    '$route.query': {
      handler: "onPageQueryChange",
      immediate: true,
      deep: true,
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Arial, Helvetica,  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}
</style>

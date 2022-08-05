<template>
  <div id="app">
      <Poster />
      <Loader />
      <Notification />
      <Header />
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
import Header from './components/Header.vue'
import Notification from './components/Notification.vue'

export default {
  name: 'App',
  components: {
    MoviesList,
    Poster,
    Pagination,
    Loader,
    Header,
    Notification

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
  min-height: 100vh;
}

li {
  list-style: none !important;
}
.toast:not(.show) {
   display: block;
}
</style>

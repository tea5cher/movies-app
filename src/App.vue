<template>
  <div id="app">
      <Poster />
      <MoviesList :list="moviesList" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MoviesList from './components/MoviesList.vue'
import Poster from './components/Poster.vue'

export default {
  name: 'App',
  components: {
    MoviesList,
    Poster
  },
  mounted(){
    // this.fetchMovies();
  },
  computed: {
    ...mapGetters('movies', ['moviesList'])
  },
  methods: {
    ...mapActions('movies', ['fetchMovies']),
    
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

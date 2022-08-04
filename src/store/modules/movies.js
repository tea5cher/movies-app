import axios from "@/plugins/axios";
import IDs from '@/store/mock/imdb_top250'
import mutations from "../mutations";

const { MOVIES, CURRENT_PAGE, REMOVE_MOVIE } = mutations;

function serializeResponse(movies) {
    let newMovies = {};
    movies.forEach(item=>{
        newMovies[item.imdbID] = item
    })
    
    return newMovies
}

const moviesStore = {
    namespaced: true,
    state: {
        top250IDs: IDs,
        moviesPerPage: 12,
        currentPage: 1,
        movies: {},
        bg: 'linear-gradient(45deg, rgb(0,3,38) 0%, rgb(82, 15, 117) 100%)'
    },
    getters: {
        slisedIDs: ({ top250IDs}) => (from, to) => top250IDs.slice(from, to),
        currentPage: ({currentPage}) => currentPage,
        moviesPerPage: ({ moviesPerPage}) =>  moviesPerPage,
        moviesList: ({movies}) => movies,
        posterBg: ({bg}) => bg,
        moviesLength: ({ top250IDs }) => Object.keys(top250IDs).length,
    },
    mutations: {
        [MOVIES](state, value) {
            state.movies = value;
        },
        POSTER_BG(state, newBg) {
            state.bg = newBg;
        },
        [CURRENT_PAGE](state, value){
            state.currentPage = value;
        },
        [REMOVE_MOVIE](state, index){
            state.top250IDs.splice(index, 1);
        }
    },
    actions: {
        initMoviesStore: {
            handler({dispatch}) {
                dispatch("fetchMovies");
            },
            root: true
        },
        async fetchMovies({getters, commit, dispatch}) {
            try {
                dispatch('toggleLoader', true, {root: true});
                const {slisedIDs, currentPage, moviesPerPage} = getters;

                const from = currentPage * moviesPerPage - moviesPerPage;
                const to = currentPage * moviesPerPage;
                const moviesToFetch = slisedIDs(from,to)
        
                const requests = moviesToFetch.map(id => axios.get(`/?i=${id}`));
                const response = await Promise.all(requests);
                const movies = serializeResponse(response);
                
                commit(MOVIES, movies);
            } catch(err) {
                console.log(err);
            } finally {
                dispatch('toggleLoader', false, {root: true});
            }
        },
        changePosterBg({getters, commit}, item){
            const {posterBg} = getters;
            const newBg = `url(${item})`
            commit('POSTER_BG', newBg);
        },
        changeCurrentPage({commit, dispatch}, page){
            commit(CURRENT_PAGE, page);
            dispatch('fetchMovies');
        },
        removeMovieFromList({commit, dispatch, state}, id) {
            let index = '';
            state.top250IDs.forEach((item, i)=>{
                if (item === id){
                    index = i;
                }
            })
            if(index) {
                commit('REMOVE_MOVIE', index);
                dispatch("fetchMovies");
            }
            
        }
    }
}

export default moviesStore
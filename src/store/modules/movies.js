import axios from "@/plugins/axios";
import IDs from '@/store/mock/imdb_top250'
import mutations from "../mutations";

const { MOVIES } = mutations;

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
        moveesPerPage: 12,
        currentPage: 1,
        movies: {},
        bg: 'linear-gradient(45deg, rgb(0,3,38) 0%, rgb(82, 15, 117) 100%)'
    },
    getters: {
        slisedIDs: ({ top250IDs}) => (from, to) => top250IDs.slice(from, to),
        currentPage: ({currentPage}) => currentPage,
        moviesPerPare: ({moveesPerPage}) => moveesPerPage,
        moviesList: ({movies}) => movies,
        posterBg: ({bg}) => bg,
    },
    mutations: {
        [MOVIES](state, value) {
            state.movies = value;
        },
        POSTERBG(state, value) {
            state.bg = value;
            console.log(state, value)
        }
    },
    actions: {
        initMoviesStore: {
            handler({dispatch}) {
                dispatch("fetchMovies");
            },
            root: true
        },
        async fetchMovies({getters, commit}) {
            try {
                const {slisedIDs, currentPage, moviesPerPare} = getters;

                const from = currentPage * moviesPerPare - moviesPerPare;
                const to = currentPage * moviesPerPare;
                const moviesToFetch = slisedIDs(from,to)
        
                const requests = moviesToFetch.map(id => axios.get(`/?i=${id}`));
                const response = await Promise.all(requests);
                const movies = serializeResponse(response);
                
                commit(MOVIES, movies);
            } catch(err) {
                console.log(err);
            }
        },
        changePosterBg({getters, commit}, item){
            const {posterBg} = getters;
            // console.log(posterBg);
            
            const newBg = `url(${item})`
            console.log(newBg);
            commit('POSTERBG', newBg);
        }
    }
}

export default moviesStore
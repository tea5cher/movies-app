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
        bg: 'red'
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
        }
    }
}

export default moviesStore
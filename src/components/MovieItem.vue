<template>
    <div>
        <div @mouseenter="onMouseEnter(movie.Poster)" class="movie-item mb-3">
            <div class="movie-item-poster" :style="posterBg"></div>
            <div class="movie-info-wrap d-flex flex-column justify-content-between">
                <div class="movie-item-info">
                    <h3 class="movie-title">{{movie.Title}}</h3>
                    <div class="movie-year">{{movie.Year}}</div>
                </div>
                <div class="movie-item-controls row no-gutters">
                    <div class="col pr-2">
                        <BButton class="button-control" size="md" block variant="outline-light">Edit</BButton>
                    </div>
                    <div class="col pl-2">
                        <BButton class="button-control" size="md" block variant="outline-light">Remove</BButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { mapActions } from 'vuex';
export default {
    name: 'MovieItem',
    props:{
        movie:{
            type: Object,
            required: true
        }
    },
    computed:{
        posterBg(){
            return {
                "background-image": `url(${this.movie.Poster})`,
            }
        },
        
    },
    methods: {
        ...mapActions('movies',['changePosterBg']),
        onMouseEnter(title){
            this.changePosterBg(title);
        }
    }
}
</script>


<style lang="scss" scoped>
.movie-item{
    position: relative;
    cursor: pointer;
    border-radius: 5px;
    overflow: hidden;
    transition: all 0.2s ease;
    height: 400px;
    &:hover{
        box-shadow: 0px 5px 30px rgba(0,0,0,0.7);
        transform: scale(1.02);
    }
    &:hover .movie-info-wrap{
        opacity: 1;
        background-color: rgba(0,0,0,0.7);
    }
}

.movie-item-poster{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    z-index: -1;
}
.movie-info-wrap{
    padding: 20px 10px;
    height: 100%;
    opacity: 0;
    transition: 0.2s ease;
}

.movie-title {
    font-size: 20px;
    color: #fff;
}

.movie-year {
    font-size: 14px;
    color: #fff;
}

.movie-item-controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
}
.button-control{
    width: 100%;
}
</style>
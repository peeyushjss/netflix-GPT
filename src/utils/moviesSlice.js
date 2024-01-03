import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        nowPlayingMovies: null,
        trailerVideo: null,
        nowPopularMovies: null
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload
        },
        addTrailerVideos: (state, action) => {
            state.trailerVideo = action.payload
        },
        addPopularMovies: (state, action) => {
            state.nowPopularMovies = action.payload
        },
    }
});

export const { addNowPlayingMovies, addTrailerVideos, addPopularMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
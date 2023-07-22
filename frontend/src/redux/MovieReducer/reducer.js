// movieReducer.js

import { ADD_MOVIE, DELETE_MOVIE, GET_MOVIES, MOVIES_FAILURE, MOVIES_REQUEST, SINGLE_MOVIE, UPDATE_MOVIE } from './actiontype';

// Initial state for movies
const initialState = {
  movies: [],
  isloading: false,
  iserror: false,
  singleMovie:{}
};

export const reducer = (state = initialState, {type,payload}) => {
  switch (type) {
    case MOVIES_REQUEST:
      return {
        ...state,
        isloading: true,
      };
    case MOVIES_FAILURE:
      return {
        ...state,
        isloading: false,
        iserror: payload,
      };
    case GET_MOVIES:
      return {
        ...state,
        isloading: false,
        movies: payload,
        iserror: null,
      };
    case ADD_MOVIE:
      return {
        ...state,
        isloading:false,
        movies: [...state.movies, payload],
      };
    case DELETE_MOVIE:
      return {
        ...state,
        isloading:false,
        movies: state.movies.filter((movie) => movie.id !== payload),
      };
    case UPDATE_MOVIE:
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === payload.movieId ? payload.updatedMovie : movie
        ),
      };
    case SINGLE_MOVIE:
        return {
        ...state,
        isloading:false,
        iserror:false,
        singleMovie:payload
        }
    default:
      return state;
  }
};


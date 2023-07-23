// movieReducer.js

import { ADD_MOVIE, ADD_MOVIE_SHOW_BOOKING, DELETE_MOVIE, DELETE_MOVIE_SHOW, GET_MOVIES, GET_MOVIE_SHOW_BOOKING, GET_SINGLE_MOVIE_SHOW, MOVIES_FAILURE, MOVIES_REQUEST, SINGLE_MOVIE, UPDATE_MOVIE } from './actiontype';

// Initial state for movies
const initialState = {
  movies: [],
  isloading: false,
  iserror: false,
  singleMovie: {},
  bookedMovies: [],
  movieShow: [],
  singleMovie_show: {}
};

export const reducer = (state = initialState, { type, payload }) => {
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
        isloading: false,
        movies: [...state.movies, payload],
      };
    case DELETE_MOVIE:
      return {
        ...state,
        isloading: false,
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
        isloading: false,
        iserror: false,
        singleMovie: payload
      }
    case GET_MOVIE_SHOW_BOOKING:
      return {
        ...state,
        isloading: false,
        bookedMovies: payload,
        iserror: false,
      }
    case GET_SINGLE_MOVIE_SHOW:
      return {
        ...state,
        isloading: false,
        iserror: false,
        singleMovie_show: payload
      }
    case ADD_MOVIE_SHOW_BOOKING:
      return {
        ...state,
        isloading: false,
        movies: [...state.bookedMovies, payload],
      }
    case ADD_MOVIE:
      return {
        ...state,
        isloading: false,
        movieShow: [...state.movieShow, payload],
      };
      case DELETE_MOVIE_SHOW:
        return {
          ...state,
          isloading: false,
          movieShow: state.movieShow.filter((movie) => movie.id !== payload),
        };
    default:
      return state;
  }
};


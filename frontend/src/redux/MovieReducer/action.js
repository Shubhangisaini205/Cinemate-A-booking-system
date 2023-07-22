import axios from 'axios';
import { DELETE_MOVIE, GET_MOVIES, MOVIES_FAILURE, MOVIES_REQUEST, SINGLE_MOVIE, UPDATE_MOVIE } from './actiontype';


// Action creator to fetch all movies
export const getMoviesAction = () => async (dispatch) => {
  dispatch({ type: MOVIES_REQUEST });
  try {
    const response = await axios.get('http://127.0.0.1:8080/movies');
     console.log(response.data)
    dispatch({ type: GET_MOVIES, payload: response.data });
  } catch (error) {
    dispatch({ type: MOVIES_FAILURE, payload: error.message });
  }
};

// Action creator to add a new movie
export const addMovieAction = (movieData) => async (dispatch) => {
    dispatch({ type: MOVIES_REQUEST });
  try {
    const response = await axios.post('http://127.0.0.1:8080/movies/add', movieData);
    dispatch({ type: ADD_MOVIE, payload: response.data });
  } catch (error) {
    dispatch({ type: MOVIES_FAILURE, payload: error.message });
  }
};

// Action creator to update a movie
export const updateMovieAction = (movieId, movieData) => async (dispatch) => {
  dispatch({ type: MOVIES_REQUEST });
  try {
    await axios.patch(`http://127.0.0.1:8080/movies/update/${movieId}`, movieData);
    dispatch({ type: UPDATE_MOVIE });
  } catch (error) {
    dispatch({ type: MOVIES_FAILURE, payload: error.message });
  }
};

// Action creator to delete a movie
export const deleteMovieAction = (movieId) => async (dispatch) => {
    dispatch({ type: MOVIES_REQUEST });
  try {
    await axios.delete(`http://127.0.0.1:8080/movies/delete/${movieId}`);
    dispatch({ type: DELETE_MOVIE, payload: movieId });
  } catch (error) {
    dispatch({ type: MOVIES_FAILURE, payload: error.message });
  }
};


export const SingleMovieAction = (id)=>(dispatch)=>{
    dispatch({ type: MOVIES_REQUEST });
    axios.get(`http://127.0.0.1:8080/movies/${id}`)
    .then((res)=>{
      // console.log(res.data)
      dispatch({type:SINGLE_MOVIE,payload:res.data})
    }).catch((err)=>{
      console.log(err)
      dispatch({ type: MOVIES_FAILURE });
    })
  }

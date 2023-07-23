import axios from 'axios';
import { ADD_MOVIE_SHOW, ADD_MOVIE_SHOW_BOOKING, DELETE_MOVIE, DELETE_MOVIE_SHOW, GET_MOVIES, GET_MOVIE_SHOW_BOOKING, GET_SINGLE_MOVIE_SHOW, MOVIES_FAILURE, MOVIES_REQUEST, SINGLE_MOVIE, UPDATE_MOVIE } from './actiontype';


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
    console.log(response.data)
    dispatch({ type: ADD_MOVIE, payload: response.data });
    return response.data
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
    return;
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


// get booking of user;
export const getMovieBookingsAction = (userId) => async (dispatch) => {
  dispatch({ type: MOVIES_REQUEST });
  try {
    const response = await axios.get(`http://localhost:8080/movieBooking/user/${userId}`);
    dispatch({ type: GET_MOVIE_SHOW_BOOKING, payload: response.data });
  } catch (error) {
    dispatch({ type: MOVIES_FAILURE, payload: error.message });
  }
};

// get single movie_show
export const SingleMovieShowAction = (id)=>(dispatch)=>{
  dispatch({ type: MOVIES_REQUEST });
  axios.get(`http://localhost:8080/movie_show/${id}`)
  .then((res)=>{
    // console.log(res.data)
    dispatch({type:GET_SINGLE_MOVIE_SHOW,payload:res.data})
  }).catch((err)=>{
    console.log(err)
    dispatch({ type: MOVIES_FAILURE });
  })
}


export const addMovieShowBooking = (BookingObj) => async (dispatch) => {
  dispatch({ type: MOVIES_REQUEST });
try {
  const response = await axios.post('http://127.0.0.1:8080/movieBooking/add', BookingObj);
  console.log(response.data)
  dispatch({ type: ADD_MOVIE_SHOW_BOOKING, payload: response.data });
} catch (error) {
  dispatch({ type: MOVIES_FAILURE, payload: error.message });
}
};

// Ad a new movie show 
export const addMovieShowAction = (movieShowData) => async (dispatch) => {
  dispatch({ type: MOVIES_REQUEST });
try {
  const response = await axios.post('http://127.0.0.1:8080/movie_show/add', movieShowData);
  console.log(response.data)
  dispatch({ type: ADD_MOVIE_SHOW, payload: response.data });
  return response.data
} catch (error) {
  dispatch({ type: MOVIES_FAILURE, payload: error.message });
}
};

// delete show
export const deleteMovieShowAction = (movieId) => async (dispatch) => {
  dispatch({ type: MOVIES_REQUEST });
try {
 await axios.delete(`http://127.0.0.1:8080/movie_show/delete/${movieId}`);
  dispatch({ type: DELETE_MOVIE_SHOW, payload: movieId });
  return;
} catch (error) {
  dispatch({ type: MOVIES_FAILURE, payload: error.message });
}
};
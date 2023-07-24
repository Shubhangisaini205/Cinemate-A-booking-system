
import axios from "axios"
import { AUTH_FAIL, AUTH_REQ, SIGNIN_SUCCESS, SIGNUP_SUCCESS, UPDATE_SUCCESS,GET_SINGLE_USER } from "./actiontype"

export const SignupAction = (userObj) => (dispatch) => {
    dispatch({ type: AUTH_REQ });
    axios.post("https://cinemate-api.onrender.com/users/register", userObj)
      .then((res) => {
        if (res.status === 201) {
          
          // alert(res.data.message);
          dispatch({ type: SIGNUP_SUCCESS });
        } else if (res.status === 400) {
          alert("Please fill all the required fields.");
          dispatch({ type: AUTH_FAIL });
        } else {
          alert("An error occurred while registering the user.");
          dispatch({ type: AUTH_FAIL });
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred while registering the user.");
        dispatch({ type: AUTH_FAIL });
      });
  };



  export const LoginAction = (userObj) => (dispatch) => {
    dispatch({ type: AUTH_REQ });
    axios.post("https://cinemate-api.onrender.com/users/login", userObj)
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data)
          // alert(res.data.message);
          dispatch({ type: SIGNIN_SUCCESS, payload: res.data });
        } else {
          alert(res.data.message);
          dispatch({ type: AUTH_FAIL });
        }
      })
      .catch((err) => {
        console.log(err.message,")")
        console.log(err);
        alert("An error occurred while logging in.");
        dispatch({ type: AUTH_FAIL });
      });
  };

export const SingleUserAction = (id)=>(dispatch)=>{
  dispatch({ type: AUTH_REQ });
  axios.get(`https://cinemate-api.onrender.com/users/${id}`)
  .then((res)=>{
    // console.log(res.data)
    dispatch({type:GET_SINGLE_USER,payload:res.data})
  }).catch((err)=>{
    console.log(err)
    dispatch({ type: AUTH_FAIL });
  })
}


  export const UpdateAction = (id, payment) => (dispatch) => {
    dispatch({ type: AUTH_REQ });
   return axios.patch(`https://cinemate-api.onrender.com/users/update/${id}`, { payment })
      .then((res) => {
          console.log(res.data)
          dispatch({ type: UPDATE_SUCCESS})
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred while updating user payment and role.");
        dispatch({ type: AUTH_FAIL });
      });
  };
  
import { AUTH_FAIL, AUTH_REQ, SIGNIN_SUCCESS, SIGNUP_SUCCESS, UPDATE_SUCCESS,GET_SINGLE_USER} from "./actiontype"


let initialState = {
   isLoading: false,
   isError: false,
   isAuth: false,
   token: "",
   loggedUser: "",
   singleUser:{}
}

export const reducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case AUTH_REQ: return { ...state, isLoading: true, isError: false }
      case AUTH_FAIL: return { ...state, isLoading: false, isError: true }
      case SIGNUP_SUCCESS: return { ...state, isLoading: false, isError: false }
      case SIGNIN_SUCCESS: return { ...state, isLoading: false, isError: false, isAuth: true, token: payload.token, loggedUser: payload.user }
      case UPDATE_SUCCESS: return { ...state, isLoading: false, isError: false };
      case GET_SINGLE_USER: return {...state, isLoading:false,isError:false,singleUser:payload}
      default: {
         return state
      }
   }
}
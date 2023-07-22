import { applyMiddleware, combineReducers, legacy_createStore, compose } from "redux"
import thunk from "redux-thunk";
import {reducer as AuthReducer } from "./AuthReducer/reducer"
import {reducer as MovieReducer} from "./MovieReducer/reducer"

const rootReducer = combineReducers({
    AuthReducer,
    MovieReducer
});
;

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
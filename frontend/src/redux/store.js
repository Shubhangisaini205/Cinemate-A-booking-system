import { applyMiddleware, combineReducers, legacy_createStore, compose } from "redux"
import thunk from "redux-thunk";
import { reducer as AuthReducer } from "./AuthReducer/reducer"

const rootReducer = combineReducers({
    AuthReducer,
});
;

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
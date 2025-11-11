import { legacy_createStore as createStore } from "redux";
import { rootReducers } from "./rootCombines";
import { applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

export const store = createStore(rootReducers, applyMiddleware(thunk));

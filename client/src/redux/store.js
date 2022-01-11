import { reducer } from "./reducer";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

const store = createStore(reducer, applyMiddleware(logger));

export default store;

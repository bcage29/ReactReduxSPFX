import { applyMiddleware, compose, createStore as reduxCreateStore, Store } from "redux";
import createLogger = require("redux-logger");
import thunkMiddleware from "redux-thunk";
import rootReducer, { IState } from "../reducers";

export function createStore(initialState?: IState): Store<IState> {
  const loggerMiddleware = createLogger();

  const middlewares = [
    thunkMiddleware,
    loggerMiddleware,
  ];

  return reduxCreateStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares),
  ));
}
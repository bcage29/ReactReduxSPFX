import { combineReducers, Reducer } from "redux";
import webpartReducer from "./webpart";
import { IReactReduxWebPartProps } from "../IReactReduxWebPartProps";

export interface IState {
  webpart: IReactReduxWebPartProps;
 }

const rootReducer: Reducer<IState> = combineReducers<IState>({
  webpart: webpartReducer,
});

export default rootReducer;

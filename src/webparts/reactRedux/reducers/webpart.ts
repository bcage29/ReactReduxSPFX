import { assign } from "lodash";
import { ActionTypes as actionTypes } from "../actions/actionTypes";
import { IReactReduxWebPartProps } from "../IReactReduxWebPartProps";

export const initialState: IReactReduxWebPartProps = {
  name: "", 
  dataProvider: null, 
  spLists: [], 
  spListId: "", 
  spListItems: [] 
};

export interface IUpdatePropertyAction {
  type: actionTypes.UPDATE_PROPERTY;
  propertyName: string;
  value: any;
}

export default (state = initialState, action: IUpdatePropertyAction) => {
  switch (action.type) {
    case actionTypes.UPDATE_PROPERTY:
      return assign({}, state, {
          [action.propertyName]: action.value,
      });
    default:
     return state;
  }
};

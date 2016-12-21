import { each } from "lodash";
import { ActionTypes as actionTypes } from "../actions/actionTypes";
import ISpList from "../models/ISpList";
import ISharePointService from "../services/ISharePointService";

// Redux Actions
export function updateProperty(propertyName: string, value: any) {
  return { type: actionTypes.UPDATE_PROPERTY, propertyName, value };
}

// Action Creators
export const getListItems = () => (dispatch, getState) => {
  const state = getState();
  const service: ISharePointService = state.webpart.dataProvider;
  return service.getItems(state.webpart.spListId).then((listItems) => {
    dispatch(updateProperty("spListItems", listItems));
  });
};

export const setDataProvider = (service: ISharePointService) => (dispatch, getState) => {
 dispatch(updateProperty("dataProvider", service));
};

export const setListChanged = (spListId: string) => (dispatch, getState) => {
  dispatch(updateProperty("spListId", spListId));
  dispatch(getListItems());
};

export const setSelectedList = (spListId: string) => (dispatch, getState) => {
  dispatch(updateProperty("spListId", spListId));
};

export const createItem = (itemVal: string) => (dispatch, getState) => {
  const state = getState();
  const service: ISharePointService = state.webpart.dataProvider;
  service.createItem(state.webpart.spListId, itemVal).then((result) => {
    const newSplistItems = Object.assign([], state.webpart.spListItems);
    newSplistItems.push(result);
    dispatch(updateProperty("spListItems", newSplistItems));
  });
};

export const getListOptions = () => (dispatch, getState) => {
  const state = getState();
  const service: ISharePointService = state.webpart.dataProvider;
  return service.getListOptions()
    .then((listOptions: ISpList[]) => {
    return dispatch(updateProperty("spLists", listOptions));
  });
};

export const onFilterChange = (text: string) => (dispatch, getState) => {
  const state = getState();
  const items = Object.assign([], state.webpart.spListItems);
  each(items, (item) => {
    if (item.title.toLowerCase().indexOf(text.toLowerCase()) >= 0) {
      item.visible = true;
    } else {
      item.visible = false;
    }
  });
  dispatch(updateProperty("spListItems", items));
};


export const addWebHook = () => (dispatch, getState) => {
  const state = getState();
  const service: ISharePointService = state.webpart.dataProvider;
  return service.addWebHook(state.webpart.spListId);
};


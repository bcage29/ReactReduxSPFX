import * as React from "react";
import * as ReactRedux from "react-redux";

import { createItem, onFilterChange, addWebHook } from "../actions";
import AddItemForm from "../components/AddItemForm/AddItemForm";
import Header from "../components/Header";
import { IState } from "../reducers";
import SpList from "./../components/SpList/SpList";

const mapStateToProps = (state: IState) => ({
  name: state.webpart.name,
  spListItems: state.webpart.spListItems,
});

const App = ({ name, spListItems, createItem, onFilterChange, addWebHook }) => (
  <div>
    <Header name={name} />
    <AddItemForm onAddItem={ createItem } onAddWebHook={ addWebHook } />
    <SpList items={ spListItems } onFilterChange={ onFilterChange } />
  </div>
);

export default ReactRedux.connect(mapStateToProps, { createItem, onFilterChange, addWebHook })(App);

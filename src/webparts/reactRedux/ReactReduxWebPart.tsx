import { Environment, EnvironmentType  } from "@microsoft/sp-client-base";
import {
  BaseClientSideWebPart,
  IPropertyPaneDropdownOption,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneDropdown,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";
import * as strings from 'reactReduxStrings';
import { IReactReduxWebPartProps } from './IReactReduxWebPartProps';

import * as React from "react";
import * as ReactDom from "react-dom";

import { Provider } from "react-redux";
import { Store } from "redux";
import { createStore } from "./store";

import { 
  setDataProvider, 
  setListChanged, 
  updateProperty
} from "./actions";

import App from "./containers/App";
import { IState } from "./reducers";
import ISpList from "./models/ISpList";
import MockService from "./services/mockService";
import SharePointService from "./services/sharePointService";
import ISharePointService from "./services/ISharePointService";

export default class ReactReduxWebPart extends BaseClientSideWebPart<IReactReduxWebPartProps> {
  private store: Store<IState>;
  private _dropdownOptions: IPropertyPaneDropdownOption[];
  private _disableDropdown: boolean;

  public constructor(context: IWebPartContext) {
    super(context);

    this.store = createStore();
    let service;
    if (DEBUG && Environment.type === EnvironmentType.Local) {
      service = new MockService();
    } else {
      service = new SharePointService();
    }
    this.store.dispatch(setDataProvider(service));
  }

  public render(): void {
    const element = (
      <Provider store={this.store}>
        <App />
      </Provider>
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    this.store.dispatch(updateProperty("name", this.properties.name));
    if (this.properties.spListId) {
      this.store.dispatch(setListChanged(this.properties.spListId));
    }
    const state = this.store.getState();
    const service: ISharePointService = state.webpart.dataProvider;
    return service.getListOptions()
      .then((listOptions: ISpList[]) => {
      this._buildDropDownOptions(listOptions);
    });
  };

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    debugger;
    this.store.dispatch(updateProperty(propertyPath, newValue));
    if (propertyPath === "spListId") {
      this.store.dispatch(setListChanged(this.properties.spListId));
    }
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneName,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("name", {
                  label: strings.NameFieldLabel,
                }),
                PropertyPaneDropdown("spListId", {
                  label: "Select a list",
                  options: this._dropdownOptions,
                })
              ]
            },
          ],
        },
      ],
    };
  }

  private _buildDropDownOptions(listOptions: ISpList[]) {
    this._disableDropdown = listOptions.length === 0;
    if (listOptions.length !== 0) {
      this._dropdownOptions = listOptions.map((list: ISpList) => {
        return {
          key: list.id,
          text: list.title,
        };
      });
    }
  }
}

import ISpList from "../models/ISpList";
import ISpListItem from "../models/ISpListItem";
import ISharePointService from "./ISharePointService";

export default class MockService implements ISharePointService {

  private _idCounter: number;

  constructor() {
    this._idCounter = 50;
  }

  public getItems(listId: string): Promise<any> {
    // this is the mock baby!

    const listItems = [
      { id: 1, title: "Item One", status: "New", visible: true },
      { id: 2, title: "Item Two", status: "New", visible: true },
    ];

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(listItems);
        }, 500);
    });
  }

  public getListOptions(): Promise<ISpList[]> {

    const lists = [
      { id: "listOne", title: "List One" },
      { id: "listTwo", title: "List Two" },
      { id: "listThree", title: "List Three" },
    ] as ISpList[];

    return new Promise((resolve) => {
        setTimeout(() => {
          resolve(lists);
        }, 500);
    });
  }

  public createItem(listId: string, title: string): Promise<ISpListItem> {
    this._idCounter++;
    const newItem = {
      id: this._idCounter.toString(),
      title,
      status: "New",
      visible: true,
    } as ISpListItem;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(newItem);
      }, 500);
    });
  }

  public addWebHook(listId: string): Promise<any> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 500);
    }); 
  }
}
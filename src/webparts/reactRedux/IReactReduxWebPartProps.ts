import ISpList from "./models/ISpList";
import ISpListItem from "./models/ISpListItem";
import ISharePointService from "./services/ISharePointService";

export interface IReactReduxWebPartProps {
  name: string;
  dataProvider: ISharePointService;
  spLists: ISpList[];
  spListId: string;
  spListItems: ISpListItem[];
}

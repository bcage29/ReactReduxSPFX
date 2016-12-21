import ISpList from "../models/ISpList";
import ISpListItem from "../models/ISpListItem";

interface ISharePointService {

    getItems(listId: string): Promise<ISpListItem[]>;

    getListOptions(): Promise<ISpList[]>;

    createItem(listId: string, title: string): Promise<ISpListItem>;

    addWebHook(listId: string): Promise<any>;
}

export default ISharePointService;
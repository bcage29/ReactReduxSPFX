import pnp from "sp-pnp-js";
import ISpList from "../models/ISpList";
import ISpListItem from "../models/ISpListItem";
import ISharePointService from "./ISharePointService";

export default class SharePointService implements ISharePointService {

  public getItems(listId: string): Promise<any> {
    return pnp.sp.web.lists.getById(listId).items.get().then((result) => {
      return result.map((item) => {
        return {
          id: item.Id,
          title: item.Title,
          status: item.Status,
          visible: true,
        } as ISpListItem;
      });
    });
  }
  
  public getListOptions(): Promise<ISpList[]> {
    return pnp.sp.web.lists.select("Id,Title").filter("BaseTemplate eq 100").get().then((lists) => {
      return lists.map((list) => {
        return {
          id: list.Id,
          title: list.Title,
        } as ISpList;
      });
    });
  }

  public createItem(listId: string, title: string): Promise<ISpListItem> {
    const newItem = { Title: title };
    return pnp.sp.web.lists.getById(listId).items.add(newItem).then((result) => {
      return { 
        id: result.data.Id,
        title: result.data.Title,
        status: result.data.Status,
        visible: true,
      } as ISpListItem;
    });
  }

  public addWebHook(listId: string): Promise<any> {
    //notificationUrl: string, expirationDate: string, clientState?: string)
    const notificationUrl = "https://sharepointfestfunctionschiv1.azurewebsites.net/api/Webhook?code=zDGJiiG3f8YeyDKrkKOiTGnMePo4iEAyzzqoKbEwlw/uGFs2fQH8hg==";
    const expirationDate = "2017-04-05T16:17:57+00:00";
    const clientState = "myextrasecurity";
    return pnp.sp.web.lists.getById(listId).subscriptions.add(
      notificationUrl,
      expirationDate,
      clientState
    );
  }
}
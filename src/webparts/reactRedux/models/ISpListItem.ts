import ISpList from "./ISpList";

interface ISpListItem extends ISpList {
  status: string;
  visible?: boolean;
}


export default ISpListItem;

import {
  Button,
  ButtonType,
  TextField,
} from "office-ui-fabric-react";
import * as React from "react";
import ItemCreationCallback from "../../models/ItemCreationCallback";
import styles from "./AddItemForm.module.scss";

export interface IAddItemFormProps {
  onAddItem: ItemCreationCallback;
  onAddWebHook: () => void;
}

export default class AddItemForm extends React.Component<IAddItemFormProps, any> {

  private _placeHolderText: string = "Add an item to the list";

  constructor(props: IAddItemFormProps) {
    super(props);
    this._handleAddButtonClick = this._handleAddButtonClick.bind(this);
    this._handleAddWebHookClick = this._handleAddWebHookClick.bind(this);
  }

  // React.MouseEvent<Button>
  private _handleAddButtonClick(event?: any): void {
    const refs: any = this.refs;
    this.props.onAddItem(refs.newItemInput._latestValidateValue);
  }

  private _handleAddWebHookClick(event?: any): void {
    this.props.onAddWebHook();
  }

  public render(): JSX.Element {
    return (
      <div className={ styles.addItemForm }>
        <TextField
          ref="newItemInput"
          className={ styles.textField }
          placeholder={ this._placeHolderText }
          autoComplete="off" />
        <div className={ styles.addButtonCell }>
          <Button
            className={ styles.addButton }
            buttonType={ ButtonType.primary }
            ariaLabel="Add a todo task"
            onClick={ this._handleAddButtonClick }>
            Add
          </Button>
        </div>
        <div className={ styles.addButtonCell }>
          <Button
            className={ styles.addButton }
            buttonType={ ButtonType.primary }
            onClick={ this._handleAddWebHookClick }>
            Add Web Hook
          </Button>
        </div>
      </div>
    );
  }
}
// Office UI Fabric
import {
  FocusZone,
  FocusZoneDirection,
  List,
  TextField,
} from "office-ui-fabric-react";
import * as React from "react";
import ItemCreationCallback from "../../models/ItemCreationCallback";
import ISpListItem from "./../../models/ISpListItem";
import styles from "./spList.module.scss";

export interface ISpListProps {
  items: ISpListItem[];
  onFilterChange: ItemCreationCallback;
}

export default class SpList extends React.Component<ISpListProps, any> {

  constructor(props: any) {
    super(props);

    this._onFilterChanged = this._onFilterChanged.bind(this);
  }

  public render(): JSX.Element {
    return (
      <FocusZone direction={FocusZoneDirection.vertical}>
        <TextField label={"Filter by name" } onBeforeChange={this._onFilterChanged} />
          <List
            items={this.props.items}
            onRenderCell={ (item, index) => (
              <div>
              {
                item.visible ?
                  <div className={ styles.spListCell } data-is-focusable={ true } >
                    <div className={ styles.itemContent }>
                      <div className={ styles.itemName + "ms-font-xl" }>{ item.title }</div>
                      <div className={ styles.itemIndex }>{ item.status }</div>
                    </div>
                  </div> : ""
              }
              </div>
            ) }
          />
        </FocusZone>
    );
  }

  private _onFilterChanged(text: string): void {
    this.props.onFilterChange(text);
  }
}
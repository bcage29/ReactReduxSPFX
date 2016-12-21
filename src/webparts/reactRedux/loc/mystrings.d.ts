declare interface IReactReduxStrings {
  PropertyPaneName: string;
  BasicGroupName: string;
  NameFieldLabel: string;
}

declare module 'reactReduxStrings' {
  const strings: IReactReduxStrings;
  export = strings;
}

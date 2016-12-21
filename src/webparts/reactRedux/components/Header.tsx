import * as React from 'react';

export interface IHeaderProps {
  name: string;
}

const Header = ({ name }: IHeaderProps) => (
  <div>
    Hello { name }!
  </div>
);

export default Header;
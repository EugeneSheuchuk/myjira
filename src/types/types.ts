import React from 'react';

export type MenuItemProps = {
  url?: string;
  path?: string;
  imgURL: string;
  name: string;
  tabIndex: number;
  action?: Function;
};

export type DropDownItem = {
  actionName: string;
  action: (e: React.MouseEvent<HTMLLIElement>
    | React.KeyboardEvent<HTMLLIElement>) => void;
};

export type DropDownProps = Array<DropDownItem>;

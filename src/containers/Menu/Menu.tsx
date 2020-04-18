import React from 'react';
import './Menu.scss';
import MenuItem from '../../components/MenuItem/MenuItem';
import Settings from '../../assets/images/settings.png';
import Roadmap from '../../assets/images/roadmap.png';
import Board from '../../assets/images/board.png';
import AddItem from '../../assets/images/additem.png';
import Page from '../../assets/images/page.webp';
import Code from '../../assets/images/code.png';
import { TMenuItemProps } from '../../types/types';
import MenuItemLink from '../../components/MenuItemLink/MenuItemLink';

type TState = {
  width: number;
};

class Menu extends React.Component<{}, TState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      width: 240,
    };
  }

  render() {
    const links: Array<TMenuItemProps> = [
      {
        url: 'https://github.com/EugeneSheuchuk/myjira',
        imgURL: Code,
        name: 'projectName',
        tabIndex: 0,
      },
    ];

    const viewidLinks = links.map((item: TMenuItemProps, index: number) => (
      <MenuItemLink
        url={item.url}
        imgURL={item.imgURL}
        name={item.name}
        tabIndex={item.tabIndex}
        key={`${item.name}-${Math.random() * 1000}`}
      />
    ));

    return (
      <div className="Menu" style={{ width: `${this.state.width}px` }}>
        <MenuItem
          path="/roadmap"
          imgURL={Roadmap}
          name="Roadmap"
          tabIndex={0}
        />
        <MenuItem path="/board" imgURL={Board} name="Board" tabIndex={0} />
        <MenuItem path="/pages" imgURL={Page} name="Pages" tabIndex={0} />
        {viewidLinks}
        <MenuItem
          path="/addItem"
          imgURL={AddItem}
          name="Add item"
          tabIndex={0}
        />
        <MenuItem
          path="/propertySettings"
          imgURL={Settings}
          name="Property settings"
          tabIndex={0}
        />
      </div>
    );
  }
}

export default Menu;

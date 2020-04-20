import React from 'react';
import './MenuItemLink.scss';
import { MenuItemProps } from '../../types/types';

const MenuItemLink: React.FC<MenuItemProps> = ({
  url,
  imgURL,
  name,
  tabIndex,
}) => {
  return (
    <a
      href={url}
      className="MenuItemLink"
      tabIndex={tabIndex}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={imgURL} className="MenuItemLink_icon" alt={`${name}`} />
      <div className="MenuItemLink_name">{name}</div>
    </a>
  );
};

export default MenuItemLink;

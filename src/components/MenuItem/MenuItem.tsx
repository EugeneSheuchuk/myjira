import React, { KeyboardEvent } from 'react';
import { NavLink } from 'react-router-dom';
import './MenuItem.scss';
import { TMenuItemProps } from '../../types/types';

const MenuItem: React.FC<TMenuItemProps> = ({
  path = '/',
  imgURL,
  name,
  action,
  tabIndex,
}) => {
  const defaultFunc = () => {};
  const componentAction = action || defaultFunc;

  // eslint-disable-next-line
  const pressEnter = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') componentAction(e);
  };

  return (
    <NavLink
      to={path}
      className="MenuItem"
      onKeyPress={(e: KeyboardEvent) => pressEnter(e)}
      tabIndex={tabIndex}
      activeClassName="MenuItem_active"
    >
      <img src={imgURL} className="MenuItem_icon" alt={`${name}`} />
      <div className="MenuItem_name">{name}</div>
    </NavLink>
  );
};

export default MenuItem;

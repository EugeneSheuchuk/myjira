import React, { KeyboardEvent, MouseEvent } from 'react';
import './MenuItem.scss';

type TProps = {
  imgURL: string;
  name: string;
  action?: Function;
  tabIndex: number;
};

const MenuItem: React.FC<TProps> = ({
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
    <div
      className="MenuItem"
      role="button"
      onClick={(e: MouseEvent<HTMLDivElement>) => componentAction(e)}
      onKeyPress={(e: KeyboardEvent) => pressEnter(e)}
      tabIndex={tabIndex}
    >
      <img src={imgURL} className="MenuItem_icon" alt={`${name}`} />
      <div className="MenuItem_name">{name}</div>
    </div>
  );
};

export default MenuItem;

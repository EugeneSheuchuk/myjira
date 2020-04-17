import React, { KeyboardEvent, MouseEvent } from 'react';

type TProps = {
  imgURL: string;
  name: string;
  width: number;
  height: number;
  action?: Function;
  tabIndex: number;
  alt: string;
};

const MenuItem: React.FC<TProps> = ({
  imgURL,
  name,
  width,
  height,
  action,
  tabIndex,
  alt,
}) => {
  const containerStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };

  const defaultFunc = () => {};
  const componentAction = action || defaultFunc;

  // eslint-disable-next-line
  const pressEnter = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') componentAction(e);
  };

  return (
    <div
      className="MenuItem"
      style={containerStyle}
      role="button"
      onClick={(e: MouseEvent<HTMLDivElement>) => componentAction(e)}
      onKeyPress={(e: KeyboardEvent) => pressEnter(e)}
      tabIndex={tabIndex}
    >
      <img src={imgURL} className="MenuItem_icon" alt={`${alt}`} />
      <div className="MenuItem_name">{name}</div>
    </div>
  );
};

export default MenuItem;

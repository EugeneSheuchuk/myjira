import React, { MouseEvent, KeyboardEvent } from 'react';
import './ImgButton.scss';

type TProps = {
  styleClassName?: string;
  width: number;
  height: number;
  imgUrl: string;
  action?: Function;
  title: string;
  tabIndex: number;
};

const ImgButton: React.FC<TProps> = ({
  styleClassName,
  width,
  height,
  imgUrl,
  action,
  title,
  tabIndex,
}) => {
  const containerStyle = {
    backgroundImage: `url('${imgUrl}')`,
    width: `${width}px`,
    height: `${height}px`,
  };

  const imgStyle = {
    backgroundImage: `url('${imgUrl}')`,
    width: '100%',
    height: '100%',
  };

  const defaultFunc = () => {};
  // eslint-disable-next-line
  const pressEnter = (e: KeyboardEvent, title: string): void => {
    if (e.key === 'Enter') componentAction(e, title);
  };

  const componentAction = action || defaultFunc;

  return (
    <div
      className="ImgButton-container"
      style={containerStyle}
      onClick={(e: MouseEvent<HTMLDivElement>) => componentAction(e, title)}
      title={title}
      role="button"
      tabIndex={tabIndex}
      onKeyPress={(e: KeyboardEvent) => pressEnter(e, title)}
    >
      <div className={`ImgButton ${styleClassName}`} style={imgStyle} />
    </div>
  );
};

export default ImgButton;

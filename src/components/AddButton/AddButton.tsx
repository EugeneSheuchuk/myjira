import React from 'react';
import './AddButton.scss';
import Add from '../../assets/images/add.png';

type Props = {
  description?: string;
  width: number;
  height: number;
  action: (e: React.MouseEvent<HTMLDivElement>) => void;
  keyAction: (e: React.KeyboardEvent<HTMLDivElement>) => void;
};

const AddButton: React.FC<Props> = ({ description, width, height, action, keyAction }) => {
  const text = description ? <div className="AddButton-description">{description}</div> : null;
  const style = {
    backgroundImage: `url(${Add})`,
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <div
      className="AddButton"
      onClick={(e) => action(e)}
      onKeyDown={(e) => keyAction(e)}
      role="button"
      tabIndex={0}
    >
      <div className="AddButton-img" style={style} />
      {text}
    </div>
  );
};

export default AddButton;

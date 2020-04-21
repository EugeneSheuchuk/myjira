import React from 'react';
import './AddButton.scss';

type Props = {
  imgURL: string
  description?: string
  width: number
  height: number
}

const AddButton: React.FC<Props> = ({ imgURL, description, width, height}) => {
  const text = description
    ? (<div className='AddButton-description'>{description}</div>)
    : null;
  const style = {
    backgroundImage: `url(${imgURL})`,
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <div className='AddButton'>
      <div className='AddButton-img' style={style}/>
      {text}
    </div>
  );
};

export default AddButton;
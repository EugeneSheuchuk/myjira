import React from 'react';
import './PopUp.scss';

class PopUp extends React.PureComponent {
  render() {
    return (
      <div className='PopUp'>
        <div className='PopUp-container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default PopUp;
import React from 'react';
import './DropDownMenu.scss';
import { DropDownItem, DropDownProps } from '../../types/types';
import More from '../../assets/images/more.png';

interface IProps {
  actions: DropDownProps
  visibility: 'visible' | 'hidden';
}

type StateType = {
  isClicked: boolean;
  isMouseAboveElement: boolean,
}

class DropDownMenu extends React.Component<IProps, StateType> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isClicked: false,
      isMouseAboveElement: false,
    };
  };

  clickMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ isClicked: true });
  };

  mouseAboveElement = (e: React.MouseEvent) => {
    this.setState({ isMouseAboveElement: true });
  };

  mouseOutElement = (e: React.MouseEvent) => {
    this.setState({ isMouseAboveElement: false });
  };

  render() {
    const { actions, visibility } = this.props;
    const { isClicked, isMouseAboveElement } = this.state;
    const menu = actions.map((item: DropDownItem) => {
      return <li className='DropDownMenu-option'
                  onClick={(e) => item.action(e)}
                  key={item.actionName}>
        {item.actionName}
      </li>;
    });
    const style = isClicked
      ? {
        visibility: 'visible',
        backgroundColor: 'darkgray',
      } as React.CSSProperties
      : isMouseAboveElement
        ? {
            visibility: 'visible',
            cursor: 'pointer',
            backgroundColor: 'darkgray',
        } as React.CSSProperties
        : {
          visibility: `${visibility}`,
        } as React.CSSProperties;

    return (
      <div className='DropDownMenu'
           style={style}
           onClick={this.clickMenu}
           onMouseOver={this.mouseAboveElement}
           onMouseOut={this.mouseOutElement}>
        <img src={More} alt='more'/>
        {isClicked ? <ul className='DropDownMenu-container'>{menu}</ul> : null}
      </div>
    );
  };
}

export default DropDownMenu;
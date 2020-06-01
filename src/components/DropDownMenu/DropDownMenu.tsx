import React from 'react';
import './DropDownMenu.scss';
import { DropDownItem, DropDownProps } from '../../types/types';
import More from '../../assets/images/more.png';

interface IProps {
  actions: DropDownProps;
  visibility: 'visible' | 'hidden';
  styleClassName: string;
}

type StateType = {
  isClicked: boolean;
  isMouseAboveElement: boolean;
  isOnFocusElement: boolean;
  isOnFocusOptions: boolean;
};

class DropDownMenu extends React.Component<IProps, StateType> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isClicked: false,
      isMouseAboveElement: false,
      isOnFocusElement: false,
      isOnFocusOptions: false,
    };
  }

  clickMenu = (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ isClicked: true });
  };

  clickOption = (e: React.MouseEvent<HTMLLIElement>, call: Function) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState(
      {
        isClicked: false,
        isMouseAboveElement: false,
        isOnFocusElement: false,
        isOnFocusOptions: false,
      },
      () => call(e)
    );
  };

  mouseAboveElement = (e: React.MouseEvent) => {
    this.setState({ isMouseAboveElement: true });
  };

  mouseOutElement = (e: React.MouseEvent) => {
    this.setState({ isMouseAboveElement: false });
  };

  onFocusElement = () => {
    this.setState({ isOnFocusElement: true });
  };

  onBlurElement = () => {
    const { isOnFocusOptions } = this.state;
    if (!isOnFocusOptions) {
      this.setState({ isClicked: false, isOnFocusElement: false });
    }
  };

  onFocusOptions = () => {
    this.setState({ isOnFocusOptions: true });
  };

  onBlurOptions = () => {
    this.setState({ isClicked: false, isOnFocusElement: false });
  };

  mouseOutOptions = () => {
    this.setState({ isOnFocusOptions: false });
  };

  pressEnterOnMenuItem = (e: React.KeyboardEvent, callback: Function) => {
    if (e.keyCode === 13) callback();
  };

  pressEnterOnMenu = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 13) this.clickMenu(e);
  };

  render() {
    const { actions, visibility, styleClassName } = this.props;
    const { isClicked, isMouseAboveElement, isOnFocusElement } = this.state;
    const menu = actions.map((item: DropDownItem) => {
      return (
        <li
          className="DropDownMenu-option"
          onClick={(e) => this.clickOption(e, item.action)}
          onKeyDown={(e) => this.pressEnterOnMenuItem(e, item.action)}
          role="button"
          tabIndex={0}
          key={item.actionName}
        >
          {item.actionName}
        </li>
      );
    });

    let style = {
      visibility: `${visibility}`,
    } as React.CSSProperties;

    if (isClicked) {
      style = {
        visibility: 'visible',
        backgroundColor: 'darkgray',
      } as React.CSSProperties;
    } else if (isMouseAboveElement || isOnFocusElement) {
      style = {
        visibility: 'visible',
        cursor: 'pointer',
        backgroundColor: 'darkgray',
      } as React.CSSProperties;
    }

    return (
      <div
        className={`${styleClassName} DropDownMenu`}
        style={style}
        onClick={this.clickMenu}
        onKeyDown={this.pressEnterOnMenu}
        onMouseOver={this.mouseAboveElement}
        onMouseOut={this.mouseOutElement}
        onBlur={this.onBlurElement}
        onFocus={this.onFocusElement}
        role="button"
        tabIndex={0}
      >
        <img src={More} alt="more" />
        {isClicked ? (
          <ul
            className="DropDownMenu-container"
            onFocus={this.onFocusOptions}
            onMouseOver={this.onFocusOptions}
            onMouseOut={this.mouseOutOptions}
            onBlur={this.onBlurOptions}
          >
            {menu}
          </ul>
        ) : null}
      </div>
    );
  }
}

export default DropDownMenu;

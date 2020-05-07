import React from 'react';
import './App.scss';
import Sidebar from '../Sidebar/Sidebar';
import Menu from '../Menu/Menu';
import MainBoard from '../MainBoard/MainBoard';

type StateType = {
  width: number;
  isResizing: boolean;
  isOpenMenu: boolean;
  memoryWidth: number | null;
};

class App extends React.Component<{}, StateType> {
  constructor(props: {}) {
    super(props);
    this.state = {
      width: 225,
      isResizing: false,
      isOpenMenu: true,
      memoryWidth: null,
    };
  }

  toggleResizeBorder = (action: boolean) => {
    this.setState({ isResizing: action });
  };

  resizeBorder = (e: React.MouseEvent) => {
    const { width, isResizing } = this.state;
    if (isResizing) {
      this.setState({ width: width + e.movementX });
    }
  };

  clickShowHideMenuButton = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const { isOpenMenu } = this.state;
    let { width, memoryWidth } = this.state;
    if (isOpenMenu) {
      memoryWidth = width;
      width = 15;
      this.setState({ width, memoryWidth, isOpenMenu: false });
    } else {
      memoryWidth = memoryWidth === null ? 225 : memoryWidth;
      width = memoryWidth;
      this.setState({ width, memoryWidth, isOpenMenu: true });
    }
  };

  pressEnter = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      this.clickShowHideMenuButton(e);
    }
  };

  render() {
    const { width, isOpenMenu } = this.state;
    const style = {
      left: `${width + 84}px`,
      width: `calc(100vw - ${width + 84}px)`,
    };

    return (
      <div className="App" onMouseMove={this.resizeBorder}>
        <Sidebar />
        <Menu width={width} />
        <div
          className="App-menuBorder"
          style={{ left: `calc(64px + ${width}px)` }}
          onMouseDown={() => this.toggleResizeBorder(true)}
          onMouseUp={() => this.toggleResizeBorder(false)}
          role="button"
          tabIndex={-1}
          onKeyPress={() => {}}
        >
          <div
            className="App-menuBorder-button"
            style={{ left: `calc(64px + ${width}px - 11px)` }}
            onClick={this.clickShowHideMenuButton}
            role="button"
            tabIndex={0}
            onKeyDown={this.pressEnter}
          >
            {isOpenMenu ? <span>&#8249;</span> : <span>&#8250;</span>}
          </div>
          <div />
        </div>
        <div className="App-article" style={style}>
          <MainBoard />
        </div>
      </div>
    );
  }
}

export default App;

import React from 'react';
import './App.scss';
import Sidebar from '../Sidebar/Sidebar';
import Menu from '../Menu/Menu';
import MainBoard from '../MainBoard/MainBoard';

type StateType = {
  width: number;
  isResizing: boolean;
};

class App extends React.Component<{}, StateType> {
  constructor(props: {}) {
    super(props);
    this.state = {
      width: 225,
      isResizing: false,
    };
  }

  toggleResizeBorder = (action: boolean) => {
    this.setState({isResizing: action});
  };

  resizeBorder = (e: React.MouseEvent) => {
    const { width, isResizing } = this.state;
    if (isResizing) {
      this.setState( {width: width + e.movementX});
    }
  };

  render() {
    const { width } = this.state;
    const style = {
      left: `${width + 84}px`,
      width: `calc(100vw - ${width + 84}px)`,
    };

    return (
      <div className="App" onMouseMove={this.resizeBorder}>
        <Sidebar />
        <Menu width={width} />
        <div className='App-menuBorder'
             style={{left: `calc(64px + ${width}px)`}}
             onMouseDown={() => this.toggleResizeBorder(true)}
             onMouseUp={() => this.toggleResizeBorder(false)}>
          <div/>
        </div>
        <div className="App-article" style={style}>
          <MainBoard />
        </div>
      </div>
    );
  }
}

export default App;

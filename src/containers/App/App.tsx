import React from 'react';
import './App.scss';
import Sidebar from '../Sidebar/Sidebar';
import Menu from '../Menu/Menu';
import MainBoard from '../MainBoard/MainBoard';

type StateType = {
  width: number;
};

class App extends React.Component<{}, StateType> {
  constructor(props: {}) {
    super(props);
    this.state = {
      width: 225
    };
  }

  render() {
    const { width } = this.state;
    const style = {
      left: `${width + 84}px`,
      width: `calc(100vw - ${width + 84}px)`,
    };

    return (
      <div className="App">
        <Sidebar/>
        <Menu width={width}/>
        <div className="App-article" style={style}>
          <MainBoard/>
        </div>
      </div>
    );
  }
}

export default App;

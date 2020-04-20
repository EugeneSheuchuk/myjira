import React from 'react';
import './App.scss';
import Sidebar from '../Sidebar/Sidebar';
import Menu from '../Menu/Menu';
import MainBoard from '../MainBoard/MainBoard';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="App-article">
        <Menu />
        <MainBoard />
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './MainBoard.scss';
import Roadmap from '../Roadmap/Roadmap';
import Board from '../Board/Board';
import Pages from '../Pages/Pages';
import AddPjLink from '../AddPjLink/AddPjLink';
import PSettings from '../PSettings/PSettings';

const MainBoard: React.FC = () => {
  return (
    <div className="MainBoard">
      <Switch>
        <Route exact path="/">
          <Roadmap />
        </Route>
        <Route path="/roadmap">
          <Roadmap />
        </Route>
        <Route path="/board">
          <Board />
        </Route>
        <Route path="/pages">
          <Pages />
        </Route>
        <Route path="/addItem">
          <AddPjLink />
        </Route>
        <Route path="/propertySettings">
          <PSettings />
        </Route>
      </Switch>
    </div>
  );
};

export default MainBoard;

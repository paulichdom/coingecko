import React, { ReactElement, useState } from 'react';
import { Container, Icon, Menu, Search } from 'semantic-ui-react';

import Home from './Home';
import CoinList from './CoinList';
import CoinDetails from './CoinDetails';

import {
  BrowserRouter as Router,
  NavLink,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

export default function App(): ReactElement {
  return (
    <Router>
      <Menu className="ui attached stackable menu" inverted color="green">
        <NavLink to="/home" className="item" activeClassName="active">
          <Icon name="home" />
          Home
        </NavLink>
        <NavLink to="/coins" className="item" activeClassName="active">
          <Icon name="bitcoin" />
          Coins
        </NavLink>
      </Menu>
      <Container>
        <Switch>
          <Route path="/coins/:coinId">
            <CoinDetails />
          </Route>
          <Route path="/coins">
            <CoinList />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route exact path="">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

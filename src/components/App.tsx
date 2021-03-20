import React, { ReactElement } from 'react';
import { Container, Icon, Menu, Search } from 'semantic-ui-react';

import Layout from './Layout';
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
    <Layout>
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
    </Layout>
  );
}

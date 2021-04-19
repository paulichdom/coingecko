import React, { ReactElement, useReducer } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CoinDetails from './CoinDetails';
import CoinList from './CoinList';
import Home from './Home';
import { reducer } from '../Store';
import Watchlist from './Watchlist';

export default function Routes(): ReactElement {
  const [store, dispatch] = useReducer(reducer, { watchlist: [] });

  return (
    <Switch>
      <Route path="/coins/:coinId">
        <CoinDetails />
      </Route>
      <Route path="/coins">
        <CoinList dispatch={dispatch} watchlist={store.watchlist} />
      </Route>
      <Route path="/watchlist">
        <Watchlist watchlist={store.watchlist} dispatch={dispatch} />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route exact path="">
        <Redirect to="/home" />
      </Route>
    </Switch>
  );
}

import React, { ReactElement } from 'react';

import CoinList from './CoinList';

export default function App(): ReactElement {
  return (
    <div className="ui container">
      <CoinList />
    </div>
  );
}

import React, { ReactElement, useState } from 'react';

import CoinList from './CoinList';
import CoinDetails from './CoinDetails';
import ICoinListItem from '../types/ICoinListItem';

type ViewState = 'list' | 'details';

export default function App(): ReactElement {
  const [viewState, setViewState] = useState<ViewState>('list');
  const [coin, setCoin] = useState<ICoinListItem>();

  const showList = () => {
    setViewState('list');
    setCoin(undefined);
  };

  const showDetails = (coin_: ICoinListItem) => {
    setCoin(coin_);
    setViewState('details');
  };

  return (
    <div className="ui container">
      {
        viewState === 'details' && coin 
          ? <CoinDetails showList={showList} coin={coin} />
          : <CoinList showDetails={showDetails} />
      }
    </div>
  );
}

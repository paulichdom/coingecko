import React, { ReactElement } from 'react';
import { useCoinApi } from '../shared/CoinApi';
import { coinListURL } from '../shared/URLBuilder';
import { Table } from 'semantic-ui-react';

import ICoinListItem from '../types/ICoinListItem';
import CoinListItem from './CoinListItem';
import LoadingSpinner from './LoadingSpinner';

export default function CoinList(): ReactElement {
  const coinsURL = coinListURL('coins/markets', 'eur', 20, 1).href;
  const [coins] = useCoinApi<ICoinListItem[]>('GET', coinsURL);

  if (!coins) {
    return <LoadingSpinner name="Coins" />;
  }

  return (
    <Table basic="very" singleLine selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>#</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>1h %</Table.HeaderCell>
          <Table.HeaderCell>24h %</Table.HeaderCell>
          <Table.HeaderCell>7d %</Table.HeaderCell>
          <Table.HeaderCell>Volume (24h)</Table.HeaderCell>
          <Table.HeaderCell>Market Cap</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {coins.map((coin) => (
          <CoinListItem
            key={coin.id}
            coin={coin}
          />
        ))}
      </Table.Body>
    </Table>
  );
}

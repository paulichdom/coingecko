import React, { ReactElement, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useCoinApi } from '../shared/CoinApi';
import { Table } from 'semantic-ui-react';

import ICoinListItem from '../types/ICoinListItem';
import CoinListItem from './CoinListItem';
import LoadingSpinner from './LoadingSpinner';

interface Props {
  showDetails: (coin: ICoinListItem) => void;
}

export default function CoinList(props: Props): ReactElement {
  const coinListPath =
    'coins/markets?vs_currency=eur&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y';
  const [coins] = useCoinApi<ICoinListItem[]>('GET', coinListPath);

  if (!coins) {
    return <LoadingSpinner name="coins" />;
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
            showDetails={props.showDetails}
          />
        ))}
      </Table.Body>
    </Table>
  );
}

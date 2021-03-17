import React, { ReactElement } from 'react';
import { Table } from 'semantic-ui-react';

import { coins } from '../shared/coins';
import CoinListItem from './CoinListItem';

export default function CoinList(): ReactElement {
  return (
    <Table basic="very" singleLine>
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
          <CoinListItem key={coin.id} coin={coin} />
        ))}
      </Table.Body>
    </Table>
  );
}

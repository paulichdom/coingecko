import React from 'react';
import ICoinListItem from '../types/ICoinListItem';
import { Dispatch } from '../Store';
import { Table } from 'semantic-ui-react';
import WatchlistItem from './WatchlistItem';

interface IProps {
  dispatch: Dispatch;
  watchlist: ICoinListItem[];
}

export default function Watchlist(props: IProps): JSX.Element {
  
  const coins = props.watchlist
    .reduce((acc: ICoinListItem[], coin) => {
      acc.find((coin_) => coin_.id === coin.id) || acc.push(coin);
      return acc;
    }, [])
    .sort((coinA, coinB) => Number(coinA.id) - Number(coinB.id));

  return (
    <Table basic="very" singleLine selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>#</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">Price</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">1h %</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">24h %</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">7d %</Table.HeaderCell>
          <Table.HeaderCell textAlign="right"></Table.HeaderCell>
          
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {coins.map((coin) => (
          <WatchlistItem
            key={coin.id}
            coinListItem={coin}
            dispatch={props.dispatch}
          />
        ))}
      </Table.Body>
    </Table>
  );
}

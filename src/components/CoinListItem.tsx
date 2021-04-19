import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, List, Image, Icon, Container, Popup } from 'semantic-ui-react';

import ICoinListItem from '../types/ICoinListItem';

interface Props {
  coin: ICoinListItem;
  currency: string;
}

export default function CoinListItem(props: Props): ReactElement {
  const coin = props.coin;
  const history = useHistory();

  const [iconName, setIconName] = useState('star outline');

  const formatCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: props.currency,
  });

  const formatCurrencyDigits = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: props.currency,
    minimumFractionDigits: 0,
  });

  const onGoToDetail = () => {
    history.push(`/coins/${coin.id}`);
  };

  // handle events
  const addToWatchlist = () => {
    if (iconName !== 'star icon yellow') {
      setIconName('star icon yellow');
    } else {
      setIconName('star outline icon yellow');
    }
  };

  const onMouseEnter = () => {
    if (iconName !== 'star icon yellow') setIconName('star outline icon yellow');
  };

  const onMouseLeave = () => {
    if (iconName !== 'star icon yellow') setIconName('star outline icon grey');
  };

  return (
    <Table.Row className="enlarge">
      <Table.Cell textAlign="center">
        <Popup
          content="Add to Main Watchlist"
          position="top center"
          size="small"
          inverted
          trigger={
            <Icon
              style={{ cursor: 'pointer' }}
              onClick={addToWatchlist}
              onMouseLeave={onMouseLeave}
              onMouseEnter={onMouseEnter}
              className={iconName}
            ></Icon>
          }
        />
      </Table.Cell>
      <Table.Cell>{coin.market_cap_rank}</Table.Cell>
      <Table.Cell>
        <List verticalAlign="middle">
          <List.Item onClick={onGoToDetail} style={{ cursor: 'pointer' }}>
            <Image avatar src={coin.image} />
            <List.Content>
              <List.Header>
                {coin.name} <span id="grey"> {coin.symbol.toUpperCase()}</span>
              </List.Header>
            </List.Content>
          </List.Item>
        </List>
      </Table.Cell>
      <Table.Cell className="bold">
        {formatCurrency.format(coin.current_price)}
      </Table.Cell>
      <Table.Cell>
        <div
          id={coin.price_change_percentage_1h_in_currency > 0 ? 'green' : 'red'}
          className="bold"
        >
          {coin.price_change_percentage_1h_in_currency > 0 ? (
            <Icon name="caret up" />
          ) : (
            <Icon name="caret down" />
          )}
          {coin.price_change_percentage_1h_in_currency
            ? Math.abs(+coin.price_change_percentage_1h_in_currency.toFixed(1))
            : 'n/a'}{' '}
          %
        </div>
      </Table.Cell>
      <Table.Cell>
        <div
          id={
            coin.price_change_percentage_24h_in_currency > 0 ? 'green' : 'red'
          }
          className="bold"
        >
          {coin.price_change_percentage_24h_in_currency > 0 ? (
            <Icon name="caret up" />
          ) : (
            <Icon name="caret down" />
          )}
          {coin.price_change_percentage_24h_in_currency
            ? Math.abs(+coin.price_change_percentage_24h_in_currency.toFixed(1))
            : 'n/a'}{' '}
          %
        </div>
      </Table.Cell>
      <Table.Cell>
        <div
          id={coin.price_change_percentage_7d_in_currency > 0 ? 'green' : 'red'}
          className="bold"
        >
          {coin.price_change_percentage_7d_in_currency > 0 ? (
            <Icon name="caret up" />
          ) : (
            <Icon name="caret down" />
          )}
          {coin.price_change_percentage_7d_in_currency
            ? Math.abs(+coin.price_change_percentage_7d_in_currency.toFixed(1))
            : 'n/a'}{' '}
          %
        </div>
      </Table.Cell>
      <Table.Cell className="bold">
        {formatCurrencyDigits.format(coin.total_volume)}
      </Table.Cell>
      <Table.Cell className="bold">
        {formatCurrencyDigits.format(coin.market_cap)}
      </Table.Cell>
    </Table.Row>
  );
}

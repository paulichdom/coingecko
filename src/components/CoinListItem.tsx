import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, List, Image, Icon, Popup } from 'semantic-ui-react';
import { Dispatch } from '../Store';

import ICoinListItem from '../types/ICoinListItem';

interface Props {
  coin: ICoinListItem;
  currency: string;
  dispatch: Dispatch;
  watchlist: ICoinListItem[];
}

export default function CoinListItem(props: Props): ReactElement {
  const coin = props.coin;
  const coinListItem = props.coin;
  const history = useHistory();
  
  const watchlistItem = props.watchlist.find((coin_) => coin_.id === coin.id);
  const iconState = watchlistItem?.id === coin.id ? 'star icon yellow' : 'star outline'
  
  const [iconName, setIconName] = useState(iconState);

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
      props.dispatch({ type: 'addToWatchlist', coinListItem });
      setIconName('star icon yellow');
    } else {
      props.dispatch({ type: 'removeFromWatchlist', coinListItem });
      setIconName('star outline icon yellow');
    }
  };

  const onMouseEnter = () => {
    if (iconName !== 'star icon yellow')
      setIconName('star outline icon yellow');
  };

  const onMouseLeave = () => {
    if (iconName !== 'star icon yellow') setIconName('star outline icon grey');
  };

  return (
    <Table.Row className="enlarge">
      <Table.Cell textAlign="center">
        <Popup
          content={
            iconName !== 'star icon yellow'
              ? 'Add to Watchlist'
              : 'Remove from Watchlist'
          }
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
      <Table.Cell className="bold" textAlign="right">
        {formatCurrency.format(coin.current_price)}
      </Table.Cell>
      <Table.Cell textAlign="right">
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
      <Table.Cell textAlign="right">
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
      <Table.Cell textAlign="right">
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
      <Table.Cell className="bold" textAlign="right">
        {formatCurrencyDigits.format(coin.total_volume)}
      </Table.Cell>
      <Table.Cell className="bold" textAlign="right">
        {formatCurrencyDigits.format(coin.market_cap)}
      </Table.Cell>
    </Table.Row>
  );
}

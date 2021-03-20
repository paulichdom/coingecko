import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, List, Image } from 'semantic-ui-react';

import ICoinListItem from '../types/ICoinListItem';

interface Props {
  coin: ICoinListItem;
}

export default function CoinListItem(props: Props): ReactElement {
  const coin = props.coin;
  const history = useHistory();

  const onGoToDetail = () => {
    history.push(`/coins/${coin.id}`);
  };

  return (
    <Table.Row onClick={onGoToDetail}>
      <Table.Cell>{coin.market_cap_rank}</Table.Cell>
      <Table.Cell>
        <List verticalAlign="middle">
          <List.Item>
            <Image avatar src={coin.image} />
            <List.Content>
              <List.Header>
                {coin.name}{' '}
                <small>
                  <span>{coin.symbol.toUpperCase()}</span>
                </small>
              </List.Header>
            </List.Content>
          </List.Item>
        </List>
      </Table.Cell>
      <Table.Cell>{coin.current_price}</Table.Cell>
      <Table.Cell>{coin.price_change_percentage_1h_in_currency} %</Table.Cell>
      <Table.Cell>{coin.price_change_percentage_24h_in_currency} %</Table.Cell>
      <Table.Cell>{coin.price_change_percentage_7d_in_currency} %</Table.Cell>
      <Table.Cell>{coin.total_volume}</Table.Cell>
      <Table.Cell>{coin.market_cap}</Table.Cell>
    </Table.Row>
  );
}

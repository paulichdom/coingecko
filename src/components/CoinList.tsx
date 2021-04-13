import React, { ReactElement, SyntheticEvent, useState } from 'react';
import { useCoinApi } from '../shared/CoinApi';
import { coinListURL } from '../shared/URLBuilder';
import { Dropdown, DropdownProps, Menu, Table } from 'semantic-ui-react';

import ICoinListItem from '../types/ICoinListItem';
import CoinListItem from './CoinListItem';
import LoadingSpinner from './LoadingSpinner';
import { Currencies } from '../shared/Currencies';
import { CurrencyOptions } from '../shared/CurrencyOptions';

export default function CoinList(): ReactElement {
  const [currency, setCurrency] = useState(Currencies.EUR.code);
  const coinsURL = coinListURL('coins/markets', currency, 20, 1).href;
  console.log(coinsURL);

  const [coins] = useCoinApi<ICoinListItem[]>('GET', coinsURL);

  if (!coins) {
    return <LoadingSpinner name="Coins" />;
  }

  const onChangeCurrency = (e: SyntheticEvent, info: DropdownProps) => {
    if (info.value) setCurrency(info.value.toString());
  };

  return (
    <>
      <Menu secondary>
        <Menu.Item>
          <Dropdown
            onChange={onChangeCurrency}
            button
            className="icon"
            floating
            labeled
            options={CurrencyOptions}
            search
            text={currency}
          />
        </Menu.Item>
      </Menu>
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
            <CoinListItem key={coin.id} coin={coin} currency={currency} />
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

import React, { ReactElement, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import {
  Grid,
  List,
  Image,
  Button,
  Divider,
  GridColumn,
} from 'semantic-ui-react';

import ICoinListItem from '../types/ICoinListItem';
import ICoinDetails from '../types/ICoinDetails';
import LoadingSpinner from './LoadingSpinner';

interface Props {
  coin: ICoinListItem;
  showList: () => void;
}

export default function CoinDetails(props: Props): ReactElement {
  // const coin = props.coin;
  const [coin, setCoin] = useState<ICoinDetails>();

  useEffect(() => {
    axios({
      method: 'GET',
      url: `https://api.coingecko.com/api/v3/coins/${props.coin.id}`,
    }).then((response: AxiosResponse<ICoinDetails>) => setCoin(response.data));
  }, [props.coin.id]);

  if (!coin) {
    return <LoadingSpinner name="coin" />;
  }

  return (
    <>
      <Grid padded="vertically" centered divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>
            <List verticalAlign="middle">
              <List.Item>
                <Image avatar src={coin.image.large} />
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
          </Grid.Column>
          <GridColumn textAlign="right">
            <h3>{coin.market_data.current_price.eur}</h3>
          </GridColumn>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column textAlign="right">
            <p className="bold">Market cap</p>
            {coin.market_data.market_cap.eur}
            <p className="bold">24h High</p>
            {coin.market_data.high_24h.eur}
          </Grid.Column>
          <Grid.Column textAlign="right">
            <p className="bold">Circulating Supply</p>
            {coin.market_data.circulating_supply}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
      <Button content="Back" onClick={props.showList} />
    </>
  );
}

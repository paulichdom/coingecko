import React, { ReactElement } from 'react';
import { useCoinApi } from '../shared/CoinApi';
import { coinDetailURL } from '../shared/URLBuilder';

import {
  Grid,
  List,
  Image,
  Button,
  Divider,
  GridColumn,
} from 'semantic-ui-react';

import ICoinDetails from '../types/ICoinDetails';
import LoadingSpinner from './LoadingSpinner';
import { useHistory, useParams } from 'react-router-dom';

export default function CoinDetails(): ReactElement {
  const { coinId } = useParams<{ coinId: string }>();
  const coinURL = coinDetailURL('coins', coinId).href;
  const coin = useCoinApi<ICoinDetails>('GET', coinURL)[0];
  
  const history = useHistory();

  const onGoToList = () => {
    history.push('/coins');
  };

  if (!coin) {
    return <LoadingSpinner name={coinId.toUpperCase()} />;
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
      <Button content="Back" onClick={onGoToList} />
    </>
  );
}

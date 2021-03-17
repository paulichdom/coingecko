import React, { ReactElement } from 'react';
import {
  Grid,
  List,
  Image,
  Button,
  Divider,
  GridColumn,
} from 'semantic-ui-react';

import ICoinListItem from '../types/ICoinListItem';

interface Props {
  coin: ICoinListItem;
  showList: () => void;
}

export default function CoinDetails(props: Props): ReactElement {
  const coin = props.coin;

  return (
    <>
      <Grid padded="vertically" centered divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>
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
          </Grid.Column>
          <GridColumn textAlign="right">
            <h3>{coin.current_price}</h3>
          </GridColumn>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column textAlign="right">
            <p className="bold">Market cap</p>
            {coin.market_cap}
            <p className="bold">24h High</p>
            {coin.high_24h}
          </Grid.Column>
          <Grid.Column textAlign="right">
            <p className="bold">Circulating Supply</p>
            {coin.circulating_supply}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
      <Button content="Back" onClick={props.showList} />
    </>
  );
}

import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react';

export default function Home(): ReactElement {
  return (
    <>
      <Header as="h2">
        <Icon name="chart bar outline" />
        <Header.Content>
          Welcome to CryptoStats
          <Header.Subheader>CoinGecko API</Header.Subheader>
        </Header.Content>
      </Header>
      <Link className="ui yellow button" to="/coins">
        Go to coin List
      </Link>
    </>
  );
}

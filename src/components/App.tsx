import React, { ReactElement } from 'react';

import Routes from './Routes';
import Layout from './Layout';

export default function App(): ReactElement {
  return (
    <Layout>
      <Routes />
    </Layout>
  );
}

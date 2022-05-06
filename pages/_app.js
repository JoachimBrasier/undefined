import { Layout } from 'components/common';

import 'styles/global.css';

const App = ({ Component, pageProps }) => (
  <Layout {...pageProps}>
    <Component {...pageProps} />
  </Layout>
);

export default App;

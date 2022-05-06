import { ThemeProvider } from 'next-themes';

import { Layout } from 'components/common';

import 'styles/global.css';

const App = ({ Component, pageProps }) => (
  <ThemeProvider attribute="class">
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  </ThemeProvider>
);

export default App;

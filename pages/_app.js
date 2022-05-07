import Router from 'next/router';

import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config';
import { ThemeProvider } from 'next-themes';
import NProgress from 'nprogress';

import { Layout } from 'components/common';

import 'styles/global.css';

NProgress.configure({ showSpinner: false });

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeError = () => NProgress.done();
Router.onRouteChangeComplete = () => NProgress.done();

const App = ({ Component, pageProps }) => (
  <ThemeProvider attribute="class" enableSystem={false}>
    <DefaultSeo {...SEO} />
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  </ThemeProvider>
);

export default App;

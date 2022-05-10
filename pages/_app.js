import Head from 'next/head';
import Router from 'next/router';

import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config';
import { ThemeProvider } from 'next-themes';
import NProgress from 'nprogress';

import { Layout } from 'components/common';

import 'styles/global.css';

NProgress.configure({ showSpinner: false });

Router.onRouteChangeStart = (url, { shallow }) => !shallow && NProgress.start();
Router.onRouteChangeError = () => NProgress.done();
Router.onRouteChangeComplete = () => NProgress.done();

// TODO disable hover on touch devices
const App = ({ Component, pageProps }) => (
  <SessionProvider session={pageProps.session}>
    <ThemeProvider attribute="class" enableSystem={false}>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>
      <DefaultSeo {...SEO} />
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  </SessionProvider>
);

export default App;

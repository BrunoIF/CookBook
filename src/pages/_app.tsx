import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';

import apolloClient from 'lib/apolloClient';

import GlobalStyles from 'styles/global';

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>NextJS CookBook</title>
        <link rel="shortcut icon" href="/images/icon-512.png" />
        <link rel="apple-touch icon" href="/images/icon-512.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="description"
          content="Next level boilerplate for SSR React project powered by Typescript and Styled Components"
        />
      </Head>

      <GlobalStyles />

      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;

import React from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import { Provider as AuthProvider } from 'next-auth/client';

import { useApollo } from 'lib/apolloClient';
import Navigation from 'components/Navigation';

import GlobalStyles from 'styles/global';

function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  return (
    <>
      <Head>
        <title>NextJS Cookbook</title>
        <link rel="shortcut icon" href="/images/icon-512.png" />
        <link rel="apple-touch icon" href="/images/icon-512.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="description"
          content="Next level boilerplate for SSR React project powered by Typescript and Styled Components"
        />
      </Head>

      <GlobalStyles />
      <AuthProvider session={pageProps.session}>
        <ApolloProvider client={apolloClient}>
          <Navigation />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick
            draggable={false}
            css={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              width: '586px',
            }}
          />
          <Component {...pageProps} />
        </ApolloProvider>
      </AuthProvider>
    </>
  );
}

export default App;

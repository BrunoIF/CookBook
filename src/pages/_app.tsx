import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';

import { AuthProvider, ProtectRoute } from 'context/auth';
import apolloClient from 'lib/apolloClient';
import Navigation from 'components/Navigation';

import GlobalStyles from 'styles/global';

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
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

      <AuthProvider>
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
        <ProtectRoute>
          <Component {...pageProps} />
        </ProtectRoute>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;

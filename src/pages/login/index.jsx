import React from 'react';
import Head from 'next/head';
import { signIn } from 'next-auth/client';

import { Wrapper as GlobalWrapper } from 'styles/global';
import Button from 'components/Buttons/Button';

function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <GlobalWrapper>
        <div css={{ display: 'grid', placeItems: 'center' }}>
          <Button css={{ marginTop: '30px' }} text="Login" onClick={signIn} />
        </div>
      </GlobalWrapper>
    </>
  );
}

export default Login;

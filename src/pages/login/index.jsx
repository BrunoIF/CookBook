import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/client';

import { Wrapper as GlobalWrapper } from 'styles/global';
import Button from 'components/Buttons/Button';

function Login() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

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

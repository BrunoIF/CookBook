import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';

import { Wrapper as GlobalWrapper } from 'styles/global';

function Protected() {
  const [session] = useSession();

  return (
    <GlobalWrapper>
      {session ? (
        <>
          <h1>Hello {session.user.name}</h1>
          <button onClick={signOut}>Sign out</button>
        </>
      ) : (
        <>
          <h1>Not signed in</h1>
          <button onClick={signIn}>Sign in</button>
        </>
      )}
    </GlobalWrapper>
  );
}

export default Protected;

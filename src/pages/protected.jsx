import React from 'react';
import { signOut, useSession, getSession } from 'next-auth/client';

import ProtectedRoute from 'components/ProtectedRoute';
import { Wrapper as GlobalWrapper } from 'styles/global';

function Protected() {
  const [session] = useSession();

  return (
    <ProtectedRoute>
      <GlobalWrapper>
        {session ? (
          <>
            <h1>Hello {session.user.name}</h1>
            <button onClick={signOut}>Sign out</button>
          </>
        ) : null}
      </GlobalWrapper>
    </ProtectedRoute>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  return { props: { session } };
};

export default Protected;

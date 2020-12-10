import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import { Wrapper as GlobalWrapper } from 'styles/global';

function ProtectedRoute({ children }) {
  const [session, loading] = useSession();
  const router = useRouter();

  if (loading) {
    return (
      <GlobalWrapper>
        <h1>Loading</h1>
      </GlobalWrapper>
    );
  }

  const isLoginPage = window.location.pathname === '/login';
  if (!session) {
    if (!isLoginPage) {
      router.push('/login');
    }
  }

  return children;
}

export default ProtectedRoute;

import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import Skeleton from 'react-loading-skeleton';

import { Wrapper as GlobalWrapper } from 'styles/global';

function ProtectedRoute({ children }) {
  const [session, loading] = useSession();
  const router = useRouter();

  if (loading) {
    return (
      <GlobalWrapper>
        <Skeleton height={40} count={3} />
      </GlobalWrapper>
    );
  }

  const isLoginPage = window.location.pathname === '/login';
  if (!session) {
    if (!isLoginPage) {
      router.push('/login');
      return null;
    }
  }

  return children;
}

export default ProtectedRoute;

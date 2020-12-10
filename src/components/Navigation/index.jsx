import React from 'react';
import { signOut, useSession } from 'next-auth/client';

import * as S from './styles';

function Navigation() {
  const [session] = useSession();
  return (
    <S.Wrapper>
      <h1>Cookbook</h1>
      {session && <S.Logout onClick={signOut}>Logout</S.Logout>}
    </S.Wrapper>
  );
}

export default Navigation;

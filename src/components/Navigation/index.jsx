import React from 'react';

import { useAuth } from 'context/auth';
import * as S from './styles';

function Navigation() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <S.Wrapper>
      <h1>Cookbook</h1>
      {isAuthenticated && <S.Logout onClick={logout}>Logout</S.Logout>}
    </S.Wrapper>
  );
}

export default Navigation;

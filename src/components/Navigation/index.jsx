import React from 'react';
import { useRouter } from 'next/router';

import * as S from './styles';

function Navigation() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('cookbook_auth');
    router.push('/login');
  };

  return (
    <S.Wrapper>
      <h1>Cookbook</h1>
      <S.Logout onClick={handleLogout}>Logout</S.Logout>
    </S.Wrapper>
  );
}

export default Navigation;

import React from 'react';
import Link from 'next/link';

import * as S from './styles';

function LinkButton({ to, text, className, Icon }) {
  return (
    <S.Wrapper className={className}>
      <Link href={to}>
        <S.Button>
          {!!Icon && <S.Icon>{Icon}</S.Icon>}
          {text}
        </S.Button>
      </Link>
    </S.Wrapper>
  );
}

export default LinkButton;

import React from 'react';

import * as S from './styles';

function Button({ text, className, Icon, ...props }) {
  return (
    <S.Wrapper className={className}>
      <S.Button {...props}>
        {!!Icon && <S.Icon>{Icon}</S.Icon>}
        {text}
      </S.Button>
    </S.Wrapper>
  );
}

export default Button;

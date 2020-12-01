import React from 'react';

import * as S from './styles';

function Input({ value, onChange, placeholder, className, Icon }) {
  return (
    <S.Wrapper className={className}>
      {!!Icon && <S.Icon>{Icon}</S.Icon>}
      <input
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        value={value}
      />
    </S.Wrapper>
  );
}

export default Input;

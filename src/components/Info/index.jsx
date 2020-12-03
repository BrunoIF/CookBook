import React from 'react';

import * as S from './styles';

function Info({ className, title, description }) {
  return (
    <p className={className}>
      <S.Title>{`${title}: `}</S.Title>
      {description || '-'}
    </p>
  );
}

export default Info;

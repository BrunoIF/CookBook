import React from 'react';

import LinkButton from 'components/Buttons/LinkButton';

import * as S from './index.styles';
import { Wrapper as GlobalWrapper, Title } from 'styles/global';

function Home() {
  return (
    <>
      <GlobalWrapper>
        <Title center large>
          Welcome to Cookbook
        </Title>
        <S.Wrapper css={{ marginTop: '30px' }}>
          <LinkButton
            to="/recipes/create"
            text="Add new recipe"
            css={{ marginRight: '30px' }}
          />
          <LinkButton to="/ingredients/create" text="Add new ingredient" />
        </S.Wrapper>
      </GlobalWrapper>
    </>
  );
}

export default Home;

import React from 'react';

import LinkButton from 'components/Buttons/LinkButton';
import RecipesList from 'components/RecipesList';
import SavedRecipesList from 'components/SavedRecipesList';
import { GET_ALL_RECIPES } from 'queries/recipes';
import { initializeApollo, addApolloState } from 'lib/apolloClient';

import * as S from 'styles/index.styles';
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
          <LinkButton
            to="/ingredients/create"
            text="Add new ingredient"
            css={{ marginTop: 0 }}
          />
        </S.Wrapper>
        <SavedRecipesList />
        <RecipesList />
      </GlobalWrapper>
    </>
  );
}

export const getServerSideProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_ALL_RECIPES,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};

export default Home;

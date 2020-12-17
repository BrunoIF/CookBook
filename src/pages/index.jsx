import React from 'react';
import { useReactiveVar } from '@apollo/client';

import LinkButton from 'components/Buttons/LinkButton';
import RecipesList from 'components/RecipesList';
import SavedRecipesList from 'components/SavedRecipesList';
import { GET_ALL_RECIPES } from 'queries/recipes';
import {
  initializeApollo,
  addApolloState,
  savedRecipesVar,
} from 'lib/apolloClient';
// import cookie from 'cookie';

import * as S from 'styles/index.styles';
import { Wrapper as GlobalWrapper, Title } from 'styles/global';

function Home() {
  const savedRecipes = useReactiveVar(savedRecipesVar);

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
        {!!savedRecipes.length && <SavedRecipesList />}
        <RecipesList />
      </GlobalWrapper>
    </>
  );
}

export const getServerSideProps = async () => {
  const apolloClient = initializeApollo();
  // const token = cookie.parse(ctx.req.headers.cookie).token;
  // console.log('token', token);

  await apolloClient.query({
    query: GET_ALL_RECIPES,
    // context: {
    //   headers: {
    //     authorization: `Bearer ${token}`,
    //   },
    // },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};

export default Home;

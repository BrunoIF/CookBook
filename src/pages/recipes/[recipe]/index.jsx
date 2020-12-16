import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';
import { useQuery, useMutation } from '@apollo/client';

import { GET_RECIPE } from 'queries/recipes';
import Info from 'components/Info';
import LinkButton from 'components/Buttons/LinkButton';
import Button from 'components/Buttons/Button';
import { Wrapper as GlobalWrapper, Title } from 'styles/global';
import { initializeApollo, addApolloState, saveRecipe } from 'lib/apolloClient';

import * as S from 'styles/recipes.styles';
import { DELETE_RECIPE } from 'queries/recipes';

function Recipe({ recipeId }) {
  const { data, loading, error, called } = useQuery(GET_RECIPE, {
    variables: { id: recipeId },
  });
  const [deleteRecipe] = useMutation(DELETE_RECIPE, {
    variables: { id: recipeId },
  });
  const route = useRouter();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    if (data && !error) {
      console.log('Recipe data', data);
      setRecipe(data?.recipe);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleDeleteRecipe = () => {
    deleteRecipe();
  };

  if (route.isFallback || loading || !called) {
    return <h1>Loading...</h1>;
  }

  const backArrow = <FontAwesomeIcon icon={faArrowLeft} />;
  const ingredientsList =
    recipe?.ingredients?.map((ingr) => ingr.name).join(', ') || [];

  return (
    <>
      <Head>
        <title>{recipe.title}</title>
      </Head>

      <GlobalWrapper>
        <LinkButton to="/" text="Back" Icon={backArrow} />
        {recipe ? (
          <S.FlexRow css={{ marginTop: '30px' }}>
            <S.Image src={recipe.image} alt={`${recipe.title}`} />
            <div css={{ marginLeft: '30px', width: '50%' }}>
              <Title>{recipe.title}</Title>
              <S.ContentWrapper>
                <div>
                  <Info title="Cooking Time" description={recipe.cookingTime} />
                </div>
              </S.ContentWrapper>
              <S.IngredientsWrapper>
                <Info title="Ingredients" description={ingredientsList} />
              </S.IngredientsWrapper>
              <S.FlexRow css={{ marginTop: '30px' }}>
                {recipe.isSaved ? (
                  <p>Recipe saved</p>
                ) : (
                  <Button
                    text="Save Recipe"
                    onClick={() => saveRecipe(recipeId)}
                  />
                )}

                <Button
                  text="Delete Recipe"
                  onClick={handleDeleteRecipe}
                  css={{ marginLeft: '30px', marginTop: 0 }}
                />
                <LinkButton
                  to={`/recipes/${recipeId}/edit`}
                  css={{ marginLeft: '30px', marginTop: 0 }}
                  text="Edit Recipe"
                />
              </S.FlexRow>
            </div>
          </S.FlexRow>
        ) : (
          <Title>Not found</Title>
        )}
      </GlobalWrapper>
    </>
  );
}

export const getStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps = async (context) => {
  const {
    params: { recipe },
  } = context;

  const apolloClient = initializeApollo();

  await apolloClient.query({ query: GET_RECIPE, variables: { id: recipe } });

  return addApolloState(apolloClient, {
    props: { recipeId: recipe },
    revalidate: 10,
  });
};

export default Recipe;

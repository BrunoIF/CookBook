import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_ALL_RECIPES } from 'queries/recipes';
import Card from 'components/Card';

import * as S from 'styles/index.styles';
import { Title } from 'styles/global';

function RecipesList() {
  const { data, error, loading } = useQuery(GET_ALL_RECIPES);

  if (error) return <h1>Error loading posts</h1>;
  if (loading) return <h1>Loading...</h1>;

  const { recipes } = data;

  return (
    <div>
      <Title center css={{ marginTop: '70px' }}>
        Explore recipes
      </Title>
      <S.Wrapper>
        {recipes.map((rec) => (
          <Card key={rec.id} recipe={rec} />
        ))}
      </S.Wrapper>
    </div>
  );
}

export default RecipesList;

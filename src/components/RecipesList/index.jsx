import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_ALL_RECIPES } from 'queries/recipes';
import Card from 'components/Card';

import * as S from 'styles/index.styles';
import { Title } from 'styles/global';

function RecipesList() {
  const { data: initialRecipes, error, loading } = useQuery(GET_ALL_RECIPES);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (initialRecipes) {
      const { recipes } = initialRecipes;
      setRecipes((prevState) => [...prevState, ...recipes]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialRecipes]);

  if (error) return <h1>Error loading recipes</h1>;
  if (loading) return <h1>Loading...</h1>;

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

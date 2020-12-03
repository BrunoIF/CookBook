import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import LinkButton from 'components/Buttons/LinkButton';
import { GET_ALL_RECIPES } from 'queries/recipes';
import Card from 'components/Card';

import * as S from './index.styles';
import { Wrapper as GlobalWrapper, Title } from 'styles/global';

function Home() {
  const { data, error, called } = useQuery(GET_ALL_RECIPES);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (called) {
      if (data && !error) {
        setRecipes(data.recipes);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
        {!!recipes.length && (
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
        )}
      </GlobalWrapper>
    </>
  );
}

export default Home;

import React from 'react';
import Link from 'next/link';

import Info from 'components/Info';

import * as S from './styles';

function Card({ recipe }) {
  const { id, title, image, cookingTime, ingredients } = recipe;
  const ingredientsList =
    ingredients?.map((ingr) => ingr.name).join(', ') || [];

  return (
    <Link href={`/recipes/${id}`}>
      <S.Wrapper>
        <S.Flag css={{ backgroundImage: `url('${image}')` }} />
        <S.Content>
          <S.Title>{title}</S.Title>
          <Info title="Cooking Time" description={cookingTime} />
          <Info title="Ingredients" description={ingredientsList} />
        </S.Content>
      </S.Wrapper>
    </Link>
  );
}

export default Card;

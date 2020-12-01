import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQuery } from '@apollo/client';

import { CREATE_INGREDIENT } from 'queries/ingredients';
import Input from 'components/Input';
import LinkButton from 'components/Buttons/LinkButton';
import Button from 'components/Buttons/Button';
import { Wrapper as GlobalWrapper, Title, Text } from 'styles/global';
import { GET_RECIPES } from '../../queries/recipes';

function Create() {
  const { data, loading, error } = useQuery(GET_RECIPES);
  const [createIngredient] = useMutation(CREATE_INGREDIENT);
  const [ingredientName, setIngredientName] = useState('');

  useEffect(() => {
    console.log('data', data);
    console.log('loading', loading);
    console.log('error', error);
  }, [data, loading, error]);

  const handleClick = () => {
    createIngredient({
      variables: { ingredient: { name: `${ingredientName}` } },
    });
  };

  return (
    <GlobalWrapper>
      <LinkButton
        to="/"
        text="Back to Home"
        Icon={<FontAwesomeIcon icon={faArrowLeft} />}
      />
      <Title>Add new Ingredient</Title>
      <Text css={{ marginTop: '30px' }}>Ingredient name:</Text>
      <Input
        value={ingredientName}
        onChange={(e) => setIngredientName(e.target.value)}
        css={{ marginTop: '15px' }}
      />
      <Button
        type="button"
        onClick={handleClick}
        disabled={!ingredientName.length}
        text="Add"
        css={{ marginTop: '30px' }}
      />
    </GlobalWrapper>
  );
}

export default Create;

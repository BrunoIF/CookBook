import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';

import { CREATE_INGREDIENT } from 'queries/ingredients';
import Input from 'components/Input';
import LinkButton from 'components/Buttons/LinkButton';
import Button from 'components/Buttons/Button';
import Loader from 'components/Loader';
import ProtectedRoute from 'components/ProtectedRoute';
import { Wrapper as GlobalWrapper, Title, Text, FlexRow } from 'styles/global';

function Create() {
  const [createIngredient, { data, loading, error, called }] = useMutation(
    CREATE_INGREDIENT,
  );
  const [ingredientName, setIngredientName] = useState('');

  const handleClick = () => {
    createIngredient({
      variables: { ingredient: { name: ingredientName } },
    });
  };

  useEffect(() => {
    if (called) {
      if (!error) {
        toast.success('Ingredient successfully created!', {
          css: { backgroundColor: 'green' },
        });
        setIngredientName('');
      } else {
        toast.error('Oops, something went wrong.');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return (
    <ProtectedRoute>
      <GlobalWrapper>
        <LinkButton
          to="/"
          text="Back to Home"
          Icon={<FontAwesomeIcon icon={faArrowLeft} />}
        />
        <Title>Add new Ingredient</Title>
        <Text>Ingredient name:</Text>
        <Input
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
        />
        <FlexRow>
          <Button
            type="button"
            onClick={handleClick}
            disabled={!ingredientName.length}
            text="Add"
            css={{ marginTop: '30px' }}
          />
          {loading && <Loader />}
        </FlexRow>
      </GlobalWrapper>
    </ProtectedRoute>
  );
}

export default Create;

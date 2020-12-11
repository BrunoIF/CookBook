import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { toast } from 'react-toastify';

import { CREATE_RECIPE } from 'queries/recipes';
import { GET_INGREDIENTS, GET_CREATED_INGREDIENT } from 'queries/ingredients';
import Input from 'components/Input';
import SelectList from 'components/SelectList';
import LinkButton from 'components/Buttons/LinkButton';
import Button from 'components/Buttons/Button';
import Loader from 'components/Loader';
import ProtectedRoute from 'components/ProtectedRoute';
import { Wrapper as GlobalWrapper, Title, Text, FlexRow } from 'styles/global';
import * as S from 'styles/recipes.styles';

function Create() {
  const [
    createRecipe,
    { data: recipeData, loading, error, called },
  ] = useMutation(CREATE_RECIPE);
  const { data: initialIngredients } = useQuery(GET_INGREDIENTS);
  const { data: createdIngredient } = useSubscription(GET_CREATED_INGREDIENT);
  const [recipeTitle, setRecipeTitle] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    if (initialIngredients) {
      const { ingredients: receivedIngredients } = initialIngredients;
      if (receivedIngredients) {
        setIngredients(receivedIngredients);
      }
    }
  }, [initialIngredients]);

  useEffect(() => {
    console.log('createdIngredient', createdIngredient);
    if (createdIngredient) {
      const { ingredientCreated } = createdIngredient;
      setIngredients((prevState) => [...prevState, ...ingredientCreated]);
    }
  }, [createdIngredient]);

  useEffect(() => {
    if (called) {
      if (!error) {
        toast.success('Recipe successfully created!', {
          css: { backgroundColor: 'green' },
        });
        setRecipeTitle('');
        setCookingTime('');
        setSelectedIngredients([]);
      } else {
        toast.error('Oops, something went wrong.');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeData]);

  const handleClick = () => {
    const ingredientIds = selectedIngredients.map((selIngr) =>
      parseInt(ingredients.find((ingr) => ingr.name === selIngr).id),
    );

    const recipe = {
      title: recipeTitle,
      cookingTime,
      ingredients: ingredientIds,
      image: 'https://picsum.photos/200/300',
    };

    createRecipe({ variables: { recipe } });
  };

  const handleChange = (value) => {
    if (value) {
      setSelectedIngredients((prevState) => [
        ...new Set([...prevState, value]),
      ]);
    }
  };

  const handleIngredientClick = (ingr) => {
    setSelectedIngredients(
      selectedIngredients.filter((selIngr) => selIngr !== ingr),
    );
  };

  return (
    <ProtectedRoute>
      <GlobalWrapper>
        <LinkButton
          to="/"
          text="Back to Home"
          Icon={<FontAwesomeIcon icon={faArrowLeft} />}
        />
        <Title>Create new recipe</Title>
        <S.Grid>
          <div>
            <Text>Recipe name:</Text>
            <Input
              value={recipeTitle}
              onChange={(e) => setRecipeTitle(e.target.value)}
            />
            <Text>Cooking time:</Text>
            <Input
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
            />
          </div>
          <div css={{ marginTop: 0 }}>
            <Text>Ingredients:</Text>
            <SelectList
              options={ingredients.map((ingr) => ingr.name)}
              placeholder="Choose an ingredient"
              onChange={handleChange}
            />

            <S.FlexRow>
              {selectedIngredients.map((ingr) => (
                <Button
                  onClick={() => handleIngredientClick(ingr)}
                  key={ingr}
                  text={ingr}
                  css={{ margin: '5px' }}
                />
              ))}
            </S.FlexRow>
          </div>
        </S.Grid>

        <FlexRow>
          <Button
            type="button"
            onClick={handleClick}
            text="Create recipe"
            css={{ marginTop: '30px' }}
          />
          {loading && <Loader css={{ marginTop: 0 }} />}
        </FlexRow>
      </GlobalWrapper>
    </ProtectedRoute>
  );
}

export default Create;

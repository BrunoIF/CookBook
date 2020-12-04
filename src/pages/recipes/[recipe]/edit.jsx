import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';

import { UPDATE_RECIPE, GET_RECIPE } from 'queries/recipes';
import { GET_INGREDIENTS } from 'queries/ingredients';
import Input from 'components/Input';
import SelectList from 'components/SelectList';
import LinkButton from 'components/Buttons/LinkButton';
import Button from 'components/Buttons/Button';
import Loader from 'components/Loader';
import { Wrapper as GlobalWrapper, Title, Text, FlexRow } from 'styles/global';
import * as S from '../styles';

function Edit({ recipeId }) {
  const [
    createRecipe,
    { data: recipeData, loading, error, called },
  ] = useMutation(UPDATE_RECIPE);
  const { data: ingredientData } = useQuery(GET_INGREDIENTS);
  const { data: receivedRecipeData } = useQuery(GET_RECIPE, {
    variables: { id: recipeId },
  });
  const [recipeTitle, setRecipeTitle] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    if (ingredientData) {
      console.log(ingredientData);
      const { ingredients: receivedIngredients } = ingredientData;
      if (receivedIngredients) {
        setIngredients(receivedIngredients);
      }
    }
  }, [ingredientData]);

  useEffect(() => {
    if (receivedRecipeData.recipe) {
      const { title, ingredients, cookingTime } = receivedRecipeData.recipe;
      setRecipeTitle(title);
      setCookingTime(cookingTime);
      setSelectedIngredients(ingredients.map((ingr) => ingr.name));
    }
  }, [receivedRecipeData]);

  useEffect(() => {
    if (called) {
      if (!error) {
        toast.success('Ingredient successfully updated!', {
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
  }, [recipeData, ingredientData]);

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
    <GlobalWrapper>
      <LinkButton
        to={`/recipes/${recipeId}`}
        text="Back to Recipe"
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
          text="Update recipe"
          css={{ marginTop: '30px' }}
        />
        {loading && <Loader css={{ marginTop: 0 }} />}
      </FlexRow>
    </GlobalWrapper>
  );
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  console.log(context);
  const {
    params: { recipe },
  } = context;

  return {
    props: {
      recipeId: recipe,
    },
  };
};

export default Edit;

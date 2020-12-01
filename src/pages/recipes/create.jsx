import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';

import { CREATE_RECIPE } from 'queries/recipes';
import Input from 'components/Input';
import SelectList from 'components/SelectList';
import LinkButton from 'components/Buttons/LinkButton';
import Button from 'components/Buttons/Button';
import { Wrapper as GlobalWrapper, Title, Text } from 'styles/global';
import * as S from './styles';

function Create({ ingredients }) {
  const [createRecipe] = useMutation(CREATE_RECIPE);
  const [recipeTitle, setRecipeTitle] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleClick = () => {
    const recipe = {
      title: recipeTitle,
      cookingTime,
      ingredients: selectedIngredients,
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
          <SelectList options={ingredients} onChange={handleChange} />

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

      <Button
        type="button"
        onClick={handleClick}
        text="Create recipe"
        css={{ marginTop: '30px' }}
      />
    </GlobalWrapper>
  );
}

export const getStaticProps = async () => {
  // Query to get ingredients and set them statically

  return {
    revalidate: 10,
    props: {
      ingredients: [
        'Choose ingredients',
        'Water',
        'Pineapple',
        'Sugar',
        'Frozen Water',
        'Strawberry',
        'Mango',
      ],
    },
  };
};

export default Create;

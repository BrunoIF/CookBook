import styled from 'styled-components';
import { rgba } from 'polished';
import colors from 'styles/variables/colors';

export const Grid = styled.div`
  display: grid;
  grid-auto-columns: 50%;
  grid-auto-flow: column;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
`;

export const Image = styled.img`
  width: 40%;
  border: 1px solid ${rgba(colors.black, 0.1)};
  max-height: 60vh;
`;

export const IngredientsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export const RecipeWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: space-between;
  width: 80%;
`;

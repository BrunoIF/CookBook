import styled from 'styled-components';

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

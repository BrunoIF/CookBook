import styled, { keyframes } from 'styled-components';

import { colors } from 'styles/variables';

const loaderSize = '25px';
const borderSize = '5px';

const spin = keyframes`
  0% {
    transform: rotate(0);
  }
  
  100% {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  width: ${loaderSize} + ${borderSize} * 2;
  height: ${loaderSize} + ${borderSize} * 2;
  position: relative;
  align-self: center;
  margin-left: 10px;
  animation: ${spin} 0.5s infinite linear;

  &::after {
    content: '';
    width: ${loaderSize};
    height: ${loaderSize};
    position: absolute;
    top: 0;
    left: 0;
    border: ${borderSize} solid transparent;
    border-top-color: ${colors.dark_gray};
    border-radius: 100%;
  }
`;

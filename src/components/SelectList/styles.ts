import styled, { keyframes, css } from 'styled-components';
import { darken, rgba } from 'polished';

import colors from 'styles/variables/colors';

const baseProperties = css`
  border-radius: 5px;
  background-color: ${colors.white};
  box-shadow: 2px 5px 10px -5px ${rgba(colors.black, 0.2)};
`;

export const Wrapper = styled.div`
  width: 200px;
  position: relative;
`;

const svgSize = '12px';
export const SelectedValue = styled.div`
  ${baseProperties}
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 20px;
  cursor: pointer;
  position: relative;
  user-select: none;

  svg {
    height: ${svgSize};
    width: ${svgSize};
    margin-left: 30px;
    position: absolute;
    right: 15px;
  }
`;

export const OptionsWrapper = styled.div`
  ${baseProperties}
  margin-top: 4px;
  z-index: 2;
  position: absolute;
  width: 100%;
  display: none;
  overflow: hidden;
  user-select: none;

  ${(props) =>
    props.open &&
    css`
      display: block;
      animation: ${slideDown} 0.2s forwards;
    `}
`;

export const Option = styled.div`
  padding: 12px 20px;
  cursor: pointer;

  &:hover {
    background-color: ${darken(0.2, colors.white)};
  }
`;

const resetButtonSize = '20px';
export const ResetButton = styled.div`
  height: ${resetButtonSize};
  width: ${resetButtonSize};
  border-radius: 100%;
  background-color: ${darken(0.15, colors.white)};
  position: absolute;
  left: -30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${colors.white};
`;

// :global(.dark) {
//   .selectedValue, .options {
//     background-color: $dark-mode-blue;
//     color: $white;
//   }

//   $lighten-dark-color: lighten($dark-mode-blue, 4%);

//   .option {
//     &:hover {
//       background-color: $lighten-dark-color;
//     }
//   }

//   .reset {
//     background-color: $lighten-dark-color;
//   }
// }

const slideDown = keyframes`
  0% {
    margin-top: -10px;
    opacity: 0;
  }

  100% {
    margin-top: 4px;
    opacity: 1;
  }
`;

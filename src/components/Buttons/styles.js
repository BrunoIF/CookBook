import styled, { css } from 'styled-components';
import { darken } from 'polished';

import colors from 'styles/variables/colors';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Button = styled.button`
  padding: 12px 40px;
  border-radius: 5px;
  box-shadow: 0 0 6px -2px ${colors.black};
  background-color: ${colors.white};
  border: 0;
  cursor: pointer;
  display: flex;
  align-content: center;

  ${(props) =>
    props.disabled
      ? css`
          background-color: ${darken(0.2, colors.white)};
          cursor: auto;

          &:hover {
          }
        `
      : css`
          &:hover {
            transform: scale(1.02);
            transition: 0.4s;
          }
        `}
`;

export const Icon = styled.span`
  margin-right: 15px;

  svg {
    width: 15px;
    height: 15px;
  }
`;

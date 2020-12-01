import styled from 'styled-components';
import { rgba } from 'polished';

import colors from 'styles/variables/colors';
import sizes from 'styles/variables/sizes';

export const Wrapper = styled.div`
  box-shadow: 2px 5px 10px -5px ${rgba(colors.black, 0.2)};
  width: 500px;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  background-color: ${colors.white};

  input {
    font-family: 'Nunito Light';
    font-size: ${sizes.font_size_home};
    padding: 20px;
    padding-left: 10px;
    border: 0;
    width: 100%;
    background-color: transparent;

    &,
    &::placeholder {
      color: ${colors.dark_gray};
    }

    &:focus {
      outline: 1px solid ${colors.dark_gray};
    }
  }
`;

// export const Input = styled.input`
//   font-family: 'Nunito Light';
//   font-size: ${sizes.font_size_home};
//   padding: 20px;
//   padding-left: 10px;
//   border: 0;
//   width: 100%;
//   background-color: transparent;

//   &,
//   &::placeholder {
//     color: ${colors.dark_gray};
//   }

//   &:focus {
//     outline: 1px solid ${colors.dark_gray};
//   }
// `;

export const Icon = styled.span`
  padding: 0 15px 0 35px;
  color: ${colors.dark_gray};

  svg {
    fill: ${colors.dark_gray};
  }
`;

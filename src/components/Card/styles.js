import styled from 'styled-components';
import { rgba } from 'polished';

import colors from 'styles/variables/colors';

export const Wrapper = styled.div`
  width: 15%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 5px 10px 20px -5px ${rgba(colors.black, 0.2)};
  cursor: pointer;
  margin: 35px;
  background-color: ${colors.white};

  &:hover {
    transform: scale(1.02);
    transition: 0.4s;
  }
`;

export const Content = styled.div`
  padding: 25px 25px 30px;
  border-top: 1px solid rgba(${colors.black}, 0.07);
`;

export const Title = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
  font-family: 'Nunito ExtraBold';
`;

export const Flag = styled.div`
  min-height: 160px;
  background-size: cover;
  background-position: center;
`;

// .text {
//   font-size: $font-size-home;
//   margin: 10px 0;
// }

// :global(.dark) {
//   .container {
//     background-color: $dark-mode-blue;
//   }
// }

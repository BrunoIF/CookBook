import styled, { createGlobalStyle, css } from 'styled-components';

import { colors } from './variables';

export const MarginsCompact = css`
  & * + * {
    margin-top: 0.75em;
  }
`;

export const MarginsOff = css`
  & * + * {
    margin-top: 0;
  }
`;

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  * + * {
    margin-top: 1.5em;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 0;
    background-color: ${colors.background_light};
  }
`;

export const Wrapper = styled.div`
  min-height: 100vh;
  padding: 0 80px;
  padding-top: 120px;
`;

export const Title = styled.h1`
  margin-top: 30px;

  ${(props) =>
    props.center &&
    css`
      text-align: center;
    `}

  ${(props) =>
    props.large &&
    css`
      font-size: 34px;
    `}
`;

export const Text = styled.p`
  font-size: 16px;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-content: center;
`;

export default GlobalStyles;

import styled from 'styled-components';

import { colors } from 'styles/variables';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  padding: 25px 120px;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px -6px 12px ${colors.black};
  background-color: ${colors.white};
  position: fixed;
  top: 0;
  z-index: 2;
`;

export const Logout = styled.button`
  font-size: 16px;
  margin-top: 0;
  background-color: transparent;
  cursor: pointer;
  border: 0;

  &:hover {
    color: ${colors.dark_gray};
  }
`;

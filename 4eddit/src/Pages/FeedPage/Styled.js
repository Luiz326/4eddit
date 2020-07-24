import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-auto-rows: auto;
  gap: 8px;
  margin: 32px;
  min-height: auto;
  overflow: auto;
  cursor: pointer;
`;

export const LogoutContainer = styled.div`
  position: fixed;
  top: 32px;
  left: 32px;
`;

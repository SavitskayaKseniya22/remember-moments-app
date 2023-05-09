import styled from "styled-components";
import Button from "../components/Button";

export const StyledBasicButton = styled(Button)`
  background: transparent;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledRedButton = styled(StyledBasicButton)`
  color: #fd6e09;
`;
export const StyledRedOutlineButton = styled(StyledBasicButton)`
  border: 1px solid #fd6e09;
`;

export const BackButton = styled(StyledRedButton)`
  position: fixed;
  bottom: 3rem;
  right: 3rem;
`;

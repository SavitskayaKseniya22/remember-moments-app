import React from "react";
import styled from "styled-components";
import { XCircle } from "@styled-icons/boxicons-regular";
import { StyledRedButton } from "../styledComponents/StyledButton";

export const StyledWidget = styled("div")`
  background: white;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 1rem;
  width: 200px;
  height: 200px;
  flex-direction: column;
`;

export function Widget() {
  return (
    <StyledWidget>
      <StyledRedButton handleClick={() => {}}>
        <XCircle title="Close" size="36" />
      </StyledRedButton>
    </StyledWidget>
  );
}

export default Widget;

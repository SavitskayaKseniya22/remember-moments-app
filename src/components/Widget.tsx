import React from "react";
import styled from "styled-components";
import { XCircle } from "@styled-icons/boxicons-regular";
import { StyledBasicButton } from "../styledComponents/SharedStyles";

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
      <StyledBasicButton $view="full" onClick={() => {}}>
        <XCircle title="Close" size="36" />
      </StyledBasicButton>
    </StyledWidget>
  );
}

export default Widget;

import React from "react";
import styled from "styled-components";
import { XCircle } from "@styled-icons/boxicons-regular";
import Button from "./Button";

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
      <Button view="full" handleClick={() => {}}>
        <XCircle title="Close" size="36" />
      </Button>
    </StyledWidget>
  );
}

export default Widget;

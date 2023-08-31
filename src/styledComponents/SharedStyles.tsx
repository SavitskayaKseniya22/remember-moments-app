import styled, { css } from "styled-components";

export const styledCentredFlexbox = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledListOfItems = styled("ul")`
  ${styledCentredFlexbox}

  gap: 1rem;
  padding: 2rem;
  flex-wrap: nowrap;
`;

export const StyledMain = styled("main")`
  display: flex;
  flex-grow: 2;
  position: relative;
  min-width: 1024px;
  max-width: 1280px;
  margin: 0 auto;
`;

export const StyledMainCentred = styled(StyledMain)`
  ${styledCentredFlexbox}
  gap: 2rem;
`;

export const StyledMainCentredColumn = styled(StyledMainCentred)`
  flex-direction: column;
`;

export const styledBlock = css`
  border-radius: 0.5rem;
  background-color: white;
  border: 2px solid rgb(245, 249, 255);
`;

export const StyledLikeButton = css<{
  $view: "full" | "outline" | "transparent";
}>`
  ${styledCentredFlexbox}
  padding: 0.5rem 3rem;
  cursor: pointer;
  border-radius: 0.5rem;
  background: ${(props) => (props.$view === "full" ? "#fd6e09" : "white")};
  color: ${(props) => (props.$view === "full" ? "white" : "#fd6e09")};
  border: ${(props) =>
    props.$view === "outline" ? "1px solid #fd6e09" : "none"};
  &:disabled {
    pointer-events: none;
    color: gray;
    border-color: gray;
  }
`;

export const StyledBasicButton = styled("button")<{
  $view: "full" | "outline" | "transparent";
}>`
  ${StyledLikeButton}
`;

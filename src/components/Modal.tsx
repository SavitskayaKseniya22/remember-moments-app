import { XCircle } from "@styled-icons/boxicons-regular";
import React from "react";
import styled from "styled-components";
import { StyledBasicButton } from "../styledComponents/SharedStyles";

export const StyledModal = styled("div")`
  padding: 1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  background-color: white;
`;

export const StyledSolidBackground = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

function Modal({
  children,
  isOpen,
  closeModal,
}: {
  children: JSX.Element[] | JSX.Element | undefined;
  isOpen: boolean;
  closeModal: () => void;
}) {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isOpen && (
        <StyledSolidBackground
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <StyledModal>
            <StyledBasicButton
              $view="outline"
              onClick={() => {
                closeModal();
              }}
            >
              <XCircle title="Close" size="36" />
            </StyledBasicButton>

            {children}
          </StyledModal>
        </StyledSolidBackground>
      )}
    </>
  );
}

export default Modal;

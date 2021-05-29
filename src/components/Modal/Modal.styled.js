import styled from "styled-components";
import ReactModal from "react-modal";

export const StyledModal = styled(ReactModal).attrs({
  modalClassName: "modal",
})`
  &.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 24px;
    outline: 0;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    box-shadow: none;
    margin: 30px auto 0 auto;
    width: 100%;
    max-width: 450px;
    max-height: 600px;
    min-height: 50px;
    overflow-y:visible;
    background: ${({ theme }) => theme.colors.gray};
    z-index: 9;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;
  border: 0;
  cursor: pointer;
  background: transparent;
  width: 20px;
  height: 20px;
  z-index: 9;
  padding: 0 0px 4px 0;
  transition: opacity ease-in-out 0.15s;

  &:hover,
  &:disabled,
  &:focus,
  &:active,
  &:hover:disabled {
    opacity: 0.6;
    outline: none;
  }
`;

export const ModalBody = styled.div`
  position: relative;
  padding: 48px 24px 24px;
  overflow: auto;
`;

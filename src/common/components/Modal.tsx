import React from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.45);

  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  show: boolean;
  onOutClick?(): void;
}

export default function Modal(props: Props) {
  const { show, onOutClick, children } = props;

  if (!show) {
    return null;
  }

  return (
    <ModalWrapper>
      <ModalContent>{children}</ModalContent>
      <ModalBackground onClick={onOutClick} />
    </ModalWrapper>
  );
}

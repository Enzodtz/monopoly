import React from "react";
import styled from "styled-components";
import { Token } from "../types/token";

const StyledPlayer = styled.div`
  position: absolute;
  z-index: 100;
`;

const PlayerImg = styled.img<Props>`
  width: ${(props) => props.token.width}px;
`;

interface Props {
  token: Token;
}

export default function TokenComponent({ token }: Props) {
  return (
    <StyledPlayer>
      <PlayerImg token={token} src={token.image} />
    </StyledPlayer>
  );
}

import {
  GO_ARROW_OFFSET,
  GO_ARROW_SPACING_HORIZONTAL,
  SALARY_MONEY,
} from "@/common/data/constants";
import { GoTile } from "@/common/types/tyles";
import React from "react";
import styled from "styled-components";
import arrowImage from "@/common/static/arrow.png";

export interface GoTileProps {
  tile: GoTile;
  position: number;
  positionInSide: number;
  side: number;
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const TextWrapper = styled.span`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transform: rotate(-45deg);
  position: relative;
  left: -${GO_ARROW_OFFSET}px;
  top: ${GO_ARROW_OFFSET}px;
`;

const CollectText = styled.div`
  font-size: 8px;
`;

const GoText = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const ArrowWrapper = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: ${GO_ARROW_SPACING_HORIZONTAL}px;
  padding-right: ${GO_ARROW_SPACING_HORIZONTAL}px;
  box-sizing: border-box;
`;

const Arrow = styled.img`
  width: 100%;
`;

export default function GoTileComponent(props: GoTileProps) {
  return (
    <Wrapper>
      <TextWrapper>
        <CollectText>
          COLLECT
          <br />${SALARY_MONEY} SALARY
          <br />
          AS YOU PASS
        </CollectText>
        <GoText>GO</GoText>
      </TextWrapper>
      <ArrowWrapper>
        <Arrow src={arrowImage} />
      </ArrowWrapper>
    </Wrapper>
  );
}

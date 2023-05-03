import { IncomeTaxTile } from "@/common/types/tyles";
import styled from "styled-components";
import {
  COMMUNITY_CHEST_TEXT_SIZE,
  COMMUNITY_CHEST_TILE_PADDING,
  INCOME_TAX_SQUARE_BORDER_SIZE,
  INCOME_TAX_SQUARE_COLOR,
  INCOME_TAX_SQUARE_MARGIN,
  INCOME_TAX_SQUARE_SIZE,
  INCOME_TAX_VALUE,
} from "@/common/data/constants";

export interface IncomeTaxTileProps {
  tile: IncomeTaxTile;
  position: number;
  positionInSide: number;
  side: number;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: ${COMMUNITY_CHEST_TILE_PADDING}px;
  font-size: ${COMMUNITY_CHEST_TEXT_SIZE}px;
  box-sizing: border-box;
`;

const BiggerSquare = styled.div`
  border: solid ${INCOME_TAX_SQUARE_BORDER_SIZE}px ${INCOME_TAX_SQUARE_COLOR};
  transform: rotate(45deg);
`;

const SmallerSquare = styled.div`
  margin: ${INCOME_TAX_SQUARE_MARGIN}px;
  padding: ${INCOME_TAX_SQUARE_SIZE}px;
  background-color: ${INCOME_TAX_SQUARE_COLOR};
`;

export default function IncomeTaxTileComponent(props: IncomeTaxTileProps) {
  return (
    <Wrapper>
      <span>Income Tax</span>
      <BiggerSquare>
        <SmallerSquare />
      </BiggerSquare>
      <span>Pay ${INCOME_TAX_VALUE}</span>
    </Wrapper>
  );
}

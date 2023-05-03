import { LuxuryTaxTile } from "@/common/types/tyles";
import styled from "styled-components";
import {
  LUXURY_TAX_IMAGE_WIDTH,
  LUXURY_TAX_PADDING,
  LUXURY_TAX_TEXT_SIZE,
  LUXURY_TAX_VALUE,
} from "@/common/data/constants";
import luxuryTaxImage from "@/common/static/luxury_tax.png";

export interface LuxuryTaxTileProps {
  tile: LuxuryTaxTile;
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
  padding: ${LUXURY_TAX_PADDING}px;
  font-size: ${LUXURY_TAX_TEXT_SIZE}px;
  box-sizing: border-box;
`;

const Text = styled.div`
  text-align: center;
`;

const Ring = styled.img`
  width: ${LUXURY_TAX_IMAGE_WIDTH}px;
`;

export default function LuxuryTaxTileComponent(props: LuxuryTaxTileProps) {
  return (
    <Wrapper>
      <Text>Luxury Tax</Text>
      <Ring src={luxuryTaxImage} />
      <Text>${LUXURY_TAX_VALUE}</Text>
    </Wrapper>
  );
}

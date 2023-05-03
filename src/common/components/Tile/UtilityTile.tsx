import { UtilityTile } from "@/common/types/tyles";
import styled from "styled-components";
import {
  UTILITY_IMAGE_WIDTH,
  UTILITY_PADDING,
  UTILITY_TEXT_SIZE,
} from "@/common/data/constants";

export interface UtilityTileProps {
  tile: UtilityTile;
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
  padding: ${UTILITY_PADDING}px;
  font-size: ${UTILITY_TEXT_SIZE}px;
  box-sizing: border-box;
`;

const Text = styled.div`
  text-align: center;
`;

const Image = styled.img`
  width: ${UTILITY_IMAGE_WIDTH}px;
`;

export default function UtilityTileComponent(props: UtilityTileProps) {
  const { tile } = props;

  return (
    <Wrapper>
      <Text>{tile.name}</Text>
      <Image src={tile.image} />
      <Text>${tile.cost}</Text>
    </Wrapper>
  );
}

import { RailroadTile } from "@/common/types/tyles";
import styled from "styled-components";
import {
  COMMUNITY_CHEST_IMAGE_WIDTH,
  COMMUNITY_CHEST_TEXT_SIZE,
  COMMUNITY_CHEST_TILE_PADDING,
  RAILROAD_IMAGE_WIDTH,
  RAILROAD_PADDING,
  RAILROAD_TEXT_SIZE,
} from "@/common/data/constants";
import railroadImage from "@/common/static/railroad.png";

export interface RailroadTileProps {
  tile: RailroadTile;
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
  padding: ${RAILROAD_PADDING}px;
  font-size: ${RAILROAD_TEXT_SIZE}px;
  box-sizing: border-box;
`;

const Text = styled.div`
  text-align: center;
`;

const Train = styled.img`
  width: ${RAILROAD_IMAGE_WIDTH}px;
`;

export default function RailroadTileComponent(props: RailroadTileProps) {
  const { tile } = props;

  return (
    <Wrapper>
      <Text>{tile.name}</Text>
      <Train src={railroadImage} />
      <Text>${tile.cost}</Text>
    </Wrapper>
  );
}

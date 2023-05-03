import { CommunityChestTile } from "@/common/types/tyles";
import styled from "styled-components";
import {
  COMMUNITY_CHEST_IMAGE_WIDTH,
  COMMUNITY_CHEST_TEXT_SIZE,
  COMMUNITY_CHEST_TILE_PADDING,
} from "@/common/data/constants";
import communityChestImage from "@/common/static/community_chest.png";

export interface CommunityChestTileProps {
  tile: CommunityChestTile;
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

const Text = styled.div`
  text-align: center;
`;

const Chest = styled.img`
  width: ${COMMUNITY_CHEST_IMAGE_WIDTH}px;
`;

export default function CommunityChestTileComponent(
  props: CommunityChestTileProps
) {
  return (
    <Wrapper>
      <Text>
        Community
        <br />
        Chest
      </Text>
      <Chest src={communityChestImage} />
    </Wrapper>
  );
}

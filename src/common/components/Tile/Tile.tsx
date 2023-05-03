import styled from "styled-components";
import { Tile, TileTypes } from "@/common/types/tyles";
import {
  BORDER_COLOR,
  BORDER_SIZE,
  TILE_HEIGHT,
  TILE_WIDTH,
} from "@/common/data/constants";
import { useAppSelector } from "@/app/hooks";
import { selectPlayers, selectTiles } from "@/features/game/slice/gameSlice";
import PropertyTileComponent, { PropertyTileProps } from "./PropertyTile";
import GoTileComponent, { GoTileProps } from "./GoTile";
import FreeParkingTileComponent, {
  FreeParkingTileProps,
} from "./FreeParkingTile";
import GoToJailTileComponent, { GoToJailTileProps } from "./GoToJailTile";
import JailTileComponent, { JailTileProps } from "./JailTile";
import CommunityChestTileComponent, {
  CommunityChestTileProps,
} from "./CommunityChestTile";
import IncomeTaxTileComponent, { IncomeTaxTileProps } from "./IncomeTaxTile";
import RailroadTileComponent, { RailroadTileProps } from "./RailroadTile";
import ChanceTileComponent, { ChanceTileProps } from "./ChanceTile";
import UtilityTileComponent, { UtilityTileProps } from "./UtilityTile";
import LuxuryTaxTileComponent, { LuxuryTaxTileProps } from "./LuxuryTaxTile";
import Player from "../Token";
import { TOKENS } from "@/common/data/tokens";
import TokenComponent from "../Token";

function shouldRenderLeftBorder(props: Props) {
  const isLastPositionInSide = props.positionInSide == props.splitSize! - 1;

  if (isLastPositionInSide) {
    return 0;
  }

  return BORDER_SIZE;
}

function shouldRenderRightBorder(props: Props) {
  const isFirstPositionInSide = props.positionInSide == 0;

  if (isFirstPositionInSide) {
    return BORDER_SIZE;
  }

  return 0;
}

function shouldBeSquare(props: Props) {
  const isFirstPositionInSide = props.positionInSide == 0;
  if (isFirstPositionInSide) {
    return TILE_HEIGHT;
  }

  return TILE_WIDTH;
}

function shouldBeMirrored(props: Props) {
  const isFirstSide = props.side == 0;

  if (isFirstSide) {
    return -1;
  }

  return 1;
}

const BaseTile = styled.span<Props>`
  display: inline-flex;
  flex-direction: column;
  height: ${TILE_HEIGHT}px;
  width: ${(props) => shouldBeSquare(props)}px;
  box-sizing: border-box;
  border-top: ${BORDER_SIZE}px solid ${BORDER_COLOR};
  border-bottom: ${BORDER_SIZE}px solid ${BORDER_COLOR};
  border-left: ${(props) => shouldRenderLeftBorder(props)}px solid
    ${BORDER_COLOR};
  border-right: ${(props) => shouldRenderRightBorder(props)}px solid
    ${BORDER_COLOR};
  transform: scale(${(props) => shouldBeMirrored(props)}, 1);
  position: relative;
`;

interface Props {
  tile: Tile;
  position: number;
  positionInSide: number;
  side: number;
  splitSize?: number;
}

export default function TileComponent(props: Props) {
  const players = useAppSelector(selectPlayers);
  const tiles = useAppSelector(selectTiles);

  const splitSize = tiles.length / 4;
  const { tile, position } = props;

  function selectTileComponent() {
    switch (tile.type) {
      case TileTypes.PROPERTY:
        return <PropertyTileComponent {...(props as PropertyTileProps)} />;
      case TileTypes.GO:
        return <GoTileComponent {...(props as GoTileProps)} />;
      case TileTypes.FREE_PARKING:
        return (
          <FreeParkingTileComponent {...(props as FreeParkingTileProps)} />
        );
      case TileTypes.GO_TO_JAIL:
        return <GoToJailTileComponent {...(props as GoToJailTileProps)} />;
      case TileTypes.JAIL:
        return <JailTileComponent {...(props as JailTileProps)} />;
      case TileTypes.INCOME_TAX:
        return <IncomeTaxTileComponent {...(props as IncomeTaxTileProps)} />;
      case TileTypes.RAILROAD:
        return <RailroadTileComponent {...(props as RailroadTileProps)} />;
      case TileTypes.CHANCE:
        return <ChanceTileComponent {...(props as ChanceTileProps)} />;
      case TileTypes.UTILITY:
        return <UtilityTileComponent {...(props as UtilityTileProps)} />;
      case TileTypes.LUXURY_TAX:
        return <LuxuryTaxTileComponent {...(props as LuxuryTaxTileProps)} />;
      case TileTypes.COMMUNITY_CHEST:
        return (
          <CommunityChestTileComponent
            {...(props as CommunityChestTileProps)}
          />
        );
      default:
        return null;
    }
  }

  return (
    <BaseTile {...props} splitSize={splitSize}>
      {selectTileComponent()}
      {players.map((player) => {
        return (
          player.position == position && <TokenComponent token={TOKENS[0]} />
        );
      })}
    </BaseTile>
  );
}

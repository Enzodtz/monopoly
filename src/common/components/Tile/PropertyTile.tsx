import React from "react";
import styled from "styled-components";
import {
  BORDER_COLOR,
  BORDER_SIZE,
  COLOR_GROUP_HEIGHT,
  HOTEL_IMG_OFFSET,
  HOTEL_IMG_WIDTH,
  HOUSE_IMG_OFFSET,
  HOUSE_IMG_WIDTH,
  TILE_HEIGHT,
  TILE_TEXT_FONT,
  TILE_TEXT_PADDING,
  TILE_WIDTH,
} from "@/common/data/constants";
import { PropertyTile } from "@/common/types/tyles";
import houseImg from "@/common/static/house.png";
import hotelImg from "@/common/static/hotel.png";

const ColorGroupIndicator = styled.div<PropertyTileProps>`
  background-color: ${(props) => props.tile.color};
  height: ${COLOR_GROUP_HEIGHT}px;
  border-bottom: solid ${BORDER_SIZE}px black;
  width: 100%;
  display: inline-block;
  box-sizing: border-box;
`;

const TileText = styled.div`
  flex: 1 1 auto;
  width: 100%;

  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  padding: ${TILE_TEXT_PADDING}px;
  box-sizing: border-box;
  font-size: ${TILE_TEXT_FONT}px;
`;

const HouseWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: ${COLOR_GROUP_HEIGHT}px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const House = styled.img`
  width: ${HOUSE_IMG_WIDTH}px;
  position: relative;
  top: ${HOUSE_IMG_OFFSET}px;
`;

const Hotel = styled.img`
  width: ${HOTEL_IMG_WIDTH}px;
  position: relative;
  top: ${HOTEL_IMG_OFFSET}px;
`;

export interface PropertyTileProps {
  tile: PropertyTile;
  position: number;
  positionInSide: number;
  side: number;
}

export default function PropertyTileComponent(props: PropertyTileProps) {
  const { tile } = props;

  function renderHouses(tile: PropertyTile) {
    if (tile.hasHotel) {
      return <Hotel src={hotelImg} />;
    }

    return [...Array(tile.houses)].map(() => <House src={houseImg} />);
  }

  return (
    <>
      <ColorGroupIndicator {...props} />
      <TileText>
        <span>{tile.name}</span>
        <span>${tile.cost}</span>
      </TileText>
      <HouseWrapper>{renderHouses(tile)}</HouseWrapper>
    </>
  );
}

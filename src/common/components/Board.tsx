import React from "react";
import styled from "styled-components";
import Tile from "./Tile/Tile";
import BoardSide from "./BoardSide";
import { BOARD_COLOR, TILE_HEIGHT, TILE_WIDTH } from "@/common/data/constants";
import Modal from "./Modal";
import { useAppSelector } from "@/app/hooks";
import { selectTiles } from "@/features/game/slice/gameSlice";

const StyledBoard = styled.div<Props>`
  position: relative;
  display: inline-block;
  height: ${(props) => props.boardSize}px;
  width: ${(props) => props.boardSize}px;
  background-color: ${BOARD_COLOR};
  transform: rotate(180deg);
`;

const BoardText = styled.span<Props>`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 1;
  width: min-content;
  height: min-content;
  transform: rotate(135deg);
  font-size: 45px;
  /* font-family: Arial; */
  font-weight: 600;
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  boardSize?: number;
}

export default function Board(props: Props) {
  const tiles = useAppSelector(selectTiles);

  const splitSize = tiles.length / 4;
  const boardSize = TILE_WIDTH * (splitSize - 1) + TILE_HEIGHT * 2;

  return (
    <StyledBoard boardSize={boardSize}>
      <BoardText>MONOPOLY</BoardText>
      {/* We iterate through each of the sides in order to style them */}
      {[...Array(4)].map((_, side) => (
        <BoardSide key={side} side={side}>
          {/* Then we iterate through each of the tiles of the side */}
          {tiles
            .slice(side * splitSize, (side + 1) * splitSize)
            .map((tile: any, positionInSide: number) => {
              // And get the index of the tile in the board
              const position = splitSize * side + positionInSide;
              return (
                <Tile
                  key={position}
                  position={position}
                  tile={tile}
                  side={side}
                  positionInSide={positionInSide}
                />
              );
            })}
        </BoardSide>
      ))}
    </StyledBoard>
  );
}

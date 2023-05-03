import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { Player } from "@/common/types/player";
import { BuyableTile, PropertyTile, TileTypes } from "@/common/types/tyles";
import { canBuyHouses } from "@/common/types/utils/canBuyHouses";
import {
  buyHouse,
  selectPlayers,
  selectTiles,
} from "@/features/game/slice/gameSlice";
import React from "react";

interface Props {
  property: number;
  player: Player;
  playerIndex: number;
}

export default function PropertyComponent({
  property,
  player,
  playerIndex,
}: Props) {
  const turn = useAppSelector((state: RootState) => state.game.playerTurn);
  const tiles = useAppSelector(selectTiles);
  const dispatch = useAppDispatch();
  const tile = tiles[property] as BuyableTile;

  function showHouses(tile: BuyableTile) {
    if (tile.type == TileTypes.PROPERTY) {
      if (tile.hasHotel) {
        return "Hotel";
      }
      return `${tile.houses} Houses`;
    }

    return null;
  }

  return (
    <div>
      {(tiles[property] as BuyableTile).name}
      &nbsp; [{showHouses(tile)}]
      {playerIndex == turn &&
        canBuyHouses(player, tiles[property], property) && (
          <button onClick={() => dispatch(buyHouse(property))}>
            Buy{" "}
            {(tiles[property] as PropertyTile).houses < 4 ? "Houses" : "Hotel"}
          </button>
        )}
    </div>
  );
}

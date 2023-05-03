import { BuyableTile, Tile, TileTypes } from "@/common/types/tyles";
import { Player } from "../player";

export function isBuyable(
  players: Player[],
  turn: number,
  tile: Tile,
  tilePosition: number
) {
  if (
    ![TileTypes.PROPERTY, TileTypes.UTILITY, TileTypes.RAILROAD].includes(
      tile.type
    )
  ) {
    return false;
  }

  const isOwned = players.find((player) => {
    if (player.properties.includes(tilePosition)) {
      return true;
    }
  });
  if (isOwned) {
    return false;
  }

  if (players[turn].money < (tile as BuyableTile).cost) {
    return false;
  }

  return true;
}

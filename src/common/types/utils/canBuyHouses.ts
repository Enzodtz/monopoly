import { Player } from "../player";
import { PropertyTile, Tile, TileTypes } from "../tyles";

export function canBuyHouses(player: Player, tile: Tile, tilePosition: number) {
  if (tile.type != TileTypes.PROPERTY) {
    return false;
  }

  if (!player.properties.includes(tilePosition)) {
    return false;
  }

  if (player.money < tile.houseCost) {
    return false;
  }

  if (tile.hasHotel) {
    return false;
  }

  return true;
}

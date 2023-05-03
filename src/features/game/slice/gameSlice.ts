import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";
import { TILES } from "@/common/data/tiles";
import { Player } from "@/common/types/player";
import {
  COST_TO_EXIT_JAIL,
  INCOME_TAX_VALUE,
  INITIAL_MONEY,
  LUXURY_TAX_VALUE,
  SALARY_MONEY,
} from "@/common/data/constants";
import { TOKENS } from "@/common/data/tokens";
import {
  BuyableTile,
  PropertyTile,
  Tile,
  TileTypes,
  UtilityTile,
} from "@/common/types/tyles";
import { DiceRoll } from "@/common/types/diceRoll";

interface GameState {
  isRollingDice: boolean;
  players: Player[];
  playerTurn: number;
  tiles: Tile[];
}

const initialState: GameState = {
  isRollingDice: false,
  playerTurn: 0,
  players: [
    {
      position: 0,
      money: INITIAL_MONEY,
      properties: [],
      token: TOKENS[0],
      isInJail: false,
      turnsInJail: 0,
    },
    {
      position: 0,
      money: INITIAL_MONEY,
      properties: [12, 28],
      token: TOKENS[0],
      isInJail: false,
      turnsInJail: 0,
    },
  ],
  tiles: TILES,
};

function _incrementPlayerPosition(state: GameState, value: number) {
  const playerWithActiveTurn = _playerWithActiveTurn(state);
  const availableTilesToWalk =
    state.tiles.length - playerWithActiveTurn.position - 1;
  if (value <= availableTilesToWalk) {
    playerWithActiveTurn.position += value;
  } else {
    playerWithActiveTurn.position = value - availableTilesToWalk - 1;
  }
}

function _getCurrentTileOwner(state: GameState): Player | undefined {
  return state.players.find((player) => {
    if (player.properties.includes(state.players[state.playerTurn].position)) {
      return true;
    }
  });
}

function _isSiteDoubled(
  state: GameState,
  tile: PropertyTile,
  owner: Player
): boolean {
  let siteDoubled = true;
  state.tiles.forEach((_tile, index) => {
    if (_tile.type == TileTypes.PROPERTY) {
      if (_tile.color == tile.color && !owner.properties.includes(index)) {
        siteDoubled = false;
      }
    }
  });
  return siteDoubled;
}

function _getPropertyCost(
  state: GameState,
  tile: PropertyTile,
  owner: Player
): number {
  // if no house must check doubled site
  if (tile.houses == 0) {
    const siteDoubled = _isSiteDoubled(state, tile, owner);
    return tile.rent[0] * (1 + Number(siteDoubled));
  }

  // if hotel
  if (tile.hasHotel) {
    return tile.rent[5];
  }

  // if only houses, return its value
  return tile.rent[tile.houses];
}

function _getUtilityCost(
  state: GameState,
  tile: UtilityTile,
  owner: Player,
  diceSum: number
): number {
  let utilitiesOwn = 0;
  owner.properties.forEach((property) => {
    if (state.tiles[property].type == TileTypes.UTILITY) {
      utilitiesOwn += 1;
    }
  });

  // - 1 because index starts at 0 and count in 1
  return tile.multipliers[utilitiesOwn - 1] * diceSum;
}

function _getRailroadCost(state: GameState, owner: Player): number {
  let railroadsOwn = 0;
  owner.properties.forEach((property) => {
    if (state.tiles[property].type == TileTypes.RAILROAD) {
      railroadsOwn += 1;
    }
  });

  return 25 * 2 ** railroadsOwn;
}

function _findJailTile(state: GameState) {
  return state.tiles.findIndex((tile) => tile.type == TileTypes.JAIL);
}

function _processNewPosition(state: GameState, diceSum: number) {
  const playerWithActiveTurn = _playerWithActiveTurn(state);
  const tile = state.tiles[playerWithActiveTurn.position];
  console.log("implement turn pass");
  switch (tile.type) {
    case TileTypes.PROPERTY:
      const propertyOwner = _getCurrentTileOwner(state);
      if (propertyOwner && propertyOwner != playerWithActiveTurn) {
        const cost = _getPropertyCost(state, tile, propertyOwner);
        console.log("implement if not able to pay cost");
        playerWithActiveTurn.money -= cost;
        propertyOwner.money += cost;
      }
      break;
    case TileTypes.GO:
      playerWithActiveTurn.money += SALARY_MONEY;
      break;
    case TileTypes.FREE_PARKING:
      break;
    case TileTypes.GO_TO_JAIL:
      playerWithActiveTurn.position = _findJailTile(state);
      playerWithActiveTurn.isInJail = true;
      break;
    case TileTypes.JAIL:
      break;
    case TileTypes.INCOME_TAX:
      playerWithActiveTurn.money -= INCOME_TAX_VALUE;
      console.log("implement if not able to pay cost");
      break;
    case TileTypes.RAILROAD:
      const railroadOwner = _getCurrentTileOwner(state);
      if (railroadOwner && railroadOwner != playerWithActiveTurn) {
        const cost = _getRailroadCost(state, railroadOwner);
        console.log("implement if not able to pay cost");
        playerWithActiveTurn.money -= cost;
        railroadOwner.money += cost;
      }
      break;
    case TileTypes.CHANCE:
      console.log("chance");
      break;
    case TileTypes.UTILITY:
      const utilityOwner = _getCurrentTileOwner(state);
      if (utilityOwner && utilityOwner != playerWithActiveTurn) {
        const cost = _getUtilityCost(state, tile, utilityOwner, diceSum);
        console.log("implement if not able to pay cost");
        playerWithActiveTurn.money -= cost;
        utilityOwner.money += cost;
      }
      break;
    case TileTypes.LUXURY_TAX:
      playerWithActiveTurn.money -= LUXURY_TAX_VALUE;
      console.log("implement if not able to pay cost");
      break;
    case TileTypes.COMMUNITY_CHEST:
      console.log("community chest");
      break;
    default:
      break;
  }
}

function _processInJail(state: GameState, diceRoll: DiceRoll) {
  const playerWithActiveTurn = _playerWithActiveTurn(state);
  if (playerWithActiveTurn.isInJail) {
    if (diceRoll[0] == diceRoll[1] || playerWithActiveTurn.turnsInJail == 3) {
      playerWithActiveTurn.isInJail = false;
      playerWithActiveTurn.turnsInJail = 0;
    } else {
      playerWithActiveTurn.turnsInJail += 1;
    }
  }
}

function _playerWithActiveTurn(state: GameState) {
  return state.players[state.playerTurn];
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    incrementPlayerPosition: (state) => {
      _processInJail(state, [1, 2]);
      if (!state.players[state.playerTurn].isInJail) {
        _incrementPlayerPosition(state, 1);
        _processNewPosition(state, 1);
      }
    },
    setPosition: (state, action: PayloadAction<number>) => {
      state.players[state.playerTurn].position = action.payload;
      state.players[state.playerTurn].money = INITIAL_MONEY;
    },
    startDiceRoll: (state) => {
      state.isRollingDice = true;
    },
    finishDiceRoll: (state, action: PayloadAction<DiceRoll>) => {
      const diceSum = action.payload[0] + action.payload[1];
      state.isRollingDice = false;
      _processInJail(state, action.payload);
      if (!state.players[state.playerTurn].isInJail) {
        _incrementPlayerPosition(state, diceSum);
        _processNewPosition(state, diceSum);
      }
    },
    buyTile: (state, action: PayloadAction<number>) => {
      const playerWithActiveTurn = _playerWithActiveTurn(state);
      playerWithActiveTurn.money -= (
        state.tiles[action.payload] as BuyableTile
      ).cost!;
      playerWithActiveTurn.properties.push(action.payload);
    },
    buyHouse: (state, action: PayloadAction<number>) => {
      const playerWithActiveTurn = _playerWithActiveTurn(state);
      const tile = state.tiles[action.payload] as PropertyTile;
      playerWithActiveTurn.money -= tile.houseCost;
      if (tile.houses < 4) {
        tile.houses += 1;
      } else {
        tile.hasHotel = true;
      }
    },
    buyJailExit: (state) => {
      const playerWithActiveTurn = _playerWithActiveTurn(state);
      playerWithActiveTurn.isInJail = false;
      playerWithActiveTurn.turnsInJail = 0;
      playerWithActiveTurn.money -= COST_TO_EXIT_JAIL;
    },
  },
});

export const selectPlayers = (state: RootState) => state.game.players;
export const selectIsRollingDice = (state: RootState) =>
  state.game.isRollingDice;
export const selectTiles = (state: RootState) => state.game.tiles;

export const {
  incrementPlayerPosition,
  startDiceRoll,
  finishDiceRoll,
  buyTile,
  setPosition,
  buyHouse,
  buyJailExit,
} = gameSlice.actions;
export default gameSlice.reducer;

export enum TileTypes {
  JAIL,
  GO,
  FREE_PARKING,
  PROPERTY,
  GO_TO_JAIL,
  COMMUNITY_CHEST,
  INCOME_TAX,
  RAILROAD,
  CHANCE,
  UTILITY,
  LUXURY_TAX,
}

export type FreeParkingTile = {
  type: TileTypes.FREE_PARKING;
};

export type GoTile = {
  type: TileTypes.GO;
};

export type GoToJailTile = {
  type: TileTypes.GO_TO_JAIL;
};

export type JailTile = {
  type: TileTypes.JAIL;
};

export type CommunityChestTile = {
  type: TileTypes.COMMUNITY_CHEST;
};

export type IncomeTaxTile = {
  type: TileTypes.INCOME_TAX;
};

export type ChanceTile = {
  type: TileTypes.CHANCE;
  color: string;
};

export type RailroadTile = {
  type: TileTypes.RAILROAD;
  mortgage: number;
  name: string;
  cost: number;
};

export type PropertyTile = {
  name: string;
  cost: number;
  // rent represents a list as the following [site, oneHouse, twoHouses ... hotel]
  rent: number[];
  // then can be accessed as rent[houses]
  houses: number;
  houseCost: number;
  hasHotel: boolean;
  mortgage: number;
  unmortgage: number;
  color: string;
  type: TileTypes.PROPERTY;
};

export type UtilityTile = {
  name: string;
  cost: number;
  multipliers: number[];
  image: string;
  mortgage: number;
  type: TileTypes.UTILITY;
};

export type LuxuryTaxTile = {
  type: TileTypes.LUXURY_TAX;
};

export type Tile =
  | PropertyTile
  | GoTile
  | FreeParkingTile
  | GoToJailTile
  | CommunityChestTile
  | JailTile
  | IncomeTaxTile
  | RailroadTile
  | ChanceTile
  | UtilityTile
  | LuxuryTaxTile;

export type BuyableTile = PropertyTile | RailroadTile | UtilityTile;

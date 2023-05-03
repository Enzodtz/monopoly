import { Token } from "./token";

export type Player = {
  money: number;
  properties: number[];
  position: number;
  token: Token;
  isInJail: boolean;
  turnsInJail: number;
};

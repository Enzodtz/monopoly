import { Player } from "@/common/types/player";
import React from "react";
import PropertyComponent from "./PropertyComponent";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { isBuyable } from "@/common/types/utils/isBuyable";
import {
  buyJailExit,
  buyTile,
  selectPlayers,
  selectTiles,
} from "@/features/game/slice/gameSlice";
import { RootState } from "@/app/store";
import { COST_TO_EXIT_JAIL } from "@/common/data/constants";

const Container = styled.div``;

interface Props {
  playerIndex: number;
  player: Player;
}

function PlayerToolbarComponent({ player, playerIndex }: Props) {
  const dispatch = useAppDispatch();
  const players = useAppSelector(selectPlayers);
  const turn = useAppSelector((state: RootState) => state.game.playerTurn);
  const tiles = useAppSelector(selectTiles);

  return (
    <Container>
      <div>
        Player {playerIndex}{" "}
        {player.isInJail && `(in Jail for ${player.turnsInJail} turns)`}
        &nbsp;
        {playerIndex == turn &&
          isBuyable(
            players,
            turn,
            tiles[players[turn].position],
            players[turn].position
          ) && (
            <button onClick={() => dispatch(buyTile(players[turn].position))}>
              Buy Property
            </button>
          )}
        {playerIndex == turn &&
          player.isInJail &&
          player.money >= COST_TO_EXIT_JAIL && (
            <button onClick={() => dispatch(buyJailExit())}>
              Pay ${COST_TO_EXIT_JAIL} to exit jail
            </button>
          )}
      </div>
      <div>Money ${player.money}</div>
      <div>{player.properties.length > 0 && "Properties: "}</div>
      {player.properties.map((property, index) => (
        <PropertyComponent
          key={index}
          player={player}
          playerIndex={playerIndex}
          property={property}
        />
      ))}
    </Container>
  );
}

export default PlayerToolbarComponent;

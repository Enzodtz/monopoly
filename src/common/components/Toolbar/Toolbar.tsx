import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import {
  buyTile,
  selectPlayers,
  selectTiles,
} from "@/features/game/slice/gameSlice";
import { isBuyable } from "../../types/utils/isBuyable";
import PlayerToolbarComponent from "./PlayerToolbarComponent";
import styled from "styled-components";

const PlayerComponentsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export default function Toolbar() {
  const players = useAppSelector(selectPlayers);
  const turn = useAppSelector((state: RootState) => state.game.playerTurn);
  const dispatch = useAppDispatch();
  const tiles = useAppSelector(selectTiles);

  return (
    <div style={{ color: "white" }}>
      <div>Player Turn: {turn}</div>
      <br />
      <PlayerComponentsWrapper>
        {players.map((player, playerIndex) => (
          <PlayerToolbarComponent
            key={playerIndex}
            playerIndex={playerIndex}
            player={player}
          />
        ))}
      </PlayerComponentsWrapper>
    </div>
  );
}

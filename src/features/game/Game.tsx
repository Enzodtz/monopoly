import { useEffect } from "react";
import Board from "@/common/components/Board";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  incrementPlayerPosition,
  selectPlayers,
  setPosition,
  startDiceRoll,
} from "./slice/gameSlice";
import DiceRoller from "@/common/components/DiceRoller";
import { RootState } from "@/app/store";
import { TileTypes } from "@/common/types/tyles";
import Toolbar from "@/common/components/Toolbar/Toolbar";

export default function Game() {
  const dispatch = useAppDispatch();

  function handleKey(event: KeyboardEvent) {
    dispatch(incrementPlayerPosition());
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <>
      <Board />
      <button
        onClick={() => {
          dispatch(startDiceRoll());
        }}
      >
        Roll Dice
      </button>
      <button
        onClick={() => {
          dispatch(setPosition(0));
        }}
      >
        Go to start
      </button>
      <DiceRoller />
      <Toolbar />
    </>
  );
}

import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  finishDiceRoll,
  selectIsRollingDice,
} from "@/features/game/slice/gameSlice";
import styled from "styled-components";
import {
  DICE_ROLLER_ANIMATION_AMOUNT,
  DICE_ROLLER_FINISH_DURATION,
  DICE_ROLLER_START_TIMEOUT,
} from "../data/constants";
import { DiceRoll } from "../types/diceRoll";

const Wrapper = styled.div`
  padding: 10px;
  background-color: white;
`;

export default function DiceRoller() {
  const [currentNumber, setCurrentNumbers] = useState([1, 1]);
  const isRollingDice = useAppSelector(selectIsRollingDice);
  const dispatch = useAppDispatch();

  function getRandomNumber(lastNumber: number) {
    const max = 6;
    const min = 1;
    let newNumber: number = lastNumber;
    while (newNumber == lastNumber) {
      newNumber = Math.floor(Math.random() * (max - min + 1) + min);
    }
    return newNumber;
  }

  function animateDiceRoll(remainingRolls: number, lastNumbers: DiceRoll) {
    const newNumbers: DiceRoll = [
      getRandomNumber(lastNumbers[0]),
      getRandomNumber(lastNumbers[1]),
    ];

    setCurrentNumbers(newNumbers);

    if (remainingRolls == 0) {
      setTimeout(
        () => dispatch(finishDiceRoll(newNumbers)),
        DICE_ROLLER_FINISH_DURATION
      );
      return;
    }

    const newTimeout =
      (remainingRolls / DICE_ROLLER_ANIMATION_AMOUNT) *
      DICE_ROLLER_START_TIMEOUT;
    setTimeout(
      () => animateDiceRoll(remainingRolls - 1, newNumbers),
      newTimeout
    );
  }

  useEffect(() => {
    if (isRollingDice) {
      animateDiceRoll(DICE_ROLLER_ANIMATION_AMOUNT, [0, 0]);
    }
  }, [isRollingDice]);

  return (
    <Modal show={isRollingDice}>
      <Wrapper>{currentNumber[0]}</Wrapper>
      &nbsp;
      <Wrapper>{currentNumber[1]}</Wrapper>
    </Modal>
  );
}

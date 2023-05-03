import { ChanceTile } from "@/common/types/tyles";
import styled from "styled-components";
import {
  CHANCE_DISTANCE,
  CHANCE_PADDING,
  CHANCE_QUESTION_MARK_SIZE,
  CHANCE_TEXT_SIZE,
} from "@/common/data/constants";

export interface ChanceTileProps {
  tile: ChanceTile;
  position: number;
  positionInSide: number;
  side: number;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${CHANCE_PADDING}px;
  font-size: ${CHANCE_TEXT_SIZE}px;
  box-sizing: border-box;
`;

const Text = styled.div`
  text-align: center;
  margin-bottom: ${CHANCE_DISTANCE}px;
`;

const QuestionMark = styled.div<ChanceTileProps>`
  text-align: center;
  font-size: ${CHANCE_QUESTION_MARK_SIZE}px;
  color: ${(props) => props.tile.color};
  line-height: 0.8;
`;

export default function ChanceTileComponent(props: ChanceTileProps) {
  return (
    <Wrapper>
      <Text>Chance</Text>
      <QuestionMark {...props}>?</QuestionMark>
    </Wrapper>
  );
}

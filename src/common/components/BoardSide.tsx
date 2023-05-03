import React from "react";
import styled from "styled-components";
import { TILE_HEIGHT } from "@/common/data/constants";

const BaseBoardSide = styled.div<Props>`
  display: inline-flex;
  position: absolute;
  vertical-align: top;
`;

const BoardSideTop = styled(BaseBoardSide)`
  /* background-color: yellow; */
  transform: scale(1, -1);
`;

const BoardSideLeft = styled(BaseBoardSide)`
  left: 0;
  top: 0;
  transform: rotate(90deg);
  transform-origin: 0% 100%;
  flex-direction: row-reverse;
`;

const BoardSideRight = styled(BaseBoardSide)`
  /* background-color: red; */
  transform: rotate(-90deg);
  transform-origin: 100% 0%;
  right: ${TILE_HEIGHT}px;
  top: 0;
  flex-direction: row-reverse;
`;

const BoardSideBottom = styled(BaseBoardSide)`
  /* background-color: green; */
  right: 0;
  bottom: 0;
  flex-direction: row-reverse;
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  side: number;
}

export default function BoardSide(props: Props) {
  switch (props.side) {
    case 0:
      return <BoardSideTop {...props} />;
    case 1:
      props.children;

      return <BoardSideRight {...props} />;
    case 2:
      return <BoardSideBottom {...props} />;
    case 3:
      return <BoardSideLeft {...props} />;
    default:
      return <></>;
  }
}

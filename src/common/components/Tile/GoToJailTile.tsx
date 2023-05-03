import { GoToJailTile } from "@/common/types/tyles";
import styled from "styled-components";
import {
  CAR_IMAGE_WIDTH,
  CAR_TEXT_SIZE,
  GO_TO_JAIL_IMAGE_WIDTH,
  GO_TO_JAIL_TEXT_SIZE,
} from "@/common/data/constants";
import policeManImage from "@/common/static/go_to_jail.png";

export interface GoToJailTileProps {
  tile: GoToJailTile;
  position: number;
  positionInSide: number;
  side: number;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  transform: rotate(-45deg);
  font-size: ${GO_TO_JAIL_TEXT_SIZE}px;
`;

const PoliceMan = styled.img`
  width: ${GO_TO_JAIL_IMAGE_WIDTH}px;
`;

export default function GoToJailTileComponent(props: GoToJailTileProps) {
  return (
    <Wrapper>
      <div>Go To</div>
      <PoliceMan src={policeManImage} />
      <div>Jail</div>
    </Wrapper>
  );
}

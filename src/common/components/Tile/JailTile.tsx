import { JailTile } from "@/common/types/tyles";
import styled from "styled-components";
import {
  BORDER_SIZE,
  GO_TO_JAIL_IMAGE_WIDTH,
  GO_TO_JAIL_TEXT_SIZE,
  IN_JAIL_TEXT_SIZE,
  JAIL_IMAGE_WIDTH,
  JAIL_SIZE,
  JAIL_TEXT_SIZE,
  TILE_HEIGHT,
} from "@/common/data/constants";
import jailImage from "@/common/static/jail.png";

export interface JailTileProps {
  tile: JailTile;
  position: number;
  positionInSide: number;
  side: number;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  font-size: ${JAIL_TEXT_SIZE}px;
`;

const LeftWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
`;

const JailBox = styled.div`
  display: inline-block;
  width: ${JAIL_SIZE}px;
  height: ${JAIL_SIZE}px;
  background-color: #f7941d;
  border-bottom: solid ${BORDER_SIZE}px black;
  border-right: solid ${BORDER_SIZE}px black;
  box-sizing: border-box;
  flex-shrink: 0;
`;

const JustText = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightWrapper = styled.div`
  height: ${JAIL_SIZE}px;
  flex-grow: 1;
  position: relative;
`;

const VisitingText = styled.div`
  right: 0;
  width: ${JAIL_SIZE}px;
  height: ${TILE_HEIGHT - JAIL_SIZE}px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transform: rotate(-90deg) translate(0, -100%);
  transform-origin: 100% 0;
  position: absolute;
`;

const InJailWrapper = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  transform: rotate(-45deg);
  font-size: ${IN_JAIL_TEXT_SIZE}px;
`;

const Jail = styled.img`
  width: ${JAIL_IMAGE_WIDTH}px;
`;

export default function JailTileComponent(props: JailTileProps) {
  return (
    <Wrapper>
      <LeftWrapper>
        <JailBox>
          <InJailWrapper>
            <div>Go To</div>
            <Jail src={jailImage} />
            <div>Jail</div>
          </InJailWrapper>
        </JailBox>
        <JustText>Just</JustText>
      </LeftWrapper>
      <RightWrapper>
        <VisitingText>Visiting</VisitingText>
      </RightWrapper>
    </Wrapper>
  );
}

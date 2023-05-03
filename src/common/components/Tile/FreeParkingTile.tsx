import { FreeParkingTile } from "@/common/types/tyles";
import styled from "styled-components";
import carImage from "@/common/static/free_parking.png";
import { CAR_IMAGE_WIDTH, CAR_TEXT_SIZE } from "@/common/data/constants";

export interface FreeParkingTileProps {
  tile: FreeParkingTile;
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
  font-size: ${CAR_TEXT_SIZE}px;
`;

const Car = styled.img`
  width: ${CAR_IMAGE_WIDTH}px;
`;

export default function FreeParkingTileComponent(props: FreeParkingTileProps) {
  return (
    <Wrapper>
      <div>Free</div>
      <Car src={carImage} />
      <div>Parking</div>
    </Wrapper>
  );
}

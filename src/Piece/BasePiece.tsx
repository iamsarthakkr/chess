import styled from "styled-components";
import { Flex } from "../components/common";
import { BoardConstants } from "../constants";

export const BasePiece = styled(Flex)`
   justify-content: center;
   align-items: center;

   width: ${() => `${BoardConstants.CELL_SIZE}px`};
   height: ${() => `${BoardConstants.CELL_SIZE}px`};
   position: absolute;

   background-repeat: no-repeat;
   background-position: center;
   background-size: 70px;
`;

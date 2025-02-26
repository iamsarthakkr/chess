import React from "react";
import styled from "styled-components";
import { Flex } from "../../components/common";
import { Pieces } from "./Pieces";
import { BoardConstants } from "../../constants";

const BoardContainer = styled(Flex)`
   border: 1px solid black;
   flex-direction: row;
`;

const Row = styled(Flex)`
   flex-direction: column;
`;

const Piece = styled(Flex)<{ $x: number; $y: number }>`
   width: 90px;
   height: 90px;
   background-color: ${(props) =>
      (props.$x + props.$y) % 2 === 0
         ? `var(--black-square)`
         : "var(--white-square)"};
`;

export const Board = () => {
   const board_ref = React.useRef<HTMLDivElement | null>(null);

   const Board = React.useMemo(() => {
      const board = [];
      for (let y = 1; y <= BoardConstants.BOARD_SIZE; y++) {
         const row = [];
         for (let x = 1; x <= BoardConstants.BOARD_SIZE; x++) {
            row.push(<Piece key={`${x}-${y}`} $x={x} $y={y} />);
         }
         board.push(<Row key={y}>{row}</Row>);
      }
      return board.reverse();
   }, []);

   return (
      <BoardContainer ref={board_ref}>
         {Board}
         <Pieces board_ref={board_ref} />
      </BoardContainer>
   );
};

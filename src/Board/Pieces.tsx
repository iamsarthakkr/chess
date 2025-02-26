import React from "react";
import styled from "styled-components";
import { Piece } from "../Piece";

type Coord = {
   x: number;
   y: number;
};

type IPiece = {
   pos: Coord;
   id: string;
};

type IBoardDimensions = {
   width: number;
   height: number;
   off_left: number;
   off_top: number;
};

type IPiecesProps = {
   board_ref: React.MutableRefObject<HTMLDivElement | null>;
};

const VirtualBoard = styled.div<{
   $off_left: number;
   $off_top: number;
   $width: number;
   $height: number;
}>`
   position: absolute;
   top: ${(props) => props.$off_top}px;
   left: ${(props) => props.$off_left}px;
   width: ${(props) => props.$width}px;
   height: ${(props) => props.$height}px;
`;

export const Pieces = (props: IPiecesProps) => {
   const [board_dimensions, set_board_dimensions] =
      React.useState<IBoardDimensions | null>(null);

   const [pieces, set_pieces] = React.useState<IPiece[]>([
      {
         pos: { x: 1, y: 1 },
         id: "pawn-1",
      },
      {
         pos: { x: 3, y: 1 },
         id: "pawn-2",
      },
      {
         pos: { x: 5, y: 7 },
         id: "queen-1",
      },
   ]);

   const { board_ref } = props;

   React.useEffect(() => {
      const board = board_ref.current;
      if (!board) return;

      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = board;
      set_board_dimensions({
         width: offsetWidth,
         height: offsetHeight,
         off_left: offsetLeft,
         off_top: offsetTop,
      });
   }, [board_ref]);

   const make_move = React.useCallback(
      (start: Coord | null, end: Coord | null) => {
         if (!start || !end) return;
         console.log("making move", { start, end });

         set_pieces((prev) => {
            return prev.map((piece) => {
               let ret = { ...piece };

               if (piece.pos.x === start.x && piece.pos.y === start.y) {
                  ret = {
                     ...ret,
                     pos: end,
                  };
               }
               return ret;
            });
         });
      },
      []
   );

   return board_dimensions ? (
      <VirtualBoard
         $off_left={board_dimensions.off_left}
         $off_top={board_dimensions.off_top}
         $width={board_dimensions.width}
         $height={board_dimensions.height}
      >
         {pieces.map((piece) => {
            return (
               <Piece
                  id={piece.id}
                  pos={piece.pos}
                  key={piece.id}
                  board_dimensions={board_dimensions}
                  make_move={make_move}
               />
            );
         })}
      </VirtualBoard>
   ) : null;
};

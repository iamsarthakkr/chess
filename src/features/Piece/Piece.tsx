import React from "react";
import Draggable, { DraggableEventHandler } from "react-draggable";
import { get_board_coordinates, get_piece_coordinates } from "../../utils";
import { BlackQueen } from "./BlackPieces";

type Coord = {
   x: number;
   y: number;
};

type IBoardDimensions = {
   width: number;
   height: number;
   off_left: number;
   off_top: number;
};

type IPieceProps = {
   board_dimensions: IBoardDimensions;
   pos: Coord;
   id: string;
   make_move: (start: Coord | null, end: Coord | null) => void;
};

export const Piece = (props: IPieceProps) => {
   const [start_pos, set_start_pos] = React.useState<Coord | null>(null);

   const { pos, board_dimensions, make_move } = props;

   const get_coords = React.useCallback(
      (e: MouseEvent) => {
         if (!board_dimensions) return null;

         const { off_left, off_top, height } = board_dimensions;
         const { clientX, clientY } = e;

         const off_bottom = off_top + height;

         const target_x = clientX - off_left;
         const target_y = off_bottom - clientY;
         return get_board_coordinates({ x: target_x, y: target_y });
      },
      [board_dimensions]
   );

   const on_start: DraggableEventHandler = React.useCallback(
      (e, _data) => {
         const coords = get_coords(e as MouseEvent);
         set_start_pos(coords);
         console.log("start", { coords });
      },
      [get_coords]
   );

   const on_stop: DraggableEventHandler = React.useCallback(
      (e, _data) => {
         const coords = get_coords(e as MouseEvent);

         console.log("stop", { coords });
         make_move(start_pos, coords);
      },
      [get_coords, make_move, start_pos]
   );

   return (
      <Draggable
         bounds="parent"
         onStart={on_start}
         onStop={on_stop}
         position={get_piece_coordinates(pos)}
      >
         <BlackQueen />
      </Draggable>
   );
};

import { Coord } from "../ChessEngine";
import { BoardConstants } from "../constants";

export const get_offset_from_coord = (coord: Coord) => {
   return {
      x: coord.x * BoardConstants.CELL_SIZE,
      y: (BoardConstants.BOARD_SIZE - coord.y - 1) * BoardConstants.CELL_SIZE,
   };
};

export const get_coordinates_from_offset = (x: number, y: number) => {
   return new Coord(
      Math.floor(x / BoardConstants.CELL_SIZE),
      BoardConstants.BOARD_SIZE - Math.floor(y / BoardConstants.CELL_SIZE) - 1
   );
};

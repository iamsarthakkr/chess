import { BoardConstants } from "../constants";

type Coord = {
   x: number;
   y: number;
};

export const get_board_coordinates = (coord: Coord): Coord => {
   return {
      x: Math.floor(coord.x / BoardConstants.CELL_SIZE) + 1,
      y: Math.floor(coord.y / BoardConstants.CELL_SIZE) + 1,
   };
};

export const get_piece_coordinates = (coord: Coord): Coord => {
   return {
      x: (coord.x - 1) * BoardConstants.CELL_SIZE,
      y: (BoardConstants.BOARD_SIZE - coord.y) * BoardConstants.CELL_SIZE,
   };
};

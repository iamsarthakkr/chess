import { BoardConstants } from "../constants";
import { Coord } from "./Coord";
import { BoardUtils } from "./Utils";

export class PieceList {
   // This is an array of coordinates of pieces
   private piece_list: Coord[];
   // Maps a coordinate on the board to the index of the piece_list array
   private index_map: number[][];

   constructor(size: number = BoardConstants.BOARD_SIZE) {
      this.piece_list = [];
      this.index_map = BoardUtils.create_board(size, PieceList.EMPTY_INDEX);
   }

   public get count() {
      return this.piece_list.length;
   }

   public occupied(square: Coord): boolean {
      return this.index_map[square.x][square.y] !== PieceList.EMPTY_INDEX;
   }

   public add_piece(square: Coord): void {
      this.index_map[square.x][square.y] = this.piece_list.length;
      this.piece_list.push(square);
   }

   public remove_piece(square: Coord): void {
      const piece_index = this.index_map[square.x][square.y];

      // check if the square is empty
      if (piece_index === PieceList.EMPTY_INDEX) {
         return;
      }

      const last_square = this.piece_list[this.count - 1];

      // check if the square is the last piece (no need to update index_map)
      if (square === last_square) {
         this.piece_list.pop();
         this.index_map[square.x][square.y] = PieceList.EMPTY_INDEX;
         return;
      }

      // swap the last piece with the piece to be removed
      this.piece_list[piece_index] = last_square;

      // update index_map
      this.index_map[last_square.x][last_square.y] = piece_index;
      this.index_map[square.x][square.y] = PieceList.EMPTY_INDEX;

      // remove the last piece
      this.piece_list.pop();
   }

   private static EMPTY_INDEX = -1;
}

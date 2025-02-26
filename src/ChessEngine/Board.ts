import { BoardConstants } from "../constants";
import { Coord } from "./Coord";
import { Piece, PieceType, Side } from "./Piece";
import { SideList } from "./SideList";

export class Board {
   private readonly m_side_to_move: Side;
   private readonly m_board: Piece[][];
   private readonly m_white_pieces: SideList;
   private readonly m_black_pieces: SideList;

   constructor(fen_string = BoardConstants.FEN_STARTING_POSITION) {
      this.m_side_to_move = Side.WHITE;
      this.m_board = Board.parse_fen(fen_string);
      this.m_white_pieces = new SideList();
      this.m_black_pieces = new SideList();

      this.init_board();
   }

   public get board(): Piece[][] {
      return this.m_board;
   }

   public get side_to_move(): Side {
      return this.m_side_to_move;
   }

   public piece_at(coord: Coord): Piece {
      return this.m_board[coord.x][coord.y];
   }

   public make_move(move: number): void {}

   public un_make_move(move: number): void {}

   private init_board() {
      for (let x = 0; x < this.board.length; x++) {
         for (let y = 0; y < this.board[x].length; y++) {
            const piece = this.board[x][y];
            if (piece.type === PieceType.NONE) {
               continue;
            }
            if (piece.side === Side.WHITE) {
               this.m_white_pieces.add_piece(piece, new Coord(y, x));
            } else {
               this.m_black_pieces.add_piece(piece, new Coord(y, x));
            }
         }
      }
   }

   private static parse_fen(fen: string): Piece[][] {
      const fen_parts = fen.split(" ");
      return fen_parts[0]
         .split("/")
         .reverse()
         .map((row) => {
            const pieces = [];
            for (const piece of row) {
               if (isNaN(parseInt(piece))) {
                  pieces.push(Piece.get_piece_from_char(piece));
               } else {
                  for (let i = 0; i < parseInt(piece); i++) {
                     pieces.push(Piece.EMPTY_PIECE);
                  }
               }
            }
            return pieces;
         });
   }
}

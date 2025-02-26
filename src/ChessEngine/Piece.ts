import { PIECE_TO_CHAR_MAP } from "../constants";
import { PieceType, Side } from "../types";

export class Piece extends Number {
   constructor(pieceType: PieceType, side: Side) {
      super(side | pieceType);
   }

   public get this() {
      return this.valueOf();
   }
   public get type(): PieceType {
      return this.valueOf() & 0b0111;
   }

   public get side(): Side {
      return this.valueOf() & 0b1000;
   }

   public get is_white() {
      return this.side === Side.WHITE;
   }
   public get is_black() {
      return !this.is_white;
   }

   public toString() {
      const sym = PIECE_TO_CHAR_MAP[this.type];
      if (this.type === PieceType.NONE) return sym;
      return this.is_white ? sym.toUpperCase() : sym;
   }

   public static readonly WHITE_PAWN = new Piece(PieceType.PAWN, Side.WHITE);
   public static readonly WHITE_KNIGHT = new Piece(
      PieceType.KNIGHT,
      Side.WHITE
   );
   public static readonly WHITE_BISHOP = new Piece(
      PieceType.BISHOP,
      Side.WHITE
   );
   public static readonly WHITE_ROOK = new Piece(PieceType.ROOK, Side.WHITE);
   public static readonly WHITE_QUEEN = new Piece(PieceType.QUEEN, Side.WHITE);
   public static readonly WHITE_KING = new Piece(PieceType.KING, Side.WHITE);

   public static readonly BLACK_PAWN = new Piece(PieceType.PAWN, Side.BLACK);
   public static readonly BLACK_KNIGHT = new Piece(
      PieceType.KNIGHT,
      Side.BLACK
   );
   public static readonly BLACK_BISHOP = new Piece(
      PieceType.BISHOP,
      Side.BLACK
   );
   public static readonly BLACK_ROOK = new Piece(PieceType.ROOK, Side.BLACK);
   public static readonly BLACK_QUEEN = new Piece(PieceType.QUEEN, Side.BLACK);
   public static readonly BLACK_KING = new Piece(PieceType.KING, Side.BLACK);

   public static readonly EMPTY_PIECE = new Piece(PieceType.NONE, 0);

   public static get_piece_from_char(piece: string, side?: Side): Piece {
      if (side === Side.WHITE) piece = piece.toUpperCase();

      switch (piece) {
         case "P":
            return Piece.WHITE_PAWN;
         case "N":
            return Piece.WHITE_KNIGHT;
         case "B":
            return Piece.WHITE_BISHOP;
         case "R":
            return Piece.WHITE_ROOK;
         case "Q":
            return Piece.WHITE_QUEEN;
         case "K":
            return Piece.WHITE_KING;
         case "p":
            return Piece.BLACK_PAWN;
         case "n":
            return Piece.BLACK_KNIGHT;
         case "b":
            return Piece.BLACK_BISHOP;
         case "r":
            return Piece.BLACK_ROOK;
         case "q":
            return Piece.BLACK_QUEEN;
         case "k":
            return Piece.BLACK_KING;
         default:
            return Piece.EMPTY_PIECE;
      }
   }

   public static PIECE_LIST() {}

   public static get_piece(piece: Piece, side: Side) {}
}

export enum PieceType {
   NONE = 0,
   PAWN = 1,
   KNIGHT = 2,
   BISHOP = 3,
   ROOK = 4,
   QUEEN = 5,
   KING = 6,
}

export enum Side {
   BLACK = 0,
   WHITE = 1,
}

export class Piece extends Number {
   constructor(pieceType: PieceType, side: Side) {
      super((side << 3) + pieceType);
   }

   public get type() {
      return this.valueOf() & 0b0111;
   }

   public get side(): Side {
      return this.valueOf() >> 3;
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

   public static get_piece_from_char(piece: string): Piece {
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
}

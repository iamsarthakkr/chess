import { Coord } from "./Coord";
import { Piece, PieceType } from "./Piece";
import { PieceList } from "./PieceList";

export class SideList {
   private m_pawns: PieceList;
   private m_knights: PieceList;
   private m_bishops: PieceList;
   private m_rooks: PieceList;
   private m_queens: PieceList;
   private m_kings: PieceList;

   constructor() {
      this.m_pawns = new PieceList();
      this.m_knights = new PieceList();
      this.m_bishops = new PieceList();
      this.m_rooks = new PieceList();
      this.m_queens = new PieceList();
      this.m_kings = new PieceList();
   }

   public get pawns(): PieceList {
      return this.m_pawns;
   }

   public get knights(): PieceList {
      return this.m_knights;
   }

   public get bishops(): PieceList {
      return this.m_bishops;
   }

   public get rooks(): PieceList {
      return this.m_rooks;
   }

   public get queens(): PieceList {
      return this.m_queens;
   }

   public get kings(): PieceList {
      return this.m_kings;
   }

   public add_piece(piece: Piece, square: Coord) {
      switch (piece.type) {
         case PieceType.PAWN: {
            this.m_pawns.add_piece(square);
            break;
         }
         case PieceType.KNIGHT: {
            this.m_knights.add_piece(square);
            break;
         }
         case PieceType.BISHOP: {
            this.m_bishops.add_piece(square);
            break;
         }
         case PieceType.ROOK: {
            this.m_rooks.add_piece(square);
            break;
         }
         case PieceType.QUEEN: {
            this.m_queens.add_piece(square);
            break;
         }
         case PieceType.KING: {
            this.m_kings.add_piece(square);
            break;
         }
         default: {
            throw new Error("Invalid piece type");
         }
      }
   }

   public remove_piece(square: Coord) {}
}

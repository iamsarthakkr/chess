import { PIECE_TO_CHAR_MAP } from '../constants';
import { IPiece, PieceType, Side } from '../types';

export class Piece {
	public static get_piece_from_char(piece: string, side?: Side): IPiece {
		if (side === Side.WHITE) piece = piece.toUpperCase();

		switch (piece) {
			case 'P':
				return Piece.WHITE_PAWN;
			case 'N':
				return Piece.WHITE_KNIGHT;
			case 'B':
				return Piece.WHITE_BISHOP;
			case 'R':
				return Piece.WHITE_ROOK;
			case 'Q':
				return Piece.WHITE_QUEEN;
			case 'K':
				return Piece.WHITE_KING;
			case 'p':
				return Piece.BLACK_PAWN;
			case 'n':
				return Piece.BLACK_KNIGHT;
			case 'b':
				return Piece.BLACK_BISHOP;
			case 'r':
				return Piece.BLACK_ROOK;
			case 'q':
				return Piece.BLACK_QUEEN;
			case 'k':
				return Piece.BLACK_KING;
			default:
				return Piece.EMPTY_PIECE;
		}
	}

	public static toString(piece: IPiece) {
		const type = this.get_type(piece);
		const sym = PIECE_TO_CHAR_MAP[type];
		if (type === PieceType.NONE) return sym;
		return this.is_white(piece) ? sym.toUpperCase() : sym;
	}
	public static is_white = (piece: IPiece) => this.get_side(piece) === Side.WHITE;
	public static is_black = (piece: IPiece) => !this.is_white(piece);

	public static get_type = (piece: IPiece): PieceType => piece & 0b0111;
	public static get_side = (piece: IPiece): Side => piece & 0b1000;

	public static construct_piece = (pieceType: PieceType, side: Side) => side | pieceType;

	public static readonly WHITE_PAWN = this.construct_piece(PieceType.PAWN, Side.WHITE);
	public static readonly WHITE_KNIGHT = this.construct_piece(PieceType.KNIGHT, Side.WHITE);
	public static readonly WHITE_BISHOP = this.construct_piece(PieceType.BISHOP, Side.WHITE);
	public static readonly WHITE_ROOK = this.construct_piece(PieceType.ROOK, Side.WHITE);
	public static readonly WHITE_QUEEN = this.construct_piece(PieceType.QUEEN, Side.WHITE);
	public static readonly WHITE_KING = this.construct_piece(PieceType.KING, Side.WHITE);

	public static readonly BLACK_PAWN = this.construct_piece(PieceType.PAWN, Side.BLACK);
	public static readonly BLACK_KNIGHT = this.construct_piece(PieceType.KNIGHT, Side.BLACK);
	public static readonly BLACK_BISHOP = this.construct_piece(PieceType.BISHOP, Side.BLACK);
	public static readonly BLACK_ROOK = this.construct_piece(PieceType.ROOK, Side.BLACK);
	public static readonly BLACK_QUEEN = this.construct_piece(PieceType.QUEEN, Side.BLACK);
	public static readonly BLACK_KING = this.construct_piece(PieceType.KING, Side.BLACK);

	public static readonly EMPTY_PIECE = this.construct_piece(PieceType.NONE, 0);
}

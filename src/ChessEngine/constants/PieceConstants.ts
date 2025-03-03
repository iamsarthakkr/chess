import { Symbols, PieceType } from '../types';

export const PIECE_TO_CHAR_MAP: Record<PieceType, Symbols> = {
	[PieceType.NONE]: Symbols.NONE,
	[PieceType.PAWN]: Symbols.PAWN,
	[PieceType.KNIGHT]: Symbols.KNIGHT,
	[PieceType.BISHOP]: Symbols.BISHOP,
	[PieceType.ROOK]: Symbols.ROOK,
	[PieceType.QUEEN]: Symbols.QUEEN,
	[PieceType.KING]: Symbols.KING,
};

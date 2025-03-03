import React from 'react';
import { ChessPiece } from './ChessPiece';
import { Piece } from '../../ChessEngine/Core';
import { PieceType } from '../../ChessEngine/types';

export const WhitePawn = ChessPiece('assets/white_pawn.svg');
export const WhiteKnight = ChessPiece('assets/white_knight.svg');
export const WhiteBishop = ChessPiece('assets/white_bishop.svg');
export const WhiteRook = ChessPiece('assets/white_rook.svg');
export const WhiteQueen = ChessPiece('assets/white_queen.svg');
export const WhiteKing = ChessPiece('assets/white_king.svg');

export const BlackPawn = ChessPiece('assets/black_pawn.svg');
export const BlackKnight = ChessPiece('assets/black_knight.svg');
export const BlackBishop = ChessPiece('assets/black_bishop.svg');
export const BlackRook = ChessPiece('assets/black_rook.svg');
export const BlackQueen = ChessPiece('assets/black_queen.svg');
export const BlackKing = ChessPiece('assets/black_king.svg');

export const WHITE_PIECE_MAP: Record<PieceType, React.FC> = {
	[PieceType.NONE]: () => null,
	[PieceType.PAWN]: WhitePawn,
	[PieceType.KNIGHT]: WhiteKnight,
	[PieceType.BISHOP]: WhiteBishop,
	[PieceType.ROOK]: WhiteRook,
	[PieceType.QUEEN]: WhiteQueen,
	[PieceType.KING]: WhiteKing,
};

export const BLACK_PIECE_MAP: Record<PieceType, React.FC> = {
	[PieceType.NONE]: () => null,
	[PieceType.PAWN]: BlackPawn,
	[PieceType.KNIGHT]: BlackKnight,
	[PieceType.BISHOP]: BlackBishop,
	[PieceType.ROOK]: BlackRook,
	[PieceType.QUEEN]: BlackQueen,
	[PieceType.KING]: BlackKing,
};

export const get_piece_to_render = (piece: Piece) => {
	if (piece.is_white) {
		return WHITE_PIECE_MAP[piece.type];
	}
	return BLACK_PIECE_MAP[piece.type];
};

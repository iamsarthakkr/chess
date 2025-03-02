import { Symbols, PieceType, Side } from '../types';
import { Coord } from './Coord';
import { Piece } from './Piece';
import { PieceList } from './PieceList';

export class SideList {
	private readonly m_pawns: PieceList;
	private readonly m_knights: PieceList;
	private readonly m_bishops: PieceList;
	private readonly m_rooks: PieceList;
	private readonly m_queens: PieceList;
	private readonly m_kings: PieceList;

	private readonly m_side: Side;

	constructor(side: Side) {
		this.m_side = side;

		this.m_pawns = new PieceList(Piece.get_piece_from_char(Symbols.PAWN, side));
		this.m_knights = new PieceList(Piece.get_piece_from_char(Symbols.KNIGHT, side));
		this.m_bishops = new PieceList(Piece.get_piece_from_char(Symbols.BISHOP, side));
		this.m_rooks = new PieceList(Piece.get_piece_from_char(Symbols.ROOK, side));
		this.m_queens = new PieceList(Piece.get_piece_from_char(Symbols.QUEEN, side));
		this.m_kings = new PieceList(Piece.get_piece_from_char(Symbols.KING, side));
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

	public get pieces(): Record<string, Piece> {
		return {
			...this.m_pawns.pieces,
			...this.m_knights.pieces,
			...this.m_bishops.pieces,
			...this.m_rooks.pieces,
			...this.m_queens.pieces,
			...this.m_kings.pieces,
		};
	}

	public move_piece(piece: Piece, from: Coord, to: Coord) {
		switch (piece.type) {
			case PieceType.PAWN: {
				this.m_pawns.move_piece(from, to);
				break;
			}
			case PieceType.KNIGHT: {
				this.m_knights.move_piece(from, to);
				break;
			}
			case PieceType.BISHOP: {
				this.m_bishops.move_piece(from, to);
				break;
			}
			case PieceType.ROOK: {
				this.m_rooks.move_piece(from, to);
				break;
			}
			case PieceType.QUEEN: {
				this.m_queens.move_piece(from, to);
				break;
			}
			case PieceType.KING: {
				this.m_kings.move_piece(from, to);
				break;
			}
			default: {
			}
		}
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
			}
		}
	}

	public remove_piece(piece: Piece, square: Coord) {
		switch (piece.type) {
			case PieceType.PAWN: {
				this.m_pawns.remove_piece(square);
				break;
			}
			case PieceType.KNIGHT: {
				this.m_knights.remove_piece(square);
				break;
			}
			case PieceType.BISHOP: {
				this.m_bishops.remove_piece(square);
				break;
			}
			case PieceType.ROOK: {
				this.m_rooks.remove_piece(square);
				break;
			}
			case PieceType.QUEEN: {
				this.m_queens.remove_piece(square);
				break;
			}
			case PieceType.KING: {
				this.m_kings.remove_piece(square);
				break;
			}
			default: {
			}
		}
	}
}

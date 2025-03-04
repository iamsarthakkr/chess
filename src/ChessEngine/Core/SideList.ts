import { Symbols, PieceType, Side, IPiece } from '../types';
import { ICoord } from '../types';
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

	public move_piece(piece: IPiece, from: ICoord, to: ICoord) {
		const piece_list = this.get_piece_list(piece);
		piece_list.move_piece(from, to);
	}

	public add_piece(piece: IPiece, square: ICoord) {
		const piece_list = this.get_piece_list(piece);
		piece_list.add_piece(square);
	}

	public remove_piece(piece: IPiece, square: ICoord) {
		const piece_list = this.get_piece_list(piece);
		piece_list.remove_piece(square);
	}

	private get_piece_list(piece: IPiece) {
		switch (Piece.get_type(piece)) {
			case PieceType.PAWN: {
				return this.m_pawns;
			}
			case PieceType.KNIGHT: {
				return this.m_knights;
			}
			case PieceType.BISHOP: {
				return this.m_bishops;
			}
			case PieceType.ROOK: {
				return this.m_rooks;
			}
			case PieceType.QUEEN: {
				return this.m_queens;
			}
			case PieceType.KING: {
				return this.m_kings;
			}
			default: {
				throw new Error('Invalid piece type');
			}
		}
	}
}

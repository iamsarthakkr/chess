import { BoardConstants } from '../constants';
import { Move } from '../MoveGenerator';
import { Side, PieceType, Coord } from '../types';
import { Piece } from './Piece';
import { SideList } from './SideList';

export class Board {
	private m_side_to_move: Side;
	private readonly m_board: Piece[][];
	private readonly m_white_pieces: SideList;
	private readonly m_black_pieces: SideList;

	constructor(fen_string = BoardConstants.FEN_STARTING_POSITION) {
		this.m_side_to_move = Side.WHITE;
		this.m_board = Board.parse_fen(fen_string);
		this.m_white_pieces = new SideList(Side.WHITE);
		this.m_black_pieces = new SideList(Side.BLACK);

		this.init_board();
	}

	public get board(): Piece[][] {
		return this.m_board;
	}

	public get side_to_move(): Side {
		return this.m_side_to_move;
	}

	public get white_to_move(): boolean {
		return this.m_side_to_move === Side.WHITE;
	}

	public get black_to_move(): boolean {
		return !this.white_to_move;
	}

	public get pieces(): Record<string, Piece> {
		return {
			...this.m_white_pieces.pieces,
			...this.m_black_pieces.pieces,
		};
	}

	public piece_at(coord: Coord): Piece {
		return this.m_board[coord.y][coord.x];
	}

	public is_valid_start(coord: Coord) {
		const piece_to_move = this.board[coord.y][coord.x];
		return piece_to_move !== Piece.EMPTY_PIECE && piece_to_move.side === this.side_to_move;
	}

	public is_valid_end(coord: Coord) {
		const piece_at = this.board[coord.y][coord.x];
		return piece_at === Piece.EMPTY_PIECE || piece_at.side !== this.side_to_move;
	}

	public make_move(move: Move): void {
		const source_piece = this.piece_at(move.from);
		const target_piece = this.piece_at(move.to);

		if (source_piece.type === PieceType.NONE || source_piece.side !== this.m_side_to_move) {
			return;
		}

		// Remove the target piece if it exists
		if (target_piece.type !== PieceType.NONE) {
			if (source_piece.side === target_piece.side) {
				return;
			}
			if (this.white_to_move) {
				this.m_black_pieces.remove_piece(target_piece, move.to);
			} else {
				this.m_white_pieces.remove_piece(target_piece, move.to);
			}
			this.board[move.to.y][move.to.x] = Piece.EMPTY_PIECE;
		}

		// Move the source piece
		if (this.white_to_move) {
			this.m_white_pieces.move_piece(source_piece, move.from, move.to);
		} else {
			this.m_black_pieces.move_piece(source_piece, move.from, move.to);
		}
		this.board[move.to.y][move.to.x] = source_piece;
		this.board[move.from.y][move.from.x] = Piece.EMPTY_PIECE;
		this.m_side_to_move = this.white_to_move ? Side.BLACK : Side.WHITE;
	}

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
		const fen_parts = fen.split(' ');
		return fen_parts[0]
			.split('/')
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

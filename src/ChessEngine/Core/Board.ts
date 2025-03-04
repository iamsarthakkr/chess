import { BoardConstants } from '../constants';
import { Move } from '../MoveGenerator';
import { Coord } from './Coord';
import { Piece } from './Piece';
import { SideList } from './SideList';
import { Side, PieceType, ICoord, IPiece } from '../types';

export class Board {
	private m_side_to_move: Side;
	private readonly m_board: IPiece[][];
	private readonly m_white_pieces: SideList;
	private readonly m_black_pieces: SideList;

	constructor(fen_string = BoardConstants.FEN_STARTING_POSITION) {
		this.m_side_to_move = Side.WHITE;
		this.m_board = Board.parse_fen(fen_string);
		this.m_white_pieces = new SideList(Side.WHITE);
		this.m_black_pieces = new SideList(Side.BLACK);

		this.init_board();
	}

	public get board(): IPiece[][] {
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

	public piece_at(coord: ICoord): IPiece {
		const x = Coord.get_x(coord),
			y = Coord.get_y(coord);
		return this.m_board[y][x];
	}

	public is_valid_start(coord: ICoord) {
		const x = Coord.get_x(coord),
			y = Coord.get_y(coord);
		const piece_to_move = this.board[y][x];
		return piece_to_move !== Piece.EMPTY_PIECE && Piece.get_side(piece_to_move) === this.side_to_move;
	}

	public is_valid_end(coord: ICoord) {
		const x = Coord.get_x(coord),
			y = Coord.get_y(coord);
		const piece_at = this.board[y][x];
		return piece_at === Piece.EMPTY_PIECE || Piece.get_side(piece_at) !== this.side_to_move;
	}

	public make_move(move: Move): void {
		const source_piece = this.piece_at(move.from);
		const target_piece = this.piece_at(move.to);

		const source_side = Piece.get_side(source_piece);
		const source_type = Piece.get_type(source_piece);
		const target_side = Piece.get_side(target_piece);
		const target_type = Piece.get_type(target_piece);

		const to_x = Coord.get_x(move.to),
			to_y = Coord.get_y(move.to);
		const from_x = Coord.get_x(move.from),
			from_y = Coord.get_y(move.from);

		if (source_type === PieceType.NONE || source_side !== this.m_side_to_move) {
			return;
		}

		// Remove the target piece if it exists
		if (target_type !== PieceType.NONE) {
			if (source_side === target_side) {
				return;
			}
			if (this.white_to_move) {
				this.m_black_pieces.remove_piece(target_piece, move.to);
			} else {
				this.m_white_pieces.remove_piece(target_piece, move.to);
			}
			this.board[to_y][to_x] = Piece.EMPTY_PIECE;
		}

		// Move the source piece
		if (this.white_to_move) {
			this.m_white_pieces.move_piece(source_piece, move.from, move.to);
		} else {
			this.m_black_pieces.move_piece(source_piece, move.from, move.to);
		}
		this.board[to_y][to_x] = source_piece;
		this.board[from_y][from_x] = Piece.EMPTY_PIECE;
		this.m_side_to_move = this.white_to_move ? Side.BLACK : Side.WHITE;
	}

	public un_make_move(move: number): void {}

	private init_board() {
		for (let x = 0; x < this.board.length; x++) {
			for (let y = 0; y < this.board[x].length; y++) {
				const piece = this.board[x][y];
				const type = Piece.get_type(piece);
				const side = Piece.get_side(piece);
				if (type === PieceType.NONE) {
					continue;
				}
				if (side === Side.WHITE) {
					this.m_white_pieces.add_piece(piece, Coord.from(x, y));
				} else {
					this.m_black_pieces.add_piece(piece, Coord.from(x, y));
				}
			}
		}
	}

	private static parse_fen(fen: string): IPiece[][] {
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

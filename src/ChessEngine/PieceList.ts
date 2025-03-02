import { BoardConstants } from '../constants';
import { Coord } from './Coord';
import { Piece } from './Piece';
import { BoardUtils } from './Utils';

export class PieceList {
	// This is an array of coordinates of pieces
	private readonly m_piece_list: Coord[];
	// Maps a coordinate on the board to the index of the m_piece_list array
	private readonly m_index_map: number[][];
	private readonly m_piece: Piece;

	constructor(piece: Piece, size: number = BoardConstants.BOARD_SIZE) {
		this.m_piece_list = [];
		this.m_piece = piece;
		this.m_index_map = BoardUtils.create_board(size, PieceList.EMPTY_INDEX);
	}

	public get count() {
		return this.m_piece_list.length;
	}

	public get pieces() {
		return this.m_piece_list.reduce<Record<string, Piece>>((partial, coord) => {
			partial[coord.toString()] = this.m_piece;
			return partial;
		}, {});
	}

	public occupied(square: Coord): boolean {
		return this.m_index_map[square.x][square.y] !== PieceList.EMPTY_INDEX;
	}

	public add_piece(square: Coord): void {
		this.m_index_map[square.x][square.y] = this.m_piece_list.length;
		this.m_piece_list.push(square);
	}

	public remove_piece(square: Coord): void {
		const piece_index = this.m_index_map[square.x][square.y];

		// check if the square is empty
		if (piece_index === PieceList.EMPTY_INDEX) {
			return;
		}

		const last_square = this.m_piece_list[this.count - 1];

		// check if the square is the last piece (no need to update m_index_map)
		if (square === last_square) {
			this.m_piece_list.pop();
			this.m_index_map[square.x][square.y] = PieceList.EMPTY_INDEX;
			return;
		}

		// swap the last piece with the piece to be removed
		this.m_piece_list[piece_index] = last_square;

		// update m_index_map
		this.m_index_map[last_square.x][last_square.y] = piece_index;
		this.m_index_map[square.x][square.y] = PieceList.EMPTY_INDEX;

		// remove the last piece
		this.m_piece_list.pop();
	}

	public move_piece(source: Coord, target: Coord): void {
		this.remove_piece(source);
		this.add_piece(target);
	}

	private static EMPTY_INDEX = -1;
}

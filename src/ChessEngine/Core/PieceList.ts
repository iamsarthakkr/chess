import { Coord } from './Coord';
import { BoardConstants } from '../constants';
import { ICoord, IPiece } from '../types';
import { BoardUtils } from '../utils';

export class PieceList {
	// This is an array of coordinates of pieces
	private readonly m_piece_list: ICoord[];
	// Maps a coordinate on the board to the index of the m_piece_list array
	private readonly m_index_map: number[][];
	private readonly m_piece: IPiece;

	constructor(piece: IPiece, size: number = BoardConstants.BOARD_SIZE) {
		this.m_piece_list = [];
		this.m_piece = piece;
		this.m_index_map = BoardUtils.create_board(size, PieceList.EMPTY_INDEX);
	}

	public get count() {
		return this.m_piece_list.length;
	}

	public occupied(square: ICoord): boolean {
		const x = Coord.get_x(square),
			y = Coord.get_y(square);
		return this.m_index_map[y][x] !== PieceList.EMPTY_INDEX;
	}

	public add_piece(square: ICoord): void {
		const x = Coord.get_x(square),
			y = Coord.get_y(square);
		this.m_index_map[y][x] = this.m_piece_list.length;
		this.m_piece_list.push(square);
	}

	public remove_piece(square: ICoord): void {
		const square_x = Coord.get_x(square),
			square_y = Coord.get_y(square);
		const piece_index = this.m_index_map[square_y][square_x];

		// check if the square is empty
		if (piece_index === PieceList.EMPTY_INDEX) {
			return;
		}

		const last_square = this.m_piece_list[this.count - 1];
		const last_square_x = Coord.get_x(last_square),
			last_square_y = Coord.get_y(last_square);

		// check if the square is the last piece (no need to update m_index_map)
		if (square === last_square) {
			this.m_piece_list.pop();

			this.m_index_map[square_y][square_x] = PieceList.EMPTY_INDEX;
			return;
		}

		// swap the last piece with the piece to be removed
		this.m_piece_list[piece_index] = last_square;

		// update m_index_map
		this.m_index_map[last_square_y][last_square_x] = piece_index;
		this.m_index_map[square_y][square_x] = PieceList.EMPTY_INDEX;

		// remove the last piece
		this.m_piece_list.pop();
	}

	public move_piece(source: ICoord, target: ICoord): void {
		this.remove_piece(source);
		this.add_piece(target);
	}

	private static EMPTY_INDEX = -1;
}

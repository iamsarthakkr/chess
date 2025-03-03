import { BoardConstants } from '../constants';

export class BoardUtils {
	public static create_board<T extends Number>(size: number = BoardConstants.BOARD_SIZE, initial_value: T): T[][] {
		const board: T[][] = new Array(size);
		for (let i = 0; i < size; i++) {
			board[i] = Array(size).fill(initial_value);
		}
		return board;
	}
}

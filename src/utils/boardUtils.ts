import { BoardConstants } from '../ChessEngine/constants';
import { Coord } from '../ChessEngine/types';
import { CELL_SIZE } from '../constants';

export const get_offset_from_coord = (coord: Coord) => {
	return {
		x: coord.x * CELL_SIZE,
		y: (BoardConstants.BOARD_SIZE - coord.y - 1) * CELL_SIZE,
	};
};

export const get_coordinates_from_offset = (x: number, y: number) => {
	return new Coord(Math.floor(x / CELL_SIZE), BoardConstants.BOARD_SIZE - Math.floor(y / CELL_SIZE) - 1);
};

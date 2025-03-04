import React from 'react';
import { useStateRef } from '../hooks/useStateRef';
import { BoardContext, BoardContextActions, IBoardContext, IBoardContextActions } from './boardContext';
import { CELL_SIZE } from '../../constants';
import { Board } from '../../ChessEngine/Core';
import { Move } from '../../ChessEngine/MoveGenerator';
import { ICoord } from '../../ChessEngine/types';
import { Coord } from '../../ChessEngine/Core/Coord';
import { BoardConstants } from '../../ChessEngine/constants';
import { IDraggableInfo, IPosition } from '../types';
import { get_piece_to_render } from './pieceUtility';

const get_board_map = (board: Board) => {
	return board.board.map((row) => row.map((piece) => piece));
};

export const get_offset = (pos: IPosition): IPosition => {
	return {
		x: pos.x * CELL_SIZE,
		y: (BoardConstants.BOARD_SIZE - pos.y - 1) * CELL_SIZE,
	};
};

export const get_coord = (x: number, y: number) => {
	return Coord.from(Math.floor(x / CELL_SIZE), BoardConstants.BOARD_SIZE - Math.floor(y / CELL_SIZE) - 1);
};

const get_piece_list = (board: Board) => {
	const piece_list: IDraggableInfo[] = [];
	board.board.forEach((row, y) => {
		row.forEach((piece, x) => {
			piece_list.push({
				id: Coord.from(x, y),
				position: get_offset({ x, y }),
				Child: get_piece_to_render(piece),
			});
		});
	});
	return piece_list;
};

interface IProps {
	children: React.ReactElement;
}

export const BoardContextProvider = (props: IProps) => {
	const board = React.useMemo(() => new Board(), []);

	const [move_start, set_move_start, move_start_ref] = useStateRef<ICoord>('');
	const [board_map, set_board_map] = React.useState(get_board_map(board));
	const [piece_list, set_piece_list] = React.useState<IDraggableInfo[]>(get_piece_list(board));

	const on_move_start = React.useCallback(
		(from: IPosition) => {
			const coord = get_coord(from.x, from.y);
			set_move_start(coord);
		},
		[set_move_start]
	);

	const on_move_end = React.useCallback(
		(to: IPosition) => {
			if (move_start_ref.current) {
				set_move_start('');
			}
			const from = move_start_ref.current;
			const to_coord = get_coord(to.x, to.y);
			if (!board || !from || !to_coord) {
				return;
			}

			const move: Move = new Move(from, to_coord);
			board.make_move(move);

			set_board_map(get_board_map(board));
			set_piece_list(get_piece_list(board));
		},
		[move_start_ref, board, set_move_start]
	);

	const context: IBoardContext = React.useMemo(() => {
		return {
			board,
			moving_id: move_start,
			board_map,
			piece_list,
		};
	}, [board, move_start, board_map, piece_list]);

	const contextActions: IBoardContextActions = React.useMemo(() => {
		return { on_move_start, on_move_end };
	}, [on_move_start, on_move_end]);

	return (
		<BoardContext.Provider value={context}>
			<BoardContextActions.Provider value={contextActions}>{props.children}</BoardContextActions.Provider>
		</BoardContext.Provider>
	);
};

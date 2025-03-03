import React from 'react';
import { Board, Coord } from '../../ChessEngine';
import { useStateRef } from '../hooks/useStateRef';
import { Move } from '../../ChessEngine/Move';
import { BoardContext, BoardContextActions, IBoardContext, IBoardContextActions } from './boardContext';

interface IProps {
	children: React.ReactElement;
}

const get_board_map = (board: Board) => {
	return board.board.map((row) => row.map((piece) => piece));
};

export const BoardContextProvider = (props: IProps) => {
	const board = React.useMemo(() => new Board(), []);

	const [move_start, set_move_start, move_start_ref] = useStateRef<Coord | null>(null);
	const [board_map, set_board_map] = React.useState(get_board_map(board));

	const on_move_start = React.useCallback(
		(from: Coord) => {
			set_move_start(from);
		},
		[set_move_start]
	);

	const on_move_end = React.useCallback(
		(to: Coord) => {
			if (move_start_ref.current) {
				set_move_start(null);
			}
			const from = move_start_ref.current;
			if (!board || !from || !to) {
				return;
			}

			const move: Move = new Move(from, to);
			board.make_move(move);

			set_board_map(get_board_map(board));
		},
		[move_start_ref, set_move_start, board, set_board_map]
	);

	const context: IBoardContext = React.useMemo(() => {
		return {
			board,
			move_start,
			board_map,
		};
	}, [board, move_start, board_map]);

	const contextActions: IBoardContextActions = React.useMemo(() => {
		return { on_move_start, on_move_end };
	}, [on_move_start, on_move_end]);

	return (
		<BoardContext.Provider value={context}>
			<BoardContextActions.Provider value={contextActions}>{props.children}</BoardContextActions.Provider>
		</BoardContext.Provider>
	);
};

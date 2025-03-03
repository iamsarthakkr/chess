import React from 'react';
import { useAppContext } from '../App/useContext';
import { DraggablePiece } from './DraggablePiece';
import { get_coordinates_from_offset } from '../../utils';
import { useBoardContext, useBoardContextActions } from '../chess/useBoardContext';
import { PieceType } from '../../ChessEngine/types';
import { Coord } from '../../ChessEngine/types';

export const PieceList = () => {
	const { mouse_position_ref, board_element_ref } = useAppContext();

	const { board_map } = useBoardContext();
	const { on_move_start, on_move_end } = useBoardContextActions();

	const handle_drag_start = React.useCallback(() => {
		if (!mouse_position_ref.current) return;
		on_move_start(get_coordinates_from_offset(mouse_position_ref.current.elementX, mouse_position_ref.current.elementY));
	}, [mouse_position_ref, on_move_start]);

	const handle_drag_end = React.useCallback(() => {
		if (!mouse_position_ref.current) return;

		on_move_end(get_coordinates_from_offset(mouse_position_ref.current.elementX, mouse_position_ref.current.elementY));
	}, [on_move_end, mouse_position_ref]);

	React.useEffect(() => {
		const board = board_element_ref.current;
		if (!board) return;

		board.addEventListener('mousedown', handle_drag_start);
		board.addEventListener('mouseup', handle_drag_end);
		return () => {
			board.removeEventListener('mousedown', handle_drag_start);
			board.removeEventListener('mouseup', handle_drag_end);
		};
	}, [board_element_ref, handle_drag_start, handle_drag_end]);

	const List = React.useMemo(() => {
		const list: JSX.Element[] = [];
		console.log({ board_map });

		for (let col = 0; col < board_map.length; col++) {
			for (let row = 0; row < board_map[col].length; row++) {
				const piece = board_map[col][row];
				if (piece.type !== PieceType.NONE) {
					list.push(<DraggablePiece key={`${piece.toString()}${row}${col}`} piece={piece} coord={new Coord(row, col)} />);
				}
			}
		}
		return list;
	}, [board_map]);

	return <>{List}</>;
};

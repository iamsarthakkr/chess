import React from 'react';
import { useAppContext, useAppContextActions } from '../App/useContext';
import { DraggablePiece } from './DraggablePiece';
import { Coord } from '../../ChessEngine';
import { get_coordinates_from_offset } from '../../utils';

export const PieceList = () => {
	const { piece_map, mouse_position_ref, board_element_ref } = useAppContext();
	const { register_move_start, register_move_end } = useAppContextActions();

	const handle_drag_start = React.useCallback(() => {
		if (!mouse_position_ref.current) return;
		register_move_start(get_coordinates_from_offset(mouse_position_ref.current.elementX, mouse_position_ref.current.elementY));
	}, [mouse_position_ref, register_move_start]);

	const handle_drag_end = React.useCallback(() => {
		if (!mouse_position_ref.current) return;

		register_move_end(get_coordinates_from_offset(mouse_position_ref.current.elementX, mouse_position_ref.current.elementY));
	}, [register_move_end, mouse_position_ref]);

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
		return Object.entries(piece_map).map(([coord, value]) => {
			return <DraggablePiece key={`${value.toString()}${coord}`} piece={value} coord={new Coord(coord)} />;
		});
	}, [piece_map]);

	return <>{List}</>;
};

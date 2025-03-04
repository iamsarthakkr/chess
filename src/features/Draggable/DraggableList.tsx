import React from 'react';
import { useAppContext } from '../App/useContext';
import { DraggableItem } from './DraggableItem';
import { useBoardContext, useBoardContextActions } from '../chess/useBoardContext';

export const DraggableList = () => {
	const { mouse_position_ref, board_element_ref } = useAppContext();

	const { piece_list } = useBoardContext();
	const { on_move_start, on_move_end } = useBoardContextActions();

	const handle_drag_start = React.useCallback(() => {
		if (!mouse_position_ref.current) return;
		on_move_start({ x: mouse_position_ref.current.elementX, y: mouse_position_ref.current.elementY });
	}, [mouse_position_ref, on_move_start]);

	const handle_drag_end = React.useCallback(() => {
		if (!mouse_position_ref.current) return;
		on_move_end({ x: mouse_position_ref.current.elementX, y: mouse_position_ref.current.elementY });
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
		return piece_list.map((piece) => {
			return <DraggableItem key={piece.id} {...piece} />;
		});
	}, [piece_list]);

	return <>{List}</>;
};

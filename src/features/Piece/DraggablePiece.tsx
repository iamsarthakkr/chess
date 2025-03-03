import React, { memo } from 'react';
import styled from 'styled-components';
import { get_piece_to_render } from './pieceUtility';
import { get_offset_from_coord } from '../../utils/boardUtils';
import { CELL_SIZE } from '../../constants';
import { useAppContext } from '../App/useContext';
import { useBoardContext } from '../chess/useBoardContext';
import { Piece } from '../../ChessEngine/Core';
import { Coord } from '../../ChessEngine/types';

interface IPosition {
	x: number;
	y: number;
}

type IDraggableContainerProps = {
	$x: number;
	$y: number;
	$dragging: boolean;
};

const DraggableContainer = styled.div.attrs<IDraggableContainerProps>((props) => {
	return {
		style: {
			top: `${props.$y}px`,
			left: `${props.$x}px`,
		},
	};
})`
	width: ${() => `${CELL_SIZE}px`};
	height: ${() => `${CELL_SIZE}px`};
	position: absolute;
`;

interface DraggablePieceProps {
	piece: Piece;
	coord: Coord;
}

export const DraggablePiece = memo((props: DraggablePieceProps) => {
	const { coord, piece } = props;

	const { mouse_position_ref, board_element_ref } = useAppContext();
	const { move_start } = useBoardContext();

	const [position, set_position] = React.useState<IPosition>(get_offset_from_coord(coord));
	const move_start_ref = React.useRef(move_start);
	const is_dragging = (move_start_ref.current && move_start_ref.current.valueOf() === coord.valueOf()) ?? false;

	React.useEffect(() => {
		set_position(get_offset_from_coord(coord));
	}, [coord]);

	React.useEffect(() => {
		move_start_ref.current = move_start;
	}, [move_start]);

	const handle_drag = React.useCallback(() => {
		if (!mouse_position_ref.current) {
			return;
		}
		const is_dragging = move_start_ref.current && move_start_ref.current.valueOf() === coord.valueOf();

		if (!is_dragging) {
			return set_position(get_offset_from_coord(coord));
		}

		set_position({
			x: mouse_position_ref.current.elementX - CELL_SIZE / 2,
			y: mouse_position_ref.current.elementY - CELL_SIZE / 2,
		});
	}, [mouse_position_ref, coord]);

	React.useEffect(() => {
		const board = board_element_ref.current;
		if (!board) return;
		board.addEventListener('mousemove', handle_drag);
		return () => {
			board.removeEventListener('mousemove', handle_drag);
		};
	}, [board_element_ref, handle_drag]);

	const PieceComponent = get_piece_to_render(piece);

	return (
		<DraggableContainer key={`${coord.valueOf()}`} $x={position.x} $y={position.y} $dragging={is_dragging}>
			<PieceComponent />
		</DraggableContainer>
	);
});

import React, { memo } from 'react';
import styled from 'styled-components';
import { Coord, Piece } from '../../ChessEngine';
import { get_piece_to_render } from './pieceUtility';
import { get_offset_from_coord } from '../../utils/boardUtils';
import { BoardConstants } from '../../constants';
import { useAppContext } from '../App/useContext';

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
	width: ${() => `${BoardConstants.CELL_SIZE}px`};
	height: ${() => `${BoardConstants.CELL_SIZE}px`};
	position: absolute;
`;

interface DraggablePieceProps {
	piece: Piece;
	coord: Coord;
}

export const DraggablePiece = memo((props: DraggablePieceProps) => {
	const { coord, piece } = props;

	const { mouse_position_ref, dragging_coord, board_element_ref } = useAppContext();

	const [position, set_position] = React.useState<IPosition>(get_offset_from_coord(coord));
	const dragging_coord_ref = React.useRef(dragging_coord);
	const is_dragging = (dragging_coord_ref.current && dragging_coord_ref.current.valueOf() === coord.valueOf()) ?? false;

	React.useEffect(() => {
		set_position(get_offset_from_coord(coord));
	}, [coord]);

	React.useEffect(() => {
		dragging_coord_ref.current = dragging_coord;
	}, [dragging_coord]);

	const handle_drag = React.useCallback(() => {
		if (!mouse_position_ref.current) {
			return;
		}
		const is_dragging = dragging_coord_ref.current && dragging_coord_ref.current.valueOf() === coord.valueOf();

		if (!is_dragging) {
			return set_position(get_offset_from_coord(coord));
		}

		set_position({
			x: mouse_position_ref.current.elementX - BoardConstants.CELL_SIZE / 2,
			y: mouse_position_ref.current.elementY - BoardConstants.CELL_SIZE / 2,
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

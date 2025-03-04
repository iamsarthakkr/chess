import React, { memo } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../App/useContext';
import { useBoardContext } from '../chess/useBoardContext';
import { CELL_SIZE } from '../../constants';
import { IDraggableInfo, IPosition } from '../types';

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

export const DraggableItem = memo((props: IDraggableInfo) => {
	const { mouse_position_ref, board_element_ref } = useAppContext();
	const { moving_id } = useBoardContext();

	const [position, set_position] = React.useState<IPosition>(props.position);
	const moving_id_ref = React.useRef(moving_id);
	const is_dragging = moving_id === props.id;

	React.useEffect(() => {
		set_position(props.position);
	}, [props.position]);

	React.useEffect(() => {
		moving_id_ref.current = moving_id;
	}, [moving_id]);

	const handle_drag = React.useCallback(() => {
		if (!mouse_position_ref.current) {
			return;
		}
		const is_dragging = moving_id_ref.current && moving_id_ref.current.valueOf() === props.id;

		if (!is_dragging) {
			return set_position({
				x: props.position.x,
				y: props.position.y,
			});
		}

		set_position({
			x: mouse_position_ref.current.elementX - CELL_SIZE / 2,
			y: mouse_position_ref.current.elementY - CELL_SIZE / 2,
		});
	}, [mouse_position_ref, props]);

	React.useEffect(() => {
		const board = board_element_ref.current;
		if (!board) return;

		board.addEventListener('mousemove', handle_drag);
		return () => {
			board.removeEventListener('mousemove', handle_drag);
		};
	}, [board_element_ref, handle_drag]);

	const Child = props.Child;

	return (
		<DraggableContainer key={props.id} $x={position.x} $y={position.y} $dragging={is_dragging}>
			<Child />
		</DraggableContainer>
	);
});

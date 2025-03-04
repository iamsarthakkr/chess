import React from 'react';
import styled from 'styled-components';
import { Flex } from '../../components/common';
import { useAppContext } from '../App/useContext';
import { BoardConstants } from '../../ChessEngine/constants';
import { DraggableList } from '../Draggable/DraggableList';

const BoardContainer = styled(Flex)`
	position: relative;
	border: 1px solid black;
	flex-direction: row;
`;

const Row = styled(Flex)`
	flex-direction: column;
`;

const BoardCell = styled(Flex)<{ $x: number; $y: number }>`
	width: 90px;
	height: 90px;
	background-color: ${(props) => ((props.$x + props.$y) % 2 === 0 ? `var(--black-square)` : 'var(--white-square)')};
`;

export const ChessBoard = () => {
	const { board_element_ref } = useAppContext();

	const Board = React.useMemo(() => {
		const board = [];
		for (let y = 1; y <= BoardConstants.BOARD_SIZE; y++) {
			const row = [];
			for (let x = 1; x <= BoardConstants.BOARD_SIZE; x++) {
				row.push(<BoardCell key={`${x}-${y}`} $x={x} $y={y} />);
			}
			board.push(<Row key={y}>{row}</Row>);
		}
		return board.reverse();
	}, []);

	return (
		<BoardContainer ref={board_element_ref}>
			{Board}
			<DraggableList />
		</BoardContainer>
	);
};

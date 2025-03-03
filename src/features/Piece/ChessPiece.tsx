import React from 'react';
import styled from 'styled-components';
import { Flex } from '../../components/common';
import { CELL_SIZE } from '../../constants';

const StyledBasePiece = styled(Flex)`
	justify-content: center;
	align-items: center;

	width: ${() => `${CELL_SIZE}px`};
	height: ${() => `${CELL_SIZE}px`};
	position: absolute;
	background: transparent;
	cursor: auto;
`;

const StyledImage = styled.img`
	width: 75%;
	pointer-events: none;
	display: block;
	user-select: none;
`;

interface IProps {
	children: React.ReactElement;
}

export const BasePiece = (props: IProps) => {
	return <StyledBasePiece>{props.children}</StyledBasePiece>;
};

export const ChessPiece = (src: string) => {
	return () => (
		<BasePiece>
			<StyledImage src={src} />
		</BasePiece>
	);
};

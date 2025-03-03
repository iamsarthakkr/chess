import React from 'react';
import { BoardContext, BoardContextActions } from './boardContext';

export const useBoardContext = () => {
	return React.useContext(BoardContext);
};

export const useBoardContextActions = () => {
	return React.useContext(BoardContextActions);
};

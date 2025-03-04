import React from 'react';
import { Board } from '../../ChessEngine/Core';
import { IDraggableInfo, IPosition } from '../types';

export type IBoardContext = {
	board: Board;
	piece_list: IDraggableInfo[];
	moving_id: string;
	board_map: Board['board'];
};

export type IBoardContextActions = {
	on_move_start: (from: IPosition) => void;
	on_move_end: (to: IPosition) => void;
};

export const BoardContext = React.createContext<IBoardContext>(null as unknown as IBoardContext);

export const BoardContextActions = React.createContext<IBoardContextActions>(null as unknown as IBoardContextActions);

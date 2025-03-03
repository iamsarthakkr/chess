import React from 'react';
import { Board, Coord } from '../../ChessEngine';

export type IBoardContext = {
	board: Board;
	move_start: Coord | null;
	board_map: Board['board'];
};

export type IBoardContextActions = {
	on_move_start: (from: Coord) => void;
	on_move_end: (to: Coord) => void;
};

export const BoardContext = React.createContext<IBoardContext>(null as unknown as IBoardContext);

export const BoardContextActions = React.createContext<IBoardContextActions>(null as unknown as IBoardContextActions);

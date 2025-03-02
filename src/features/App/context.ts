import React from "react";
import { Board } from "../../ChessEngine/Board";
import { MousePosition } from "../hooks/useMouse";
import { Coord, Piece } from "../../ChessEngine";

export type IBoardDimensions = {
   width: number;
   height: number;
   off_left: number;
   off_top: number;
};

export type IAppContext = {
   board: Board;
   board_ref: React.RefObject<Board>;
   board_element_ref: React.RefObject<HTMLDivElement>;
   mouse_position_ref: React.RefObject<MousePosition>;
   piece_map: Record<string, Piece>;
   dragging_coord: Coord | null;
};

export type IAppContextActions = {
   register_move_start: (coord: Coord | null) => void;
   register_move_end: (coord: Coord | null) => void;
};

export const AppContext = React.createContext<IAppContext>(
   null as unknown as IAppContext
);

export const AppContextActions = React.createContext<IAppContextActions>(
   null as unknown as IAppContextActions
);

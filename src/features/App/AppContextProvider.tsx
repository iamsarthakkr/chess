import React from "react";
import {
   AppContext,
   AppContextActions,
   IAppContext,
   IAppContextActions,
} from "./context";
import { Board } from "../../ChessEngine/Board";
import { useMouse } from "../hooks/useMouse";
import { Move } from "../../ChessEngine/Move";
import { Coord } from "../../ChessEngine";

interface IProps {
   children: React.ReactElement;
}

export const AppContextProvider: React.FC<IProps> = (props) => {
   const [board] = React.useState<Board>(new Board());
   const [piece_map, set_piece_map] = React.useState(board.pieces);
   const [move_start, set_move_start] = React.useState<Coord | null>(null);
   const { element_ref, mouse_position_ref } = useMouse<HTMLDivElement>();

   const board_ref = React.useRef(board);
   const move_start_ref = React.useRef(move_start);

   React.useEffect(() => {
      move_start_ref.current = move_start;
   }, [move_start]);

   const register_move_start: IAppContextActions["register_move_start"] =
      React.useCallback((from: Coord | null) => {
         const board = board_ref.current;
         if (!board || !from) return;

         set_move_start(from);
      }, []);

   const register_move_end: IAppContextActions["register_move_end"] =
      React.useCallback((to: Coord | null) => {
         const board = board_ref.current;
         if (move_start_ref.current) {
            set_move_start(null);
         }
         if (!board || !move_start_ref.current || !to) {
            return;
         }

         const move: Move = new Move(move_start_ref.current, to);
         board.make_move(move);

         console.log({ board: board_ref.current });

         set_piece_map(board_ref.current.pieces);
         set_move_start(null);
      }, []);

   const context: IAppContext = React.useMemo(() => {
      return {
         board,
         piece_map,
         board_ref: board_ref,
         board_element_ref: element_ref,
         mouse_position_ref: mouse_position_ref,
         dragging_coord: move_start,
      };
   }, [board, element_ref, mouse_position_ref, piece_map, move_start]);

   const contextActions: IAppContextActions = React.useMemo(() => {
      return { register_move_start, register_move_end };
   }, [register_move_start, register_move_end]);

   return (
      <AppContext.Provider value={context}>
         <AppContextActions.Provider value={contextActions}>
            {props.children}
         </AppContextActions.Provider>
      </AppContext.Provider>
   );
};

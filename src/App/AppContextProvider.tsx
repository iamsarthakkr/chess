import React from "react";
import {
   AppContext,
   AppContextActions,
   IAppContext,
   IAppContextActions,
} from "./context";
import { Board } from "../ChessEngine/Board";

interface IProps {
   children: React.ReactElement;
}

export const AppContextProvider: React.FC<IProps> = (props) => {
   const board: Board = React.useMemo(() => new Board(), []);

   const context: IAppContext = React.useMemo(() => {
      return { board };
   }, [board]);

   const contextActions: IAppContextActions = React.useMemo(() => {
      return {};
   }, []);
   console.log({ context });

   return (
      <AppContext.Provider value={context}>
         <AppContextActions.Provider value={contextActions}>
            {props.children}
         </AppContextActions.Provider>
      </AppContext.Provider>
   );
};

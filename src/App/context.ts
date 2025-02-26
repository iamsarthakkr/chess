import React from "react";
import { Board } from "../ChessEngine/Board";

export type IAppContext = {
   board: Board;
};

export type IAppContextActions = {};

export const AppContext = React.createContext<IAppContext>(
   null as unknown as IAppContext
);

export const AppContextActions = React.createContext<IAppContextActions>(
   null as unknown as IAppContextActions
);

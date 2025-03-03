import React from 'react';
import { MousePosition } from '../hooks/useMouse';

export type IAppContext = {
	board_element_ref: React.RefObject<HTMLDivElement>;
	mouse_position_ref: React.RefObject<MousePosition>;
};

export type IAppContextActions = {};

export const AppContext = React.createContext<IAppContext>(null as unknown as IAppContext);

export const AppContextActions = React.createContext<IAppContextActions>(null as unknown as IAppContextActions);

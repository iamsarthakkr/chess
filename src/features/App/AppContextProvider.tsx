import React from 'react';
import { AppContext, AppContextActions, IAppContext, IAppContextActions } from './context';
import { useMouse } from '../hooks/useMouse';

interface IProps {
	children: React.ReactElement;
}

export const AppContextProvider: React.FC<IProps> = (props) => {
	const { element_ref: board_element_ref, mouse_position_ref } = useMouse<HTMLDivElement>();

	const context: IAppContext = React.useMemo(() => {
		return {
			board_element_ref: board_element_ref,
			mouse_position_ref: mouse_position_ref,
		};
	}, [board_element_ref, mouse_position_ref]);

	const contextActions: IAppContextActions = React.useMemo(() => {
		return {};
	}, []);

	return (
		<AppContext.Provider value={context}>
			<AppContextActions.Provider value={contextActions}>{props.children}</AppContextActions.Provider>
		</AppContext.Provider>
	);
};

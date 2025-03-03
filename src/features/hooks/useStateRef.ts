import React from 'react';

type IUseStateRef<T> = [T, React.Dispatch<React.SetStateAction<T>>, React.MutableRefObject<T>];

export const useStateRef = <T>(initial_value: T): IUseStateRef<T> => {
	const [state, set_state] = React.useState<T>(initial_value);
	const ref = React.useRef(state);

	React.useEffect(() => {
		ref.current = state;
	}, [state]);

	return [state, set_state, ref];
};

import React from 'react';

export type MousePosition = {
	x: number;
	y: number;
	elementX: number;
	elementY: number;
	elementPositionX: number;
	elementPositionY: number;
};

export interface MouseHook<T> {
	mouse_position: MousePosition;
	element_ref: React.RefObject<T>;
	mouse_position_ref: React.MutableRefObject<MousePosition>;
}

export const useMouse = <T extends Element>(): MouseHook<T> => {
	const [state, setState] = React.useState<MousePosition>({
		x: 0,
		y: 0,
		elementX: 0,
		elementY: 0,
		elementPositionX: 0,
		elementPositionY: 0,
	});

	const state_ref = React.useRef<MousePosition>(state);

	React.useEffect(() => {
		state_ref.current = state;
	}, [state]);

	const ref = React.useRef<T>(null);

	React.useLayoutEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			let newState: Partial<MousePosition> = {
				x: event.pageX,
				y: event.pageY,
			};

			if (ref.current?.nodeType === Node.ELEMENT_NODE) {
				const { left, top } = ref.current.getBoundingClientRect();
				newState.elementPositionX = left + window.scrollX;
				newState.elementPositionY = top + window.scrollY;
				newState.elementX = event.pageX - newState.elementPositionX;
				newState.elementY = event.pageY - newState.elementPositionY;
			}

			setState((s) => {
				return {
					...s,
					...newState,
				};
			});
		};

		document.addEventListener('mousemove', handleMouseMove);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	return {
		mouse_position: state,
		element_ref: ref,
		mouse_position_ref: state_ref,
	};
};

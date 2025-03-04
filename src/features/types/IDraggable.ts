export type IPosition = {
	x: number;
	y: number;
};

export type IDraggableInfo = {
	id: string;
	position: IPosition;
	Child: React.FC;
};

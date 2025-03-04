import { ICoord } from '../types';

export class Coord {
	public static from = (x: number, y: number) => String.fromCharCode(x + 'a'.charCodeAt(0)) + (y + 1);
	public static get_x = (coord: ICoord) => coord.charCodeAt(0) - 'a'.charCodeAt(0);
	public static get_y = (coord: ICoord) => parseInt(coord[1]) - 1;
}

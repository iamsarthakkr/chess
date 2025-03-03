import { Coord } from '../types/ICoord';

export class Move {
	private readonly m_from: Coord;
	private readonly m_to: Coord;

	constructor(from: Coord, to: Coord) {
		this.m_from = from;
		this.m_to = to;
	}

	public get from(): Coord {
		return this.m_from;
	}
	public get to(): Coord {
		return this.m_to;
	}
}

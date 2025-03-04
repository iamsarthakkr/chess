import { ICoord } from '../types/ICoord';

export class Move {
	private readonly m_from: ICoord;
	private readonly m_to: ICoord;

	constructor(from: ICoord, to: ICoord) {
		this.m_from = from;
		this.m_to = to;
	}

	public get from(): ICoord {
		return this.m_from;
	}
	public get to(): ICoord {
		return this.m_to;
	}
}

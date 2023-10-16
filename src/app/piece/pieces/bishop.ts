import { IPiece } from './i-piece';
import { Piece } from './piece';

export class Bishop extends Piece implements IPiece {

	public get name() {
		return "Bishop";
	}

	public get img() {
		return '/assets/svgs/chess-bishop-icon.svg';;
	}
}

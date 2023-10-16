import { IPiece } from './i-piece';
import { Piece } from './piece';

export class Queen extends Piece implements IPiece {

	public get name() {
        return "Queen";
    }

	public get img() {
		return '/assets/svgs/chess-queen-icon.svg';;
	}
}

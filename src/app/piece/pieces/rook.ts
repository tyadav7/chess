import { IPiece } from './i-piece';
import { Piece } from './piece';

export class Rook extends Piece implements IPiece {

	public get name() {
        return "Rook";
    }

	public get img() {
		return '/assets/svgs/chess-rook-icon.svg';
	}
}

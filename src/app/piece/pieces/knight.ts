import { IPiece } from "./i-piece";
import { Piece } from "./piece";

export class Knight extends Piece implements IPiece {

	public get name() {
		return "Knight";
	}
	public get img() {
		return '/assets/svgs/chess-knight-icon.svg';
	}
	
}

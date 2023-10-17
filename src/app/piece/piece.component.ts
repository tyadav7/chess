import { Component, Inject, Input } from '@angular/core';
import { IPiece } from './pieces/i-piece';
import { PawnValidator } from './validators/pawn-validator';

@Component({
	selector: 'app-piece',
	templateUrl: './piece.component.html',
	styleUrls: ['./piece.component.scss'],
})
export class PieceComponent {

	private _piece!: IPiece;
	@Input()
	public set piece(piece: IPiece) {
		if (!piece.moveValidator) {
			piece.moveValidator = this.validator;
		}
		this._piece = piece;
	}

	public get piece() {
		return this._piece;
	}

	constructor(@Inject('IMoveValidator') private validator: PawnValidator) {
	}
}

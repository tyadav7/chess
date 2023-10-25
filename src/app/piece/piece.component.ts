import { Directive, Inject, Input } from '@angular/core';
import { IPiece } from './pieces/i-piece';
import { IMoveValidator } from './validators/i-move-validator';


@Directive({selector: 'app-piece'})
export abstract class PieceComponent {

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

	constructor(@Inject('IMoveValidator') private validator: IMoveValidator) {
	}
}

import { Component } from '@angular/core';
import { IPiece } from './i-piece';
import { Piece } from './piece';
import { PieceComponent } from '../piece.component';
import { RookValidator } from '../validators/rook-validator';
import { ObstructionValidatorService } from '../obstructors/obstruction.service';
import { IPoint } from 'src/app/board/cell/cell.component';

@Component({
	selector: 'app-rook',
	templateUrl: '../piece.component.html',
	styleUrls: ['../piece.component.scss'],
	providers: [{ provide: 'IMoveValidator', useExisting: RookValidator },
	{ provide: 'IObsrtuctionValidator', useExisting: ObstructionValidatorService }
	]
})
export class RookComponent extends PieceComponent {
}
export class Rook extends Piece implements IPiece {

	private _moved: boolean = false;

	public override makeMove(to: IPoint) {
		super.makeMove(to);
		this._moved = true;
	}

	public get moved() {
		return this._moved;
	}

	public get name() {
		return "Rook";
	}

	public get img() {
		return '/assets/svgs/chess-rook-icon.svg';
	}
}

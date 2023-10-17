import { Component } from '@angular/core';
import { IPiece } from './i-piece';
import { Piece } from './piece';
import { PieceComponent } from '../piece.component';
import { RookValidator } from '../validators/rook-validator';
import { ObstructionValidatorService } from '../obstructors/obstruction.service';

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

	public get name() {
		return "Rook";
	}

	public get img() {
		return '/assets/svgs/chess-rook-icon.svg';
	}
}

import { Component } from '@angular/core';
import { PieceComponent } from '../piece.component';
import { QueenValidator } from '../validators/queen-validator';
import { IPiece } from './i-piece';
import { Piece } from './piece';

@Component({
	selector: 'app-queen',
	templateUrl: '../piece.component.html',
	styleUrls: ['../piece.component.scss'],
	providers: [{ provide: 'IMoveValidator', useExisting: QueenValidator }]
})
export class QueenComponent extends PieceComponent {

}
export class Queen extends Piece implements IPiece {

	public get name() {
		return "Queen";
	}

	public get img() {
		return '/assets/svgs/chess-queen-icon.svg';;
	}
}

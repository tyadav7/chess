import { Component } from '@angular/core';
import { PieceComponent } from '../piece.component';
import { BishopValidator } from '../validators/bishop-validator';
import { IPiece } from './i-piece';
import { Piece } from './piece';

@Component({
	selector: 'app-bishop',
	templateUrl: '../piece.component.html',
	styleUrls: ['../piece.component.scss'],
	providers: [{ provide: 'IMoveValidator', useExisting: BishopValidator }]
})
export class BishopComponent extends PieceComponent {

}
export class Bishop extends Piece implements IPiece {

	public get name() {
		return "Bishop";
	}

	public get img() {
		return '/assets/svgs/chess-bishop-icon.svg';;
	}
}

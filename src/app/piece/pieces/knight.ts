import { Component } from "@angular/core";
import { IPiece } from "./i-piece";
import { Piece } from "./piece";
import { PieceComponent } from "../piece.component";
import { KnightValidator } from "../validators/knight-validator";

@Component({
	selector: 'app-knight',
	templateUrl: '../piece.component.html',
	styleUrls: ['../piece.component.scss'],
	providers: [{ provide: 'IMoveValidator', useExisting: KnightValidator }]
})
export class KnightComponent extends PieceComponent {

}
export class Knight extends Piece implements IPiece {

	public get name() {
		return "Knight";
	}
	public get img() {
		return '/assets/svgs/chess-knight-icon.svg';
	}
	
}

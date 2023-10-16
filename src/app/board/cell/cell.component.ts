import { Input, Component } from '@angular/core';

@Component({
	selector: 'app-cell',
	templateUrl: './cell.component.html',
	styleUrls: ['./cell.component.scss']
})
export class CellComponent {

	@Input() point!: IPoint;


	public isWhite(x: number, y: number): boolean {
		if (x % 2 == 0 && y % 2 == 0) {
			return false;
		}
		if (x % 2 == 0 && y % 2 != 0) {
			return true;
		}
		if (x % 2 != 0 && y % 2 == 0) {
			return true;
		}
		return false;
	}
}

export interface IPoint {
	x: number;
	y: number;
}

export class Point {
	constructor(public x: number, public y: number){
		
	}
}

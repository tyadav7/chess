import { Injectable } from '@angular/core';
import { IObstructionValidator, ObstructionTypes } from './i-obstruction-validator';
import { BoardService } from 'src/app/board/board.service';
import { IPoint } from 'src/app/board/cell/cell.component';

@Injectable({
	providedIn: 'root'
})
export class ObstructionValidatorService implements IObstructionValidator {

	constructor(private boardService: BoardService) { }

	checkIfSameSpot(from: IPoint, to: IPoint): boolean {
		if (from.x === to.x && from.y === to.y) {
			return true;
		}
		return false;
	}

	checkIfObstructionInStraightLine(from: IPoint, to: IPoint): boolean {
		let checkIfObstructionInStraightLine = (from: IPoint, to: IPoint) => {
			if (from.x === to.x) {
				let min = Math.min(from.y, to.y);
				let max = Math.max(from.y, to.y);
				for (let i = min + 1; i < max; i++) {
					if (this.boardService.view[from.x][i]) {
						return true;
					}
				}
			}
			if (from.y === to.y) {
				let min = Math.min(from.x, to.x);
				let max = Math.max(from.x, to.x);
				for (let i = min + 1; i < max; i++) {
					if (this.boardService.view[i][from.y]) {
						return true;
					}
				}
			}
			return false;
		}

		if(!this.checkIfSameSpot(from, to)) {
			return checkIfObstructionInStraightLine(from, to);
		}

		return false;
	}

	checkIfObstructionInDiagonal(from: IPoint, to: IPoint): boolean {
		let checkIfObstructionInDiagonal = (from: IPoint, to: IPoint) => {
			let x = from.x;
			let y = from.y;
			let xDirection = from.x < to.x ? 1 : -1;
			let yDirection = from.y < to.y ? 1 : -1;
			while (x !== to.x && y !== to.y) {
				x += xDirection;
				y += yDirection;
				if (this.boardService.view[x][y]) {
					return true;
				}
			}
			return false;
		}

		if(!this.checkIfSameSpot(from, to)) {
			return checkIfObstructionInDiagonal(from, to);
		}

		return false;
	}

	validate(from: IPoint, to: IPoint, validators:ObstructionTypes[]): boolean {
		let checkIfObstruction = (from: IPoint, to: IPoint, validators:ObstructionTypes[]) => {
			for(let validator of validators) {
				switch(validator) {
					case ObstructionTypes.STRAIGHT:
						if(this.checkIfObstructionInStraightLine(from, to)) {
							return true;
						}
						break;
					case ObstructionTypes.DIAGONAL:
						if(this.checkIfObstructionInDiagonal(from, to)) {
							return true;
						}
						break;
					case ObstructionTypes.KNIGHT:
						break;
				}
			}
			return false;
		}

		return checkIfObstruction(from, to, validators);
	}

	
}

import { Injectable } from '@angular/core';
import { BoardService } from 'src/app/board/board.service';
import { IPoint } from 'src/app/board/cell/cell.component';
import { IObstructionValidator } from './i-obstruction-validator';

@Injectable({
	providedIn: 'root'
})
export class ObstructionValidatorService implements IObstructionValidator {

	constructor(private boardService: BoardService) { }

	private checkIfSameSpot(from: IPoint, to: IPoint): boolean {
		if (from.x === to.x && from.y === to.y) {
			return true;
		}
		return false;
	}

	checkIfSpotIsOccupied(to: IPoint): boolean {
		if (this.boardService.view[to.x][to.y]) {
			return true;
		}
		return false;
	}

	private checkIfObstructionInStraightLine(from: IPoint, to: IPoint): boolean {
		let checkIfObstructionInStraightLine = (from: IPoint, to: IPoint) => {
			if(from.x !== to.x && from.y !== to.y) {
				throw new Error('Not a straight line move');
			}
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

	private checkIfObstructionInDiagonal(from: IPoint, to: IPoint): boolean {
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

	isObstructed(from: IPoint, to: IPoint): boolean {
		let checkIfMoveInStraightLine = (from: IPoint, to: IPoint) => {
			if(from.x !== to.x && from.y !== to.y) {
				return false;
			}
			return true;
		}

		let checkIfMoveDiaganoally = (from: IPoint, to: IPoint) => {
			if(Math.abs(from.x - to.x) !== Math.abs(from.y - to.y)) {
				return false;
			}
			return true;
		}

		let checkIfObstruction = (from: IPoint, to: IPoint) => {
			if(checkIfMoveInStraightLine(from, to)) {
				return this.checkIfObstructionInStraightLine(from, to);
			}
			if(checkIfMoveDiaganoally(from, to)) {
				return this.checkIfObstructionInDiagonal(from, to);
			}
			throw new Error('Move not straight or diagonal');
		}

		return checkIfObstruction(from, to);
	}
}

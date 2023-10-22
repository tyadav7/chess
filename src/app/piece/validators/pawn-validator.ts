import { Injectable } from "@angular/core";
import { IPoint } from "src/app/board/cell/cell.component";
import { IMoveValidator } from "./i-move-validator";
import { MoveValidator } from "./move-validator";

@Injectable({
    providedIn: 'root'
})
export class PawnValidator extends MoveValidator implements IMoveValidator {

    override validateMove(from: IPoint, to: IPoint): boolean {

        let ifToOccupied = (): boolean => {
            return this.obstructionValidator.checkIfSpotIsOccupied(to);
        }

        let ifToOccupiedByOpponent = (): boolean => {
            return this.boardService.view[to.x][to.y] && this.boardService.view[to.x][to.y].player !== this.playerService.currentPlayer;
        }

        let ifObstructed = (): boolean => {
            return this.obstructionValidator.isObstructed(from, to);
        }

        let isInitialPawnMoveValid = (): boolean => {
            return to.y - from.y === 0 && to.x - from.x === 2 * this.direction && !ifObstructed() && !ifToOccupied();
        }

        let isStandardPawnMoveValid = (): boolean => {
            return to.y - from.y === 0 && to.x - from.x === this.direction && !ifToOccupied();
        }

        let isPawnCaptureMoveValid = (): boolean => {
            return Math.abs(to.y - from.y) === 1 && to.x - from.x === this.direction && ifToOccupiedByOpponent();
        }

        if(isInitialPawnMoveValid()){
            return true
        }

        if (isStandardPawnMoveValid()) {
            return true;
        }

        if(isPawnCaptureMoveValid()){
            return true;
        }

        return false;
    }

   
}
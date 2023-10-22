import { Injectable } from "@angular/core";
import { IPoint } from "src/app/board/cell/cell.component";
import { IMoveValidator } from "./i-move-validator";
import { MoveValidator } from "./move-validator";

@Injectable({
    providedIn: 'root'
})
export class RookValidator extends MoveValidator implements IMoveValidator {

    override validateMove(from: IPoint, to: IPoint): boolean {

        let isToOccupied = (): boolean => {
            return this.obstructionValidatorService.checkIfSpotIsOccupied(to);
        }

        let isToOccupiedByOpponent = (): boolean => {
            return this.boardService.view[to.x][to.y] && this.boardService.view[to.x][to.y].player !== this.playerService.currentPlayer;
        }

        let isObstructed = (): boolean => {
            return this.obstructionValidatorService.isObstructed(from, to);
        }

        let isStraightMove = (): boolean => {
            return (to.y - from.y === 0 || to.x - from.x === 0);
        }

        let isRookMoveValid = (): boolean => {
            return isStraightMove() && !isObstructed() && !isToOccupied();
        }

        let isRookCaptureMoveValid = (): boolean => {
            return isStraightMove() && !isObstructed() && isToOccupiedByOpponent();
        }

        if(isRookMoveValid()){
            return true;
        }

        if(isRookCaptureMoveValid()){
            return true;
        }

        return false;
    }

}
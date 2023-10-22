import { Injectable } from "@angular/core";
import { IPoint } from "src/app/board/cell/cell.component";
import { IMoveValidator } from "./i-move-validator";
import { MoveValidator } from "./move-validator";

@Injectable({
    providedIn: 'root'
})
export class BishopValidator extends MoveValidator implements IMoveValidator {

    override validateMove(from: IPoint, to: IPoint): boolean {
        
        let isToOccpuied = (): boolean => {
            return this.obstructionValidatorService.checkIfSpotIsOccupied(to);
        }

        let isToOccpuiedByOpponent = (): boolean => {
            return this.boardService.view[to.x][to.y] && this.boardService.view[to.x][to.y].player !== this.playerService.currentPlayer;
        }

        let isDiagonalMove = (): boolean => {
            return Math.abs(to.x - from.x) === Math.abs(to.y - from.y);
        }

        let isObstructed = (): boolean => {
            return this.obstructionValidatorService.isObstructed(from, to);
        }

        let isBishopMoveValid = (): boolean => {
            return isDiagonalMove() && !isObstructed() && !isToOccpuied();
        }
        
        let isBishopCaptureMoveValid = (): boolean => {
            return isDiagonalMove() && !isObstructed() && isToOccpuiedByOpponent();
        }

        if(isBishopMoveValid()){
            return true;
        }

        if(isBishopCaptureMoveValid()){
            return true;
        }

        return false;
    }
}
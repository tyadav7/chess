import { Injectable } from "@angular/core";
import { IPoint } from "src/app/board/cell/cell.component";
import { ObstructionTypes } from "../obstructors/i-obstruction-validator";
import { IMoveValidator } from "./i-move-validator";
import { MoveValidator } from "./move-validator";

@Injectable({
    providedIn: 'root'
})
export class PawnValidator extends MoveValidator implements IMoveValidator {

    validate(from: IPoint, to: IPoint): boolean {
        let checkIfPawnMoved2SpotsFromStartingPosition = (from: IPoint, to: IPoint) => {
            if(this.obstructionValidatorService.validate(from, to, [ObstructionTypes.STRAIGHT])) {
                return false;
            }
            if(from.x === 1 && to.x === 3 && this.player1) {
                return true;
            }
            if(from.x === 6 && to.x === 4 && this.player2) {
                return true;
            }
            return false;
        }

        let checkIfPawnMoved1Step = (from: IPoint, to: IPoint) => {
            if(this.obstructionValidatorService.validate(from, to, [ObstructionTypes.STRAIGHT])) {
                return false;
            }
            if(from.x === to.x + 1 && this.player1) {
                return true;
            }
            if(from.x === to.x - 1 && this.player2) {
                return true;
            }
            return false;
        }

        let checkIfPawnCaptures = (from: IPoint, to: IPoint) => {
            let opponentPiecePresent = (position: IPoint) => {
                return this.boardService.view[position.x][position.y] && this.boardService.view[position.x][position.y].player !== this.playerService.currentPlayer;
            }

            if(this.obstructionValidatorService.validate(from, to, [ObstructionTypes.DIAGONAL])) {
                return false;
            }
            if(from.x === to.x + 1 && Math.abs(from.y - to.y) === 1 && this.player1 && opponentPiecePresent(to)) {
                return true;
            }
            if(from.x === to.x - 1 && Math.abs(from.y - to.y) === 1 && this.player2 && opponentPiecePresent(to)) {
                return true;
            }
            return false;
        }

        return checkIfPawnMoved2SpotsFromStartingPosition(from, to) || checkIfPawnMoved1Step(from, to) || checkIfPawnCaptures(from, to);
    }
}
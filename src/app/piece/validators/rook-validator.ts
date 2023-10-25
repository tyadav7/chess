import { Injectable } from "@angular/core";
import { IPoint } from "src/app/board/cell/cell.component";
import { IMoveValidator } from "./i-move-validator";
import { MoveValidator } from "./move-validator";

@Injectable({
    providedIn: 'root'
})
export class RookValidator extends MoveValidator implements IMoveValidator {

    override validateMove(from: IPoint, to: IPoint): boolean {

        let isObstructed = this.isObstructed(from, to);
        let isToOccupied = this.isToOccupied(to);
        let isToOccupiedByOpponent = this.isToOccupiedByOpponent(from, to);

        let isStraightMove = (): boolean => {
            return (to.y - from.y === 0 || to.x - from.x === 0);
        }

        let isRookMoveValid = (): boolean => {
            return isStraightMove() && !isObstructed && !isToOccupied;
        }

        let isRookCaptureMoveValid = (): boolean => {
            return isStraightMove() && !isObstructed && isToOccupiedByOpponent;
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
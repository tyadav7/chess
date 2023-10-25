import { Injectable } from "@angular/core";
import { IPoint } from "src/app/board/cell/cell.component";
import { IMoveValidator } from "./i-move-validator";
import { MoveValidator } from "./move-validator";

@Injectable({
    providedIn: 'root'
})
export class KnightValidator extends MoveValidator implements IMoveValidator {

    override validateMove(from: IPoint, to: IPoint): boolean {

        let isToOccupied = this.isToOccupied(to);
        let isToOccupiedByOpponent = this.isToOccupiedByOpponent(from, to);

        let isValidKnightMove = (): boolean => {
            return (Math.abs(to.x - from.x) === 2 && Math.abs(to.y - from.y) === 1) || (Math.abs(to.x - from.x) === 1 && Math.abs(to.y - from.y) === 2);
        }

        let isValidKnightCaptureMove = (): boolean => {
            return isValidKnightMove() && isToOccupiedByOpponent;
        }

        if(isValidKnightMove() && !isToOccupied) {
            return true;
        }

        if(isValidKnightCaptureMove()) {
            return true;
        }
        
        return false;
    }
}
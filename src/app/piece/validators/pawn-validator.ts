import { Injectable } from "@angular/core";
import { IPoint } from "src/app/board/cell/cell.component";
import { IMoveValidator } from "./i-move-validator";
import { MoveValidator } from "./move-validator";
import { MOVETYPES } from "../pieces/i-piece";

@Injectable({
    providedIn: 'root'
})
export class PawnValidator extends MoveValidator implements IMoveValidator {

    override validateMove(from: IPoint, to: IPoint): boolean {

        let isObstructed = this.isObstructed(from, to);
        let isToOccupied = this.isToOccupied(to);
        let isToOccupiedByOpponent = this.isToOccupiedByOpponent(from, to);

        let isInitialPawnMoveValid = (): boolean => {
            return to.y - from.y === 0 && to.x - from.x === 2 * this.direction(from) && !isObstructed && !isToOccupied;
        }

        let isStandardPawnMoveValid = (): boolean => {
            return to.y - from.y === 0 && to.x - from.x === this.direction(from) && !isToOccupied;
        }

        let isPawnCaptureMoveValid = (): boolean => {
            return Math.abs(to.y - from.y) === 1 && to.x - from.x === this.direction(from) && isToOccupiedByOpponent;
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

    public override isSpecialMoveValid(from: IPoint, to: IPoint): MOVETYPES {
        let pawnPromoted = (): boolean => {
            return to.x === 0 && this.direction(from) === -1 || to.x === 7 && this.direction(from) === 1;
        }

        if(pawnPromoted()) {
            return MOVETYPES.PROMOTION;
        }
        return MOVETYPES.SIMPLE
    }

   
}
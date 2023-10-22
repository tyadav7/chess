import { Injectable } from "@angular/core";
import { IPoint } from "src/app/board/cell/cell.component";
import { IMoveValidator } from "./i-move-validator";
import { MoveValidator } from "./move-validator";

@Injectable({
    providedIn: 'root'
})
export class BishopValidator extends MoveValidator implements IMoveValidator {

    override validateMove(from: IPoint, to: IPoint): boolean {

        let isObstructed = this.isObstructed(from, to);
        let isToOccupied = this.isToOccupied(to);
        let isToOccupiedByOpponent = this.isToOccupiedByOpponent(to);
        
        let isDiagonalMove = (): boolean => {
            return Math.abs(to.x - from.x) === Math.abs(to.y - from.y);
        }

        let isBishopMoveValid = (): boolean => {
            return isDiagonalMove() && !isObstructed && !isToOccupied;
        }
        
        let isBishopCaptureMoveValid = (): boolean => {
            return isDiagonalMove() && !isObstructed && isToOccupiedByOpponent;
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
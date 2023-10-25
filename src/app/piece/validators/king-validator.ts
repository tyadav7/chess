import { Injectable } from "@angular/core";
import { IPoint } from "src/app/board/cell/cell.component";
import { MOVETYPES } from "../pieces/i-piece";
import { IMoveValidator } from "./i-move-validator";
import { MoveValidator } from "./move-validator";
import { Rook } from "../pieces/rook";

@Injectable({
    providedIn: 'root'
})
export class KingValidator extends MoveValidator implements IMoveValidator {
    
    isKingCastleMoveValid(from:IPoint, to:IPoint):boolean {
        let isObstructed = this.isObstructed(from, to);
        let rookMoved = (position:IPoint) => {
            let rookY: number = 0;
            if(position.y == 5) {
                rookY = 7;
            }
            let rook: Rook = this.boardService.view[position.x][rookY] as Rook;
            if(rook instanceof Rook) {
                return rook.moved;
            }
            return true;
        }
        let isNotKingCastleMove = () => {
            return from.x !== to.x || Math.abs(to.y - from.y) !== 2;
        }
        if(this.playerService.currentPlayer.king.moved) {
            return false;
        }
        if(rookMoved(to)) {
            return false;
        }
        if(isNotKingCastleMove()) {
            return false;
        }
        if(isObstructed){
            return false;
        }
        return true;
    }

    override validateMove(from: IPoint, to: IPoint): boolean {

        let isToOccupied = this.isToOccupied(to);
        let isToOccupiedByOpponent = this.isToOccupiedByOpponent(from, to);

        let isStandardKingMove = (): boolean => {
            return Math.abs(to.x - from.x) <= 1 && Math.abs(to.y - from.y) <= 1;
        }

        let isStandardKingMoveValid = (): boolean => {
            return isStandardKingMove() && !isToOccupied;
        }

        let isKingCaptureMoveValid = (): boolean => {
            return isStandardKingMove() && isToOccupiedByOpponent;
        }

        let isKingCastleMoveValid = (): boolean => {
            return this.isKingCastleMoveValid(from, to);
        }

        if(isStandardKingMoveValid()){
            return true;
        }

        if(isKingCaptureMoveValid()){
            return true;
        }

        if(isKingCastleMoveValid()){
            return true;
        }

        return false;
    }

    override isSpecialMoveValid(from: IPoint, to:IPoint): MOVETYPES {
        let isKingSideCastle = () => {
            return to.y == 6;    
        }
        if(this.isKingCastleMoveValid(from,to)){
            if(isKingSideCastle())
                return MOVETYPES.CASTLINGK;
            return MOVETYPES.CASTLINGQ;
        }
        return MOVETYPES.SIMPLE;
    }
}
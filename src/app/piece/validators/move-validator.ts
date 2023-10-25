import { Inject, Injectable } from "@angular/core";
import { IPoint } from "src/app/board/cell/cell.component";
import { IBoardService } from "src/app/board/i-board-service";
import { IPlayerService } from "src/app/player/i-player.service";
import { IObstructionValidator } from "../obstructors/i-obstruction-validator";
import { IMoveValidator } from "./i-move-validator";
import { IPiece, MOVETYPES } from "../pieces/i-piece";

@Injectable()
export abstract class MoveValidator implements IMoveValidator {

    abstract validateMove(from: IPoint, to: IPoint): boolean;

    constructor(
        @Inject('IBoardService') private _boardService: IBoardService, 
        @Inject('IPlayerService') private _playerService: IPlayerService, 
        @Inject('IObstructionValidator') private _obstructionValidator: IObstructionValidator) {
    }

    protected isObstructed(from: IPoint, to: IPoint): boolean {
        return this._obstructionValidator.isObstructed(from, to);
    }

    protected isToOccupied(to: IPoint): boolean {
        return this._obstructionValidator.checkIfSpotIsOccupied(to);
    }

    protected isToOccupiedByOpponent(from: IPoint, to:IPoint): boolean {
        return this.isToOccupied(to) && this.boardService.view[to.x][to.y] && this.boardService.view[to.x][to.y].player !== this.boardService.view[from.x][from.y].player;
    }

    public isOpponentKingInCheck(piece: IPiece): boolean {
        if(this.playerService.currentPlayer.king)
            return this.validateMove(piece.position, this.playerService.currentPlayer.king.position);
        return false;
    }

    protected direction(from:IPoint) {
        return this.boardService.view[from.x][from.y].player === this.playerService.player1 ? 1 : -1;
    }

    protected get boardService() {
        return this._boardService;
    }

    protected get playerService() {
        return this._playerService;
    }

    protected get obstructionValidator() {
        return this._obstructionValidator;
    }

    public isSpecialMoveValid(from: IPoint, to: IPoint): MOVETYPES {
        return MOVETYPES.SIMPLE;
    }
}
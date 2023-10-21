import { Inject, Injectable } from "@angular/core";
import { IPoint } from "src/app/board/cell/cell.component";
import { IBoardService } from "src/app/board/i-board-service";
import { IPlayerService } from "src/app/player/i-player.service";
import { IObstructionValidator } from "../obstructors/i-obstruction-validator";
import { IMoveValidator } from "./i-move-validator";

@Injectable()
export abstract class MoveValidator implements IMoveValidator {

    abstract validateMove(from: IPoint, to: IPoint): boolean;

    constructor(
        @Inject('IBoardService') private _boardService: IBoardService, 
        @Inject('IPlayerService') private _playerService: IPlayerService, 
        @Inject('IObstructionValidator') private _obstructionValidatorService: IObstructionValidator) {
    }

    public get direction() {
        return this.playerService.currentPlayer === this.playerService.player1 ? 1 : -1;
    }

    public get boardService() {
        return this._boardService;
    }

    public get playerService() {
        return this._playerService;
    }

    public get obstructionValidatorService() {
        return this._obstructionValidatorService;
    }
}
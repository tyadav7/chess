import { Inject, Injectable } from "@angular/core";
import { BoardService } from "src/app/board/board.service";
import { IMoveValidator } from "./i-move-validator";
import { IPoint } from "src/app/board/cell/cell.component";
import { PlayerService } from "src/app/player/player.service";
import { IObstructionValidator } from "../obstructors/i-obstruction-validator";

@Injectable()
export abstract class MoveValidator implements IMoveValidator {

    abstract validate(from: IPoint, to: IPoint): boolean;

    constructor(
        private _boardService: BoardService, 
        private _playerService: PlayerService, 
        @Inject('IObstructionValidator') private _obstructionValidatorService: IObstructionValidator) {
    }

    public get player1() {
        return this._playerService.currentPlayer === this._playerService.player1;
    }

    public get player2() {
        return this._playerService.currentPlayer === this._playerService.player2;
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
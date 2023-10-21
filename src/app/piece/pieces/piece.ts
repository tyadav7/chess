import { IPoint } from "src/app/board/cell/cell.component";
import { IMoveValidator } from "../validators/i-move-validator";
import { IPiece } from "./i-piece";
import { IPlayer, Player } from "src/app/player/player";

export abstract class Piece implements IPiece {

    private _moveValidator!: IMoveValidator;
    abstract img: string;
    abstract name: string;

    constructor(public position:IPoint, private _player: IPlayer) {

    }

    public set moveValidator(moveValidator: IMoveValidator) {
        this._moveValidator = moveValidator;
    }

    public get moveValidator() {
        return this._moveValidator;
    }

    public get player() {
        return this._player;
    }
}
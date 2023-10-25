import { IPoint } from "src/app/board/cell/cell.component";
import { IMoveValidator } from "../validators/i-move-validator";
import { IPiece, MOVETYPES } from "./i-piece";
import { IPlayer, Player } from "src/app/player/player";

export abstract class Piece implements IPiece {

    private _moveValidator!: IMoveValidator;
    abstract img: string;
    abstract name: string;

    constructor(public position:IPoint, private _player: IPlayer) {
        this._player.pieces.push(this);
    }

    public makeMove(to:IPoint) {
        this.position = to;
    }

    public isSpecialMove(to: IPoint): MOVETYPES {
        return this._moveValidator.isSpecialMoveValid(this.position, to);
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

    public get isOpponentKingInCheck(): boolean {
        if(this._moveValidator)
            return this._moveValidator.isOpponentKingInCheck(this);
        return false;
    }
}
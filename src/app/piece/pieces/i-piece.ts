import { Player } from "src/app/player/player";
import { IPoint } from "../../board/cell/cell.component";
import { IMoveValidator } from "../validators/i-move-validator";


export interface IPiece {
    img: string;
    position: IPoint;
    player: Player;
    name: string;
    validMove(to: IPoint): boolean;
    moveValidator: IMoveValidator;
}
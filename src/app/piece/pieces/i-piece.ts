import { IPlayer } from "src/app/player/player";
import { IPoint } from "../../board/cell/cell.component";
import { IMoveValidator } from "../validators/i-move-validator";


export interface IPiece {
    img: string;
    position: IPoint;
    player: IPlayer;
    name: string;
    moveValidator: IMoveValidator;
}
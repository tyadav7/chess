import { IPoint } from "../../board/cell/cell.component";


export interface IPiece {
    img: string;
    position: IPoint;
    color: string;
    name: string;
    validMove(to: IPoint): boolean;
}
import { IPoint } from "src/app/board/cell/cell.component";
import { IPiece, MOVETYPES } from "../pieces/i-piece";

export interface IMoveValidator {
    validateMove(from: IPoint, to: IPoint): boolean;
    isOpponentKingInCheck(piece:IPiece): boolean;
    isSpecialMoveValid(from: IPoint, to: IPoint): MOVETYPES;
}
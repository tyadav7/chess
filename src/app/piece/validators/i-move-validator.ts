import { IPoint } from "src/app/board/cell/cell.component";

export interface IMoveValidator {
    validateMove(from: IPoint, to: IPoint): boolean;
}
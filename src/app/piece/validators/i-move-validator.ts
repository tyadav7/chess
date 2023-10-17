import { IPoint } from "src/app/board/cell/cell.component";

export interface IMoveValidator {
    validate(from: IPoint, to: IPoint): boolean;
}
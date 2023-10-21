import { IPoint } from '../../board/cell/cell.component';

export interface IObstructionValidator {
    isObstructed(from: IPoint, to: IPoint): boolean;
    checkIfSpotIsOccupied(to: IPoint): boolean;
}
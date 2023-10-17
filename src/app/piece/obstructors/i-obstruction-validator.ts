import { IPoint } from '../../board/cell/cell.component';

export interface IObstructionValidator {
    validate(from: IPoint, to: IPoint, validators:ObstructionTypes[]): boolean;
}

export enum ObstructionTypes {
    STRAIGHT = 'STRAIGHT',
    DIAGONAL = 'DIAGONAL',
    KNIGHT = 'KNIGHT'
}
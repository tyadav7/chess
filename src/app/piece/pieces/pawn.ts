import { IPoint } from "../../board/cell/cell.component";
import { IPiece } from "./i-piece";
import { Piece } from "./piece";

export class Pawn extends Piece implements IPiece {

    public get name() {
        return "Pawn";
    }

    public get img() {
        return '/assets/svgs/chess-pawn-icon.svg';
    }
}
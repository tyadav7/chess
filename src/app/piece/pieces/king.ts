import { IPoint } from "src/app/board/cell/cell.component";
import { IPiece } from "./i-piece";
import { Piece } from "./piece";

export class King extends Piece implements IPiece {

    override validMove(to: IPoint): boolean {
        return true;
    }

    public get name() {
        return "King";
    }

    get img() {
        return '/assets/svgs/chess-king-icon.svg';
    }
}
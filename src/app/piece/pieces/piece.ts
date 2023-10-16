import { IPoint } from "src/app/board/cell/cell.component";
import { IPiece } from "./i-piece";

export abstract class Piece implements IPiece {
    
    abstract img: string;
    abstract name: string;
    constructor(public position:IPoint, private _color: string) {

    }

    public validMove(to:IPoint): boolean {
        if(this.position.x === to.x && this.position.y === to.y) {
            return false;
        }
        return true;
    }

    public get color() {
        return this._color;
    }
}
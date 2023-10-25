import { IPoint } from "src/app/board/cell/cell.component";
import { IPiece } from "./i-piece";
import { Piece } from "./piece";
import { Component } from "@angular/core";
import { KingValidator } from "../validators/king-validator";
import { PieceComponent } from "../piece.component";

@Component({
	selector: 'app-king',
	templateUrl: '../piece.component.html',
	styleUrls: ['../piece.component.scss'],
	providers: [{ provide: 'IMoveValidator', useExisting: KingValidator }]
})

export class KingComponent extends PieceComponent {
}

export class King extends Piece implements IPiece {

    private _moved: boolean = false;
    
    public override makeMove(to: IPoint): void {
        this.position = to;
        this._moved = true;    
    }

    public get moved(){
        return this._moved;
    }

    public get name() {
        return "King";
    }

    get img() {
        return '/assets/svgs/chess-king-icon.svg';
    }
}
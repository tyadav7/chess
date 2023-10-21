import { Component } from "@angular/core";
import { PieceComponent } from "../piece.component";
import { PawnValidator } from "../validators/pawn-validator";
import { IPiece } from "./i-piece";
import { Piece } from "./piece";


@Component({
    selector: 'app-pawn',
    templateUrl: '../piece.component.html',
    styleUrls: ['../piece.component.scss'],
    providers: [{ provide: 'IMoveValidator', useExisting: PawnValidator }]
})
export class PawnComponent extends PieceComponent {
}

export class Pawn extends Piece implements IPiece {

    public get name() {
        return "Pawn";
    }

    public get img() {
        return '/assets/svgs/chess-pawn-icon.svg';
    }

}
import { Component } from "@angular/core";
import { PieceComponent } from "../piece.component";
import { IPiece } from "./i-piece";
import { Piece } from "./piece";
import { PawnValidator } from "../validators/pawn-validator";
import { ObstructionValidatorService } from "../obstructors/obstruction.service";


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
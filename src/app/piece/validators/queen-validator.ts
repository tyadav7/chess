import { Injectable, Inject } from "@angular/core";
import { IPoint } from "src/app/board/cell/cell.component";
import { IMoveValidator } from "./i-move-validator";
import { MoveValidator } from "./move-validator";
import { BishopValidator } from "./bishop-validator";
import { IBoardService } from "src/app/board/i-board-service";
import { IPlayerService } from "src/app/player/i-player.service";
import { IObstructionValidator } from "../obstructors/i-obstruction-validator";
import { RookValidator } from "./rook-validator";

@Injectable({
    providedIn: 'root'
})
export class QueenValidator extends MoveValidator implements IMoveValidator {

    constructor(
        @Inject('IBoardService') _boardService: IBoardService,
        @Inject('IPlayerService') _playerService: IPlayerService,
        @Inject('IObstructionValidator') _obstructionValidator: IObstructionValidator,
        private diagonolValidator: BishopValidator,
        private straightLineValidator: RookValidator) {
            super(_boardService, _playerService, _obstructionValidator);
        }

    override validateMove(from: IPoint, to: IPoint): boolean {

        let isQueenDianolMoveValid = (): boolean => {
            return this.diagonolValidator.validateMove(from, to);
        }

        let isQueenStraightLineMoveValid = (): boolean => {
            return this.straightLineValidator.validateMove(from, to);
        }

        let isQueenMoveValid = (): boolean => {
            return isQueenDianolMoveValid() || isQueenStraightLineMoveValid();
        }

        if(isQueenMoveValid()){
            return true;
        }
        return false;
    }

}
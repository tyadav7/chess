import { Injectable } from "@angular/core";
import { BoardService } from "src/app/board/board.service";
import { MoveValidator } from "./move-validator";
import { IMoveValidator } from "./i-move-validator";
import { IPoint } from "src/app/board/cell/cell.component";

@Injectable({
    providedIn: 'root'
})
export class KnightValidator extends MoveValidator implements IMoveValidator {

    override validate(from: IPoint, to: IPoint): boolean {
        throw new Error("Method not implemented.");
    }
}
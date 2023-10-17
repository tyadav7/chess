import { Injectable } from "@angular/core";
import { BoardService } from "src/app/board/board.service";
import { IMoveValidator } from "./i-move-validator";
import { MoveValidator } from "./move-validator";
import { PlayerService } from "src/app/player/player.service";
import { IObstructionValidator } from "../obstructors/i-obstruction-validator";
import { IPoint } from "src/app/board/cell/cell.component";

@Injectable({
    providedIn: 'root'
})
export class KingValidator extends MoveValidator implements IMoveValidator {
    
    override validate(from: IPoint, to: IPoint): boolean {
        throw new Error("Method not implemented.");
    }
}
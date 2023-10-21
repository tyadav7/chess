import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { BoardService } from './board/board.service';
import { CellComponent } from './board/cell/cell.component';
import { DraggableDirective } from './piece/draggable.directive';
import { MovableAreaDirective } from './piece/movable-area.directive';
import { MovableDirective } from './piece/movable.directive';
import { ObstructionValidatorService } from './piece/obstructors/obstruction.service';
import { PieceComponent } from './piece/piece.component';
import { BishopComponent } from './piece/pieces/bishop';
import { KingComponent } from './piece/pieces/king';
import { KnightComponent } from './piece/pieces/knight';
import { PawnComponent } from './piece/pieces/pawn';
import { QueenComponent } from './piece/pieces/queen';
import { RookComponent } from './piece/pieces/rook';
import { PlayerService } from './player/player.service';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CellComponent,
    PawnComponent,
    RookComponent,
    KingComponent,
    QueenComponent,
    BishopComponent,
    KnightComponent,
    DraggableDirective,
    MovableDirective,
    MovableAreaDirective,
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    { provide: 'IBoardService', useExisting: BoardService },
    { provide: 'IPlayerService', useExisting: PlayerService },
    { provide: 'IObstructionValidator', useExisting: ObstructionValidatorService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

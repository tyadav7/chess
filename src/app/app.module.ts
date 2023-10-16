import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CellComponent } from './board/cell/cell.component';
import { MovableAreaDirective } from './piece/movable-area.directive';
import { DraggableDirective } from './piece/draggable.directive';
import { PieceComponent } from './piece/piece.component';
import { MovableDirective } from './piece/movable.directive';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CellComponent,
    PieceComponent,
    DraggableDirective,
    MovableDirective,
    MovableAreaDirective,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

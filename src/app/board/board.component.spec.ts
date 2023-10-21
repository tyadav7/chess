import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponents } from 'ng-mocks';
import { of } from 'rxjs';
import { KingComponent } from '../piece/pieces/king';
import { KnightComponent } from '../piece/pieces/knight';
import { PawnComponent } from '../piece/pieces/pawn';
import { QueenComponent } from '../piece/pieces/queen';
import { RookComponent } from '../piece/pieces/rook';
import { BoardComponent } from './board.component';
import { CellComponent, IPoint } from './cell/cell.component';

const playerServiceMock = {
  currentPlayer: { color: 'White' },
  players: [],
};

const boardServiceMock = {
  resetMove$: of(false),
  view: [[]], // Replace with an example view array
  pick: (position:IPoint) => {},
  drop: (position:IPoint) => {},
};

describe('BoardComponent', () => {
  let fixture: ComponentFixture<BoardComponent>;
  let component: BoardComponent;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BoardComponent, 
        MockComponents(
          CellComponent, 
          KnightComponent, 
          RookComponent, 
          PawnComponent, 
          KingComponent, 
          QueenComponent)],
      providers: [
        { provide: 'IPlayerService', useValue: playerServiceMock },
        { provide: 'IBoardService', useValue: boardServiceMock },
      ],
    });

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the current player\'s turn', () => {
    fixture.detectChanges();
    const currentPlayerTurnElement = debugElement.query(By.css('.player-label'));
    expect(currentPlayerTurnElement.nativeElement.textContent).toContain("White's turn");
  });

  it('should trigger onPiecePicked and onPieceDropped', () => {
    spyOn(boardServiceMock, 'pick');
    spyOn(boardServiceMock, 'drop');

    fixture.detectChanges();

    // Simulate picking and dropping
    const position: IPoint = { x: 0, y: 0 };
    const boardElement = debugElement.query(By.css('.board'));

    boardElement.triggerEventHandler('pick', position);
    boardElement.triggerEventHandler('drop', position);

    expect(boardServiceMock.pick).toHaveBeenCalledWith(position);
    expect(boardServiceMock.drop).toHaveBeenCalledWith(position);
  });
});
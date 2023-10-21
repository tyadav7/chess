import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { BoardService } from './board/board.service';
import { PlayerService } from './player/player.service';
import { MockComponent } from 'ng-mocks';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent, MockComponent(BoardComponent)],
    providers: [{
      provide: 'IBoardService',
      useClass: BoardService
    },
    {
      provide: 'IPlayerService',
      useClass: PlayerService
    }]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'chess'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('chess');
  });

  it('should render board-component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-board')).toBeTruthy();
  });
});

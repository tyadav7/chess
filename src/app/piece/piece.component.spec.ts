import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockService } from 'ng-mocks';
import { Player } from '../player/player';
import { PieceComponent } from './piece.component';
import { IPiece } from './pieces/i-piece';
import { Pawn } from './pieces/pawn';
import { PawnValidator } from './validators/pawn-validator';

const mockPiece = new Pawn({ x: 0, y: 0 }, new Player('white', 'player1'));
const mockPawnValidator = MockService(PawnValidator);

@Component({
  selector: 'app-test-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss'],
  providers: [{ provide: 'IMoveValidator', useValue: mockPawnValidator }]
})
class TestPieceComponent extends PieceComponent {
}
@Component({
  template: `<app-test-piece [piece]="piece"></app-test-piece>`
})
class TestHostComponent {
  piece: IPiece = mockPiece;
}

describe('PieceComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let pieceComponent: PieceComponent;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        TestPieceComponent
      ]
    });

    fixture = TestBed.createComponent(TestHostComponent);
    pieceComponent = fixture.debugElement.query(By.css('app-test-piece')).componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create the component', () => {
    expect(pieceComponent).toBeTruthy();
  });

  it('should set the piece input correctly', () => {
    fixture.detectChanges();
    expect(pieceComponent.piece).toBe(mockPiece);
  });

  it('should set the piece moveValidator', () => {
    fixture.detectChanges();
    expect(mockPiece.moveValidator).toBeDefined();
    expect(mockPiece.moveValidator).toBeTruthy();
    expect(mockPiece.moveValidator === mockPawnValidator).toBeTruthy();
  });

  it('should render the piece image with the correct attributes', () => {
    fixture.detectChanges();
    const svgElement = debugElement.query(By.css('svg'));
    const useElement = svgElement.query(By.css('use'));
    const imageSource = useElement.nativeElement.getAttribute('xlink:href');
    const fill = useElement.nativeElement.style.fill;
    const altText = useElement.nativeElement.getAttribute('alt');

    expect(imageSource).toBe(mockPiece.img+'#shape');
    expect(fill).toBe(mockPiece.player.color);
    expect(altText).toBe(mockPiece.name);
  });
});
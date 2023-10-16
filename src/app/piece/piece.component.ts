import { Input, Component } from '@angular/core';
import { IPiece } from './pieces/i-piece';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent {
    @Input() public piece!: IPiece;
}

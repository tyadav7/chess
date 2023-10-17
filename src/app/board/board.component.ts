import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardService } from './board.service';
import { Point } from './cell/cell.component';
import { PlayerService } from '../player/player.service';

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss']
})

export class BoardComponent {

	constructor(private playerService:PlayerService, private board: BoardService) {
	}

	public get resetMove$(): Observable<boolean> {
		return this.board.resetMove$;
	}

	public get view() {
		return this.board.view;
	}

	public get players() {
		return this.playerService.players;
	}

	onPiecePicked(position: Point) {
		this.board.pick(position);
	}

	onPieceDropped(position: Point) {
		this.board.drop(position);
	}
}

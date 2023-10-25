import { AfterViewInit, Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlayerService } from '../player/i-player.service';
import { Point } from './cell/cell.component';
import { IBoardService } from './i-board-service';

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss']
})

export class BoardComponent implements AfterViewInit {


	constructor(@Inject('IPlayerService')private playerService:IPlayerService, @Inject('IBoardService') private board: IBoardService) {
	}

	ngAfterViewInit(): void {
		// let moves = ['D2d4 D7d5','C2c4 C7c6','B1c3 G8f6','E2e3 E7e6','G1f3 B8d7','F1d3 D5c4','D3c4 B7b5','C4d3 C8b7','e1g1 A7a6','E3e4 C6c5','D4d5 D8c7','D5e6 F7e6','D3c2 C5c4','F3d4 D7c5','C1e3 E6e5','D4f3 F8e7','F3g5 e8g8 ','E3c5 E7c5','G5e6 C7b6','E6f8 A8f8','C3d5 B7d5','E4d5 C5f2','G1h1 E5e4','D1e2 E4e3','F1d1 B6d6','A2a4 G7g6','A4b5 A6b5','G2g3 F6h5','E2g4 F2g3','H2g3 H5g3','H1g2 F8f2','G2h3 G3f5','D1h1 H7h5','G4g6 D6g6','H1g1 G6g1','A1g1 G8f7'];
		// let counter = 0;
		// setInterval(() => {
		// 	if(counter >= moves.length){
		// 		return;
		// 	}
		// 	console.log('Move -> '+ counter + '-> '+moves[counter]);
		// 	let move = moves[counter++];
		// 	let	moveWhite = move.toUpperCase().split(' ')[0];
		// 	let moveWhiteFrom = moveWhite.substring(0,2);
		// 	let moveWhiteTo = moveWhite.substring(2,4);
		// 	let moveBlack = move.toUpperCase().split(' ')[1];
		// 	let moveBlackFrom = moveBlack.substring(0,2);
		// 	let moveBlackTo = moveBlack.substring(2,4);
		// 	this.board.pick(new Point(Number(moveWhiteFrom[1]) - 1, moveWhiteFrom[0].charCodeAt(0) - 65));
		// 	this.board.drop(new Point(Number(moveWhiteTo[1]) - 1, moveWhiteTo[0].charCodeAt(0) - 65));
		// 	this.board.pick(new Point(Number(moveBlackFrom[1]) - 1, moveBlackFrom[0].charCodeAt(0) - 65));
		// 	this.board.drop(new Point(Number(moveBlackTo[1]) - 1, moveBlackTo[0].charCodeAt(0) - 65));
		// },1000);
	}

	public get opponentPlayer() {
		return this.playerService.opponentPlayer;
	}

	public get currentPlayer() {
		return this.playerService.currentPlayer;
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

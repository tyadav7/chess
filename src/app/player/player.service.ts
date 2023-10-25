import { Injectable } from '@angular/core';
import { Player } from './player';
import { IPlayerService } from './i-player.service';
import { IPiece } from '../piece/pieces/i-piece';

@Injectable({
	providedIn: 'root'
})
export class PlayerService implements IPlayerService {

	private _player1: Player = new Player('white', 'player 1');
	private _player2: Player = new Player('black', 'player 2');
	private _currentPlayer: Player = this.player1;

	constructor() { }

	public onPieceCaptured(piece: IPiece) {
		this.opponentPlayer.capturedPieces.push(piece);
		this.opponentPlayer.pieces.splice(this.opponentPlayer.pieces.indexOf(piece), 1);
	}

	public nextPlayer() {
		this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
	}

	public get players() {
		return [this._player1, this._player2];
	}

	public get player1() {
		return this._player1;
	}

	public get player2() {
		return this._player2;
	}

	public set currentPlayer(player: Player) {
		this._currentPlayer = player;
	}

	public get opponentPlayer() {
		return this.currentPlayer === this.player1 ? this.player2 : this.player1;
	}

	public get currentPlayer() {
		return this._currentPlayer;
	}
}

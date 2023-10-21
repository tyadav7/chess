import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Position } from '../piece/movable.directive';
import { Bishop } from '../piece/pieces/bishop';
import { IPiece } from '../piece/pieces/i-piece';
import { King } from '../piece/pieces/king';
import { Knight } from '../piece/pieces/knight';
import { Pawn } from '../piece/pieces/pawn';
import { Queen } from '../piece/pieces/queen';
import { Rook } from '../piece/pieces/rook';
import { Point } from './cell/cell.component';
import { PlayerService } from '../player/player.service';
import { IBoardService } from './i-board-service';

@Injectable({
	providedIn: 'root',
})
export class BoardService implements IBoardService {

	private _board: any[][] = [];
	private _pickedPiece?: IPiece;
	private _resetMove$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	
	constructor(private playerService: PlayerService) {
		this.initBoard();
		this.initPieces();
	}

	private set pickedPiece(piece: IPiece | undefined) {
		this._pickedPiece = piece;
	}

	private get pickedPiece(): IPiece | undefined {
		if(this._pickedPiece)
			return this._pickedPiece;
		return undefined;
	}

	public get resetMove$() {
		return this._resetMove$.asObservable();
	}

	public resetMove() {
		this._resetMove$.next(true);
		this.pickedPiece = undefined;
		setTimeout(() => {
			this._resetMove$.next(false);
		});
	}

	public pick(dropPosition: Position) {
		let checkIfPieceIsAlreadyPicked = () => {
			if (this.pickedPiece && this.pickedPiece.position.x === dropPosition.x && this.pickedPiece.position.y === dropPosition.y) {
				this.resetMove();
				throw new Error('Piece already picked');
			}
		}

		checkIfPieceIsAlreadyPicked();
		this.pickedPiece = this._board[dropPosition.x][dropPosition.y];
		console.log(this.pickedPiece);
	}

	public drop(position: Position) {
		let checkIfPieceIsPicked = () => {
			if (!this.pickedPiece) {
				this.resetMove();
				throw new Error('No piece picked');
			}
			return true;
		}

		let checkIfCorrectPlayer = () => {
			if(this.pickedPiece?.player != this.playerService.currentPlayer){
				this.resetMove();
				throw new Error('Wrong player');
			}
		}

		console.log(this.pickedPiece);
		checkIfPieceIsPicked();
		checkIfCorrectPlayer();
		if(this.pickedPiece) {
			this.makeMove(this.pickedPiece, position);
		}
	}

	private makeMove(pickedPiece: IPiece, to: Point) {
		let checkIfValidMove = () => {
			return pickedPiece.moveValidator.validateMove(pickedPiece.position, to);
		}

		let successfulMove = () => {
			this.playerService.nextPlayer();
			this.pickedPiece = undefined;
		}

		let move = (pickedPiece: IPiece, to: Point) => {
			this._board[pickedPiece.position.x][pickedPiece.position.y] = null;
			pickedPiece.position = to;
			this._board[to.x][to.y] = this.pickedPiece;
			this._board[to.x] = [...this._board[to.x]];
		}

		if(checkIfValidMove()){
			move(pickedPiece, to);
			successfulMove();
			return;
		}

		this.resetMove();
	}

	private initPieces() {

		for (let i = 0; i < this._board[1].length; i++) {
			this._board[1][i] = new Pawn(new Point(1, i), this.playerService.player1);
			this._board[6][i] = new Pawn(new Point(6, i), this.playerService.player2);
		}

		this._board[0][0] = new Rook(new Point(0, 0), this.playerService.player1);
		this._board[0][7] = new Rook(new Point(0, 7), this.playerService.player1);
		this._board[7][0] = new Rook(new Point(7, 0), this.playerService.player2);
		this._board[7][7] = new Rook(new Point(7, 7), this.playerService.player2);

		this._board[0][2] = new Bishop(new Point(0, 2), this.playerService.player1);
		this._board[0][5] = new Bishop(new Point(0, 5), this.playerService.player1);
		this._board[7][2] = new Bishop(new Point(7, 2), this.playerService.player2);
		this._board[7][5] = new Bishop(new Point(7, 5), this.playerService.player2);

		this._board[0][1] = new Knight(new Point(0, 1), this.playerService.player1);
		this._board[0][6] = new Knight(new Point(0, 6), this.playerService.player1);
		this._board[7][1] = new Knight(new Point(7, 1), this.playerService.player2);
		this._board[7][6] = new Knight(new Point(7, 6), this.playerService.player2);

		this._board[0][3] = new King(new Point(0, 3), this.playerService.player1);
		this._board[7][3] = new King(new Point(7, 3), this.playerService.player2);

		this._board[0][4] = new Queen(new Point(0, 4), this.playerService.player1);
		this._board[7][4] = new Queen(new Point(7, 4), this.playerService.player2);

	}

	private initBoard() {
		this._board = this.makeArray(8, 8);
	}

	public get view() {
		return Array.from(this._board);
	}

	private makeArray(d1: number, d2: number) {
		var arr = [];
		for (let i = 0; i < d2; i++) {
			arr.push(new Array(d1));
		}
		return arr;
	}
}

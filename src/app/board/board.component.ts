import { ChangeDetectorRef, Component } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Position } from '../piece/movable.directive';
import { Bishop } from '../piece/pieces/bishop';
import { King } from '../piece/pieces/king';
import { Knight } from '../piece/pieces/knight';
import { Pawn } from '../piece/pieces/pawn';
import { Piece } from '../piece/pieces/piece';
import { Queen } from '../piece/pieces/queen';
import { Rook } from '../piece/pieces/rook';
import { Player } from '../player/player';
import { Point } from './cell/cell.component';

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss']
})

export class BoardComponent {

	private board: Board;
	
	constructor() {
		this.board = Board.board;
	}

	public get resetMove$(): Observable<boolean> {
		return this.board.resetMove$;
	}

	public get view() {
		return this.board.view;
	}

	public get players() {
		return this.board.players;
	}

	onPiecePicked(position: Point) {
		this.board.pick(position);
	}

	onPieceDropped(position: Point) {
		this.board.drop(position);
	}
}
class Board {

	private static _board: Board;

	private _players!: { player1: Player; player2: Player; };
	private _board: any[][] = [];
	private pickedPiece?: Piece;
	private _resetMove$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor() {
		this.initBoard();
		this.initPlayers();
		this.initPieces();
	}

	public get resetMove$() {
		return this._resetMove$.asObservable();
	}

	private initPlayers() {
		this._players = {
			player1: new Player('white', 'player 1'),
			player2: new Player('black', 'player 2')
		}
	}

	public pick(position: Position) {
		if(!this.pickedPiece) {
			this._resetMove$.next(false);
			this.pickedPiece = this._board[position.x][position.y];
		}
		else 
		{
			this._resetMove$.next(true);
			throw new Error('Piece already picked');
		}
	}

	public drop(position: Position) {
		console.log(position);
		if(!this.pickedPiece) {
			this._resetMove$.next(true);
			throw new Error('No piece picked');
		}

		if(this.makeMove(this.pickedPiece, position)){
			this._resetMove$.next(false);
		}
		else{
			this._resetMove$.next(true);
		}
			
		
		this.pickedPiece = undefined;
	}

	public makeMove(pickedPiece: Piece, to: Point) {
		if(pickedPiece.validMove(to)) {
			this._board[pickedPiece.position.x][pickedPiece.position.y] = null;
			pickedPiece.position = to;
			this._board[to.x][to.y] = this.pickedPiece;
			//Cheap way to trigger change detection if the move is made in the same row
			this._board[to.x] = [...this._board[to.x]];
			return true;
		}
		return false;
	}

	public get players() {
		return this._players;
	}

	private initPieces() {
		
		for (let i = 0; i < this._board[1].length; i++) {
			this._board[1][i] = new Pawn(new Point(1,i), this.players.player1.color);
			this._board[6][i] = new Pawn(new Point(6,i), this.players.player2.color);
		}

		this._board[0][0] = new Rook(new Point(0,0), this.players.player1.color);
		this._board[0][7] = new Rook(new Point(0,7), this.players.player1.color);
		this._board[7][0] = new Rook(new Point(7,0), this.players.player2.color);
		this._board[7][7] = new Rook(new Point(7,7), this.players.player2.color);

		this._board[0][2] = new Bishop(new Point(0,2), this.players.player1.color);
		this._board[0][5] = new Bishop(new Point(0,5), this.players.player1.color);
		this._board[7][2] = new Bishop(new Point(7,2), this.players.player2.color);
		this._board[7][5] = new Bishop(new Point(7,5), this.players.player2.color);

		this._board[0][1] = new Knight(new Point(0,1), this.players.player1.color);
		this._board[0][6] = new Knight(new Point(0,6), this.players.player1.color);
		this._board[7][1] = new Knight(new Point(7,1), this.players.player2.color);
		this._board[7][6] = new Knight(new Point(7,6), this.players.player2.color);

		this._board[0][3] = new King(new Point(0,3), this.players.player1.color);
		this._board[7][3] = new King(new Point(7,3), this.players.player2.color);

		this._board[0][4] = new Queen(new Point(0,4), this.players.player1.color);
		this._board[7][4] = new Queen(new Point(7,4), this.players.player2.color);

	}

	private initBoard() {
		this._board = this.makeArray(8, 8);
	}

	public static get board(): Board {
		if (!Board._board) {
			return Board._board = new Board();
		}
		return Board._board;
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

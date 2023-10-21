import { TestBed } from '@angular/core/testing';
import { IPoint } from 'src/app/board/cell/cell.component';
import { IBoardService } from 'src/app/board/i-board-service';
import { IPlayerService } from 'src/app/player/i-player.service';
import { IObstructionValidator } from '../obstructors/i-obstruction-validator';
import { Pawn } from '../pieces/pawn';
import { PawnValidator } from './pawn-validator';
import { of } from 'rxjs';

const mockObstructionService: IObstructionValidator = {
	isObstructed: function (from: IPoint, to: IPoint): boolean {
		throw new Error('Function not implemented.');
	},
	checkIfSpotIsOccupied: function (to: IPoint): boolean {
		throw new Error('Function not implemented.');
	}
};

const mockBoardService: IBoardService = {
	view: [[]],
	pick: function (position: IPoint): void {
		throw new Error('Function not implemented.');
	},
	drop: function (position: IPoint): void {
		throw new Error('Function not implemented.');
	},
	resetMove: function (): void {
		throw new Error('Function not implemented.');
	},
	resetMove$: of(false),
}

const mockPlayerService: IPlayerService = {
	players: [],
	nextPlayer: function (): void {
		throw new Error('Function not implemented.');
	},
	player1: {
		name: 'player1',
		color: 'white'
	},
	player2: {
		name: 'player2',
		color: 'black'
	},
	currentPlayer: {
		name: 'player1',
		color: 'white'
	}
}

mockPlayerService.currentPlayer = mockPlayerService.player1;

describe('PawnValidator', () => {
	let pawnValidator: PawnValidator;
	beforeEach(() => {
		TestBed.configureTestingModule({
            providers: [
                { provide: 'IPlayerService', useValue : mockPlayerService },
				{ provide: 'IBoardService', useValue: mockBoardService },
                { provide: 'IObstructionValidator', useValue: mockObstructionService }
			]
        });

		pawnValidator = TestBed.inject(PawnValidator);
	});

	it('should be created', () => {
		expect(pawnValidator).toBeTruthy();
	});

	it('should allow an initial pawn move when the path is clear', () => {
		const from: IPoint = { x: 1, y: 1 };
		const to: IPoint = { x: 3, y: 1 };
		spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
		spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
		const isValid = pawnValidator.validateMove(from, to);
		expect(isValid).toBeTruthy();
	  });
  
	  it('should not allow an initial pawn move when the path is obstructed', () => {
		const from: IPoint = { x: 1, y: 1 };
		const to: IPoint = { x: 3, y: 1 };
		spyOn(mockObstructionService, 'isObstructed').and.returnValue(true);
		spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
		const isValid = pawnValidator.validateMove(from, to);
		expect(isValid).toBeFalsy();
	  });
  
	  it('should allow a standard pawn move when the path is clear', () => {
		const from: IPoint = { x: 1, y: 1 };
		const to: IPoint = { x: 2, y: 1 };
		spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
		spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
		const isValid = pawnValidator.validateMove(from, to);
		expect(isValid).toBeTruthy();
	  });
  
	  it('should not allow a standard pawn move when the target spot is occupied', () => {
		const from: IPoint = { x: 1, y: 1 };
		const to: IPoint = { x: 2, y: 1 };
		spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
		spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(true);
		const isValid = pawnValidator.validateMove(from, to);
		expect(isValid).toBeFalsy();
	  });
  
	  it('should allow a pawn capture move when the target spot is occupied by an opponent', () => {
		const from: IPoint = { x: 1, y: 1 };
		const to: IPoint = { x: 2, y: 2 };
		mockBoardService.view = [[],[,{piece: new Pawn( from ,mockPlayerService.player1)}],[,,{piece: new Pawn( to ,mockPlayerService.player2)}]];
		spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
		spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(true);
		const isValid = pawnValidator.validateMove(from, to);
		expect(isValid).toBeTruthy();
	  });
  
	  it('should not allow a pawn capture move when the target spot is not occupied by an opponent', () => {
		const from: IPoint = { x: 1, y: 1 };
		const to: IPoint = { x: 2, y: 2 };
		mockBoardService.view = [[],[,{piece: new Pawn( from ,mockPlayerService.player1)}],[,,{piece: new Pawn( to ,mockPlayerService.player1)}]];
		spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
		spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(true);
		const isValid = pawnValidator.validateMove(from, to);
		expect(isValid).toBeTruthy();
	  });

	  it('should not allow a pawn to move backwards', () => {
		const from: IPoint = { x: 1, y: 1 };
		const to: IPoint = { x: 0, y: 1 };
		mockBoardService.view = [[],[,{piece: new Pawn( from ,mockPlayerService.player1)}],[,{piece: new Pawn( to ,mockPlayerService.player1)},,]];
		spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
		spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(true);
		const isValid = pawnValidator.validateMove(from, to);
		expect(isValid).toBeFalsy();
	  });

	  it('should not allow a pawn to move sideways', () => {
		const from: IPoint = { x: 1, y: 1 };
		const to: IPoint = { x: 1, y: 2 };
		spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
		spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
		const isValid = pawnValidator.validateMove(from, to);
		expect(isValid).toBeFalsy();
	  });

	  it('should not allow a pawn to move diagonally without capturing', () => {
		const from: IPoint = { x: 1, y: 1 };
		const to: IPoint = { x: 2, y: 2 };
		mockBoardService.view = [[],[,{piece: new Pawn( from ,mockPlayerService.player1)}],[,{piece: new Pawn( to ,mockPlayerService.player1)},,]];
		spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
		spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
		const isValid = pawnValidator.validateMove(from, to);
		expect(isValid).toBeFalsy();
	  });

	  it('should not allow a pawn to move more than two spaces on its first move', () => {
		const from: IPoint = { x: 1, y: 1 };
		const to: IPoint = { x: 5, y: 2 };
		mockBoardService.view = [[],[,{piece: new Pawn( from ,mockPlayerService.player1)}],[,{piece: new Pawn( to ,mockPlayerService.player1)},,]];
		spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
		spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
		const isValid = pawnValidator.validateMove(from, to);
		expect(isValid).toBeFalsy();
	  });
});

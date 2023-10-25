import { TestBed } from '@angular/core/testing';
import { MockService } from 'ng-mocks';
import { BoardService } from 'src/app/board/board.service';
import { IPoint } from 'src/app/board/cell/cell.component';
import { Player } from 'src/app/player/player';
import { PlayerService } from 'src/app/player/player.service';
import { IObstructionValidator } from '../obstructors/i-obstruction-validator';
import { ObstructionValidatorService } from '../obstructors/obstruction.service';
import { Pawn } from '../pieces/pawn';
import { PawnValidator } from './pawn-validator';
import { King } from '../pieces/king';

const mockObstructionService: IObstructionValidator = MockService(ObstructionValidatorService);
const mockBoardService = MockService(BoardService);
const mockPlayerService = MockService(PlayerService);


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
		const player1 = new Player('white', 'player1');
		const player2 = new Player('black', 'player2');
		spyOnProperty(mockPlayerService, 'player1', 'get').and.returnValue(player1);
        spyOnProperty(mockPlayerService, 'player2', 'get').and.returnValue(player2);
        mockPlayerService.currentPlayer = mockPlayerService.player1;
	});

	it('should be created', () => {
		expect(pawnValidator).toBeTruthy();
	});

	it('should allow an initial pawn move when the path is clear', () => {
		const from: IPoint = { x: 1, y: 1 };
		const to: IPoint = { x: 3, y: 1 };
		spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[],[,new Pawn( from ,mockPlayerService.player1)],[],[]]);
		spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
		spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
		const isValid = pawnValidator.validateMove(from, to);
		expect(isValid).toBeTruthy();
	  });
  
	  it('should not allow an initial pawn move when the path is obstructed', () => {
		const from: IPoint = { x: 1, y: 1 };
		const to: IPoint = { x: 3, y: 1 };
		spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[],[,new Pawn( from ,mockPlayerService.player1)],[new Pawn({x: 2, y: 1}, mockPlayerService.player1)],[]]);
		spyOn(mockObstructionService, 'isObstructed').and.returnValue(true);
		spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
		const isValid = pawnValidator.validateMove(from, to);
		expect(isValid).toBeFalsy();
	  });
  
	  it('should allow a standard pawn move when the path is clear', () => {
		const from: IPoint = { x: 1, y: 1 };
		const to: IPoint = { x: 2, y: 1 };
		spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[],[,new Pawn( from ,mockPlayerService.player1)],[],[]]);
		spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
		spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
		const isValid = pawnValidator.validateMove(from, to);
		expect(isValid).toBeTruthy();
	  });
  
	  it('should not allow a standard pawn move when the target spot is occupied', () => {
		const from: IPoint = { x: 1, y: 1 };
		const to: IPoint = { x: 2, y: 1 };
		spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[],[,new Pawn( from ,mockPlayerService.player1)],[new Pawn( to ,mockPlayerService.player1)],[]]);
		spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
		spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(true);
		const isValid = pawnValidator.validateMove(from, to);
		expect(isValid).toBeFalsy();
	  });
  
	  it('should allow a pawn capture move when the target spot is occupied by an opponent', () => {
		const from: IPoint = { x: 1, y: 1 };
		const to: IPoint = { x: 2, y: 2 };
		spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[],[,new Pawn( from ,mockPlayerService.player1)],[,,new Pawn( to ,mockPlayerService.player2)],[]]);
		spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
		spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(true);
		const isValid = pawnValidator.validateMove(from, to);
		expect(isValid).toBeTruthy();
	  });
  
	  it('should not allow a pawn capture move when the target spot is not occupied by an opponent', () => {
		const from: IPoint = { x: 1, y: 1 };
		const to: IPoint = { x: 2, y: 2 };
		spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[],[,new Pawn( from ,mockPlayerService.player1)],[,,{piece: new Pawn( to ,mockPlayerService.player1)}]]);
		spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
		spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(true);
		const isValid = pawnValidator.validateMove(from, to);
		expect(isValid).toBeTruthy();
	  });

	  it('should not allow a pawn to move backwards', () => {
		const from: IPoint = { x: 1, y: 1 };
		const to: IPoint = { x: 0, y: 1 };
		spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[],[,new Pawn( from ,mockPlayerService.player1)],[,{piece: new Pawn( to ,mockPlayerService.player1)},,]]);
		spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
		spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(true);
		const isValid = pawnValidator.validateMove(from, to);
		expect(isValid).toBeFalsy();
	  });

	  it('should not allow a pawn to move sideways', () => {
		const from: IPoint = { x: 1, y: 1 };
		const to: IPoint = { x: 1, y: 2 };
		spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[],[,new Pawn( from ,mockPlayerService.player1)],[]]);
		spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
		spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
		const isValid = pawnValidator.validateMove(from, to);
		expect(isValid).toBeFalsy();
	  });

	  it('should not allow a pawn to move diagonally without capturing', () => {
		const from: IPoint = { x: 1, y: 1 };
		const to: IPoint = { x: 2, y: 2 };
		spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[],[,new Pawn( from ,mockPlayerService.player1)],[,{piece: new Pawn( to ,mockPlayerService.player1)},,]]);
		spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
		spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
		const isValid = pawnValidator.validateMove(from, to);
		expect(isValid).toBeFalsy();
	  });

	  it('should not allow a pawn to move more than two spaces on its first move', () => {
		const from: IPoint = { x: 1, y: 1 };
		const to: IPoint = { x: 5, y: 2 };
		spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[],[,new Pawn( from ,mockPlayerService.player1)],[,{piece: new Pawn( to ,mockPlayerService.player1)},,]]);
		spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
		spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
		const isValid = pawnValidator.validateMove(from, to);
		expect(isValid).toBeFalsy();
	  });

	  it('should return true if the opponent king is in check', () => {
        let from: IPoint = { x: 1, y: 1 };
        let to: IPoint = { x: 2, y: 2 };
		let pawn = new Pawn(from, mockPlayerService.player1);
		spyOnProperty(mockPlayerService, 'currentPlayer', 'get').and.returnValue(mockPlayerService.player2);
        spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[],[,pawn],[,,new King( to, mockPlayerService.player2)]]);
        spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
        spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(true);
        let result = pawnValidator.isOpponentKingInCheck(pawn);
        expect(result).toBe(true);
    });

    it('should return false if the opponent king is not in check', () => {
        let from: IPoint = { x: 1, y: 1 };
        let to: IPoint = { x: 2, y: 2 };
		let pawn = new Pawn(from, mockPlayerService.player1);
		spyOnProperty(mockPlayerService, 'currentPlayer', 'get').and.returnValue(mockPlayerService.player2);
        spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[],[,pawn],[]]);
        spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
        spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
        let result = pawnValidator.isOpponentKingInCheck(pawn);
        expect(result).toBe(false);
    });
});

import { TestBed } from '@angular/core/testing';
import { IPoint } from 'src/app/board/cell/cell.component';
import { IObstructionValidator } from '../obstructors/i-obstruction-validator';
import { Rook } from '../pieces/rook';
import { RookValidator } from './rook-validator';
import { MockService } from 'ng-mocks';
import { BoardService } from 'src/app/board/board.service';
import { ObstructionValidatorService } from '../obstructors/obstruction.service';
import { Player } from 'src/app/player/player';
import { PlayerService } from 'src/app/player/player.service';
import { King } from '../pieces/king';

const mockObstructionService: IObstructionValidator = MockService(ObstructionValidatorService);
const mockBoardService = MockService(BoardService);
const mockPlayerService = MockService(PlayerService);

describe('RookValidator', () => {
	let rookValidator: RookValidator;
	beforeEach(() => {
		TestBed.configureTestingModule({
            providers: [
                { provide: 'IPlayerService', useValue : mockPlayerService },
				{ provide: 'IBoardService', useValue: mockBoardService },
                { provide: 'IObstructionValidator', useValue: mockObstructionService }
			]
        });

		rookValidator = TestBed.inject(RookValidator);
        const player1 = new Player('white', 'player1');
        const player2 = new Player('black', 'player2');
        spyOnProperty(mockPlayerService, 'player1', 'get').and.returnValue(player1);
        spyOnProperty(mockPlayerService, 'player2', 'get').and.returnValue(player2);
        mockPlayerService.currentPlayer = mockPlayerService.player1;
	});

	it('should be created', () => {
		expect(RookValidator).toBeTruthy();
	});

	it('should allow a move to an empty spot', () => {
        let from: IPoint = { x: 0, y: 0 };
        let to: IPoint = { x: 3, y: 0 };
        spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
        spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
        let result = rookValidator.validateMove(from, to);
        expect(result).toBe(true);
        from = { x: 0, y: 0 };
        to = { x: 0, y: 3 };
        result = rookValidator.validateMove(from, to);
        expect(result).toBe(true);
    });

    it('should allow a move to a spot occupied by an enemy', () => {
        let from: IPoint = { x: 0, y: 0 };
        let to: IPoint = { x: 5, y: 0 };
        spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[new Rook(from, mockPlayerService.player1)],[],[],[],[],[new Rook(to, mockPlayerService.player2)]]);
        spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
        spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(true);
        let result = rookValidator.validateMove(from, to);
        expect(result).toBe(true);
    });

    it('should not allow a move to a spot occupied by an ally', () => {
        let from: IPoint = { x: 0, y: 0 };
        let to: IPoint = { x: 5, y: 0 };
        spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[new Rook(from, mockPlayerService.player1)],[],[],[],[],[new Rook(to, mockPlayerService.player1)]]);
        spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
        spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(true);
        let result = rookValidator.validateMove(from, to);
        expect(result).toBe(false);
    });

    it('should not allow a move to a spot that is not in a straight line', () => {
        let from: IPoint = { x: 0, y: 0 };
        let to: IPoint = { x: 5, y: 5 };
        spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
        spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
        let result = rookValidator.validateMove(from, to);
        expect(result).toBe(false);
    });

    it('should not allow a move to a spot that is obstructed', () => {
        let from: IPoint = { x: 0, y: 0 };
        let to: IPoint = { x: 5, y: 0 };
        spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[new Rook(from, mockPlayerService.player1)],[],[],[],[new Rook( { x: 4 , y: 0 }, mockPlayerService.player1)],[]]);
        spyOn(mockObstructionService, 'isObstructed').and.returnValue(true);
        spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
        let result = rookValidator.validateMove(from, to);
        expect(result).toBeFalsy();
    });

    it('should not allow to capture a piece that is obstructed', () => {
        let from: IPoint = { x: 0, y: 0 };
        let to: IPoint = { x: 5, y: 0 };
        spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[new Rook(from, mockPlayerService.player1)],[],[new Rook( { x: 2 , y: 0 }, mockPlayerService.player1)],[],[],[new Rook( { x: 5 , y: 0 }, mockPlayerService.player2)]]);
        spyOn(mockObstructionService, 'isObstructed').and.returnValue(true);
        spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
        let result = rookValidator.validateMove(from, to);
        expect(result).toBeFalsy();
    });

    it('should return true if the opponent king is in check', () => {
        let from: IPoint = { x: 0, y: 0 };
        let to: IPoint = { x: 5, y: 0 };
        spyOnProperty(mockPlayerService, 'currentPlayer', 'get').and.returnValue(mockPlayerService.player2);  
        spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[new Rook(from, mockPlayerService.player1)],[],[],[],[],[new King( { x: 5 , y: 0 }, mockPlayerService.player2)]]);
        spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
        spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(true);
        let result = rookValidator.validateMove(from, to);
        expect(result).toBe(true);
    });

    it('should return false if the opponent king is not in check', () => {
        let from: IPoint = { x: 0, y: 0 };
        let rook = new Rook(from, mockPlayerService.player1);
        spyOnProperty(mockPlayerService, 'currentPlayer', 'get').and.returnValue(mockPlayerService.player2);  
        spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[rook],[],[],[],[],[,new King( { x: 5 , y: 1 }, mockPlayerService.player2)]]);
        spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
        spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
        let result = rookValidator.isOpponentKingInCheck(rook);
        expect(result).toBe(false);
    });
});

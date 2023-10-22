import { TestBed } from '@angular/core/testing';
import { MockService } from 'ng-mocks';
import { BoardService } from 'src/app/board/board.service';
import { IPoint } from 'src/app/board/cell/cell.component';
import { PlayerService } from 'src/app/player/player.service';
import { IObstructionValidator } from '../obstructors/i-obstruction-validator';
import { ObstructionValidatorService } from '../obstructors/obstruction.service';
import { BishopValidator } from './bishop-validator';
import { Bishop } from '../pieces/bishop';
import { Rook } from '../pieces/rook';
import { Player } from 'src/app/player/player';

const mockObstructionService: IObstructionValidator = MockService(ObstructionValidatorService);
const mockBoardService = MockService(BoardService);
const mockPlayerService = MockService(PlayerService);
const player1 = new Player('white', 'player1');
const player2 = new Player('black', 'player2');

describe('BishopValidator', () => {
	let bishopValidator: BishopValidator;
	beforeEach(() => {
		TestBed.configureTestingModule({
            providers: [
                { provide: 'IPlayerService', useValue : mockPlayerService },
				{ provide: 'IBoardService', useValue: mockBoardService },
                { provide: 'IObstructionValidator', useValue: mockObstructionService }
			]
        });

		bishopValidator = TestBed.inject(BishopValidator);
        spyOnProperty(mockPlayerService, 'player1', 'get').and.returnValue(player1);
        spyOnProperty(mockPlayerService, 'player2', 'get').and.returnValue(player2);
        mockPlayerService.currentPlayer = mockPlayerService.player1;
	});

	it('should be created', () => {
		expect(BishopValidator).toBeTruthy();
	});

	it('should allow a move to an empty spot', () => {
        let from: IPoint = { x: 0, y: 0 };
        let to: IPoint = { x: 2, y: 2 };
        spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
        spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
        let result = bishopValidator.validateMove(from, to);
        expect(result).toBe(true);
        from = { x: 2, y: 0 };
        to = { x: 0, y: 2 };
        result = bishopValidator.validateMove(from, to);
        expect(result).toBe(true);
    });

    it('should allow a move to a spot occupied by an enemy', () => {
        let from: IPoint = { x: 0, y: 0 };
        let to: IPoint = { x: 5, y: 5 };
        spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[new Bishop(from, mockPlayerService.player1)],[],[],[],[],[,,,,,new Rook(to, mockPlayerService.player2)]]);
        spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
        spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(true);
        let result = bishopValidator.validateMove(from, to);
        expect(result).toBe(true);
    });

    it('should not allow a move to a spot occupied by an ally', () => {
        let from: IPoint = { x: 0, y: 0 };
        let to: IPoint = { x: 5, y: 5 };
        spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[new Bishop(from, mockPlayerService.player1)],[],[],[],[],[,,,,,new Rook(to, mockPlayerService.player1)]]);
        spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
        spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(true);
        let result = bishopValidator.validateMove(from, to);
        expect(result).toBe(false);
    });

    it('should not allow a move to a spot that is not in a diagnol', () => {
        let from: IPoint = { x: 0, y: 0 };
        let to: IPoint = { x: 0, y: 5 };
        spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
        spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
        let result = bishopValidator.validateMove(from, to);
        expect(result).toBe(false);
    });

    it('should not allow a move to a spot that is obstructed', () => {
        let from: IPoint = { x: 0, y: 0 };
        let to: IPoint = { x: 5, y: 5 };
        spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[new Bishop(from, mockPlayerService.player1)],[],[],[],[,,,,new Rook( { x: 4 , y: 0 }, mockPlayerService.player1)],[]]);
        spyOn(mockObstructionService, 'isObstructed').and.returnValue(true);
        spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
        let result = bishopValidator.validateMove(from, to);
        expect(result).toBeFalsy();
    });

    it('should not allow to capture a piece that is obstructed', () => {
        let from: IPoint = { x: 0, y: 0 };
        let to: IPoint = { x: 5, y: 0 };
        spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[new Bishop(from, mockPlayerService.player1)],[],[,,new Rook( { x: 2 , y: 2 }, mockPlayerService.player1)],[],[],[,,,,,new Rook( to, mockPlayerService.player2)]]);
        spyOn(mockObstructionService, 'isObstructed').and.returnValue(true);
        spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
        let result = bishopValidator.validateMove(from, to);
        expect(result).toBeFalsy();
    });
});

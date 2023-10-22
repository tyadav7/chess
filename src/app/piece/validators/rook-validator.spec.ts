import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IPoint } from 'src/app/board/cell/cell.component';
import { IBoardService } from 'src/app/board/i-board-service';
import { IPlayerService } from 'src/app/player/i-player.service';
import { IObstructionValidator } from '../obstructors/i-obstruction-validator';
import { RookValidator } from './rook-validator';
import { Rook } from '../pieces/rook';

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
        mockBoardService.view = [[new Rook(from, mockPlayerService.player1)],[],[],[],[],[new Rook(to, mockPlayerService.player2)]];
        spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
        spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(true);
        let result = rookValidator.validateMove(from, to);
        expect(result).toBe(true);
    });

    it('should not allow a move to a spot occupied by an ally', () => {
        let from: IPoint = { x: 0, y: 0 };
        let to: IPoint = { x: 5, y: 0 };
        mockBoardService.view = [[new Rook(from, mockPlayerService.player1)],[],[],[],[],[new Rook(to, mockPlayerService.player1)]];
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
        mockBoardService.view = [[new Rook(from, mockPlayerService.player1)],[],[],[],[new Rook( { x: 4 , y: 0 }, mockPlayerService.player1)],[]];
        spyOn(mockObstructionService, 'isObstructed').and.returnValue(true);
        spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
        let result = rookValidator.validateMove(from, to);
        expect(result).toBeFalsy();
    });

    it('should not allow to capture a piece that is obstructed', () => {
        let from: IPoint = { x: 0, y: 0 };
        let to: IPoint = { x: 5, y: 0 };
        mockBoardService.view = [[new Rook(from, mockPlayerService.player1)],[],[new Rook( { x: 2 , y: 0 }, mockPlayerService.player1)],[],[],[new Rook( { x: 5 , y: 0 }, mockPlayerService.player2)]];
        spyOn(mockObstructionService, 'isObstructed').and.returnValue(true);
        spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
        let result = rookValidator.validateMove(from, to);
        expect(result).toBeFalsy();
    });
});

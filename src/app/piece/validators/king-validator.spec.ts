import { TestBed } from '@angular/core/testing';
import { MockService } from 'ng-mocks';
import { BoardService } from 'src/app/board/board.service';
import { IPoint } from 'src/app/board/cell/cell.component';
import { PlayerService } from 'src/app/player/player.service';
import { IObstructionValidator } from '../obstructors/i-obstruction-validator';
import { ObstructionValidatorService } from '../obstructors/obstruction.service';
import { KingValidator } from './king-validator';
import { Player } from 'src/app/player/player';
import { King } from '../pieces/king';
import { Pawn } from '../pieces/pawn';

const mockObstructionService: IObstructionValidator = MockService(ObstructionValidatorService);
const mockBoardService = MockService(BoardService);
const mockPlayerService = MockService(PlayerService);
const player1 = new Player('white', 'player1');
const player2 = new Player('black', 'player2');

describe('KingValidator', () => {
    let kingValidator: KingValidator;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: 'IPlayerService', useValue: mockPlayerService },
                { provide: 'IBoardService', useValue: mockBoardService },
                { provide: 'IObstructionValidator', useValue: mockObstructionService }
            ]
        });

        kingValidator = TestBed.inject(KingValidator);
        spyOnProperty(mockPlayerService, 'player1', 'get').and.returnValue(player1);
        spyOnProperty(mockPlayerService, 'player2', 'get').and.returnValue(player2);
        mockPlayerService.currentPlayer = mockPlayerService.player1;
    });

    it('should be created', () => {
        expect(kingValidator).toBeTruthy();
    });

    it('should allow a standard king move', () => {
        const from: IPoint = { x: 0, y: 0 };
        const to: IPoint = { x: 0, y: 1 };
        spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
        spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
        const result = kingValidator.validateMove(from, to);
        expect(result).toBe(true);
    });

    it('should not allow a standard king move to an occupied spot by ally', () => {
        const from: IPoint = { x: 0, y: 0 };
        const to: IPoint = { x: 0, y: 1 };
        spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[new King(from, mockPlayerService.player1),new Pawn(to, mockPlayerService.player1)]]);
        spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
        spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(true);
        const result = kingValidator.validateMove(from, to);
        expect(result).toBe(false);
    });

    it('should allow a king capture move', () => {
        const from: IPoint = { x: 0, y: 0 };
        const to: IPoint = { x: 1, y: 1 };
        spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
        spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(true);
        spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[new King(from, mockPlayerService.player1)],[,new Pawn(to, mockPlayerService.player2)]]);
        const result = kingValidator.validateMove(from, to);
        expect(result).toBe(true);
    });

    it('should not allow a king move to a distant spot', () => {
        const from: IPoint = { x: 0, y: 0 };
        const to: IPoint = { x: 3, y: 3 };
        spyOn(mockObstructionService, 'isObstructed').and.returnValue(false);
        spyOn(mockObstructionService, 'checkIfSpotIsOccupied').and.returnValue(false);
        const result = kingValidator.validateMove(from, to);
        expect(result).toBe(false);
    });

    it('should allow king-side castling', () => {
        //to be implemented later
        // Implement a test for king-side castling
    });

    it('should allow queen-side castling', () => {
        //to be implemented later
        // Implement a test for queen-side castling
    });
});
import { TestBed } from '@angular/core/testing';
import { MockService } from 'ng-mocks';
import { KnightValidator } from './knight-validator';
import { IPoint } from 'src/app/board/cell/cell.component';
import { IBoardService } from 'src/app/board/i-board-service';
import { IPlayerService } from 'src/app/player/i-player.service';
import { IObstructionValidator } from '../obstructors/i-obstruction-validator';
import { BoardService } from 'src/app/board/board.service';
import { PlayerService } from 'src/app/player/player.service';
import { ObstructionValidatorService } from '../obstructors/obstruction.service';
import { Knight } from '../pieces/knight';
import { Player } from 'src/app/player/player';
import { King } from '../pieces/king';

const mockBoardService: IBoardService = MockService(BoardService);
const mockPlayerService: IPlayerService = MockService(PlayerService);
const mockObstructionValidator: IObstructionValidator = MockService(ObstructionValidatorService);

describe('KnightValidator', () => {
    let knightValidator: KnightValidator;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                KnightValidator,
                { provide: 'IBoardService', useValue: mockBoardService },
                { provide: 'IPlayerService', useValue: mockPlayerService },
                { provide: 'IObstructionValidator', useValue: mockObstructionValidator },
            ],
        });

        knightValidator = TestBed.inject(KnightValidator);
        const player1 = new Player('white', 'player1');
        const player2 = new Player('black', 'player2');
        spyOnProperty(mockPlayerService, 'player1', 'get').and.returnValue(player1);
        spyOnProperty(mockPlayerService, 'player2', 'get').and.returnValue(player2); 
        mockPlayerService.currentPlayer = mockPlayerService.player1;
    });

    it('should be created', () => {
        expect(knightValidator).toBeTruthy();
    });

    it('should allow a valid knight move', () => {
        const from: IPoint = { x: 0, y: 0 };
        const to: IPoint = { x: 2, y: 1 };
        spyOn(mockObstructionValidator, 'checkIfSpotIsOccupied').and.returnValue(false);
        spyOn(mockObstructionValidator, 'isObstructed').and.returnValue(false);
        const result = knightValidator.validateMove(from, to);
        expect(result).toBe(true);
    });

    it('should allow a valid knight capture move', () => {
        const from: IPoint = { x: 0, y: 0 };
        const to: IPoint = { x: 2, y: 1 };
        spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[new Knight(from, mockPlayerService.player1)],[],[,new Knight(to, mockPlayerService.player2) ]]);
        spyOn(mockObstructionValidator, 'checkIfSpotIsOccupied').and.returnValue(true);
        spyOn(mockObstructionValidator, 'isObstructed').and.returnValue(false);
        const result = knightValidator.validateMove(from, to);
        expect(result).toBe(true);
    });

    it('should not allow an invalid knight move', () => {
        const from: IPoint = { x: 0, y: 0 };
        const to: IPoint = { x: 3, y: 3 };
        const result = knightValidator.validateMove(from, to);
        expect(result).toBe(false);
    });

    it('should not allow an invalid knight capture move of an ally', () => {
        const from: IPoint = { x: 0, y: 0 };
        const to: IPoint = { x: 2, y: 1 };
        spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[new Knight(from, mockPlayerService.player1)],[],[,new Knight(to, mockPlayerService.player1) ]]);
        spyOnProperty(mockPlayerService, 'currentPlayer', 'get').and.returnValue(mockPlayerService.player2);  
        spyOn(mockObstructionValidator, 'checkIfSpotIsOccupied').and.returnValue(true);
        spyOn(mockObstructionValidator, 'isObstructed').and.returnValue(false);
        const result = knightValidator.validateMove(from, to);
        expect(result).toBe(false);
    });

    it('should return true if the opponent king is in check', () => {
        let from: IPoint = { x: 0, y: 0 };
        let knight = new Knight(from, mockPlayerService.player1)
        spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[knight],[,,new King( { x: 1 , y: 2 }, mockPlayerService.player2)]]);
        spyOnProperty(mockPlayerService, 'currentPlayer', 'get').and.returnValue(mockPlayerService.player2);  
        spyOn(mockObstructionValidator, 'isObstructed').and.returnValue(false);
        spyOn(mockObstructionValidator, 'checkIfSpotIsOccupied').and.returnValue(true);
        let result = knightValidator.isOpponentKingInCheck(knight);
        expect(result).toBe(true);
    });

    it('should return false if the opponent king is not in check', () => {
        let from: IPoint = { x: 0, y: 0 };
        let to: IPoint = { x: 1, y: 2 };
        let knight = new Knight(from, mockPlayerService.player1);
        spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[knight],[],[],[],[],[,new King( { x: 5 , y: 1 }, mockPlayerService.player2)]]);
        spyOnProperty(mockPlayerService, 'currentPlayer', 'get').and.returnValue(mockPlayerService.player2);  
        spyOn(mockObstructionValidator, 'isObstructed').and.returnValue(false);
        spyOn(mockObstructionValidator, 'checkIfSpotIsOccupied').and.returnValue(false);
        let result = knightValidator.isOpponentKingInCheck(knight);
        expect(result).toBe(false);
    });
});
import { TestBed } from '@angular/core/testing';
import { MockService } from 'ng-mocks';
import { BishopValidator } from './bishop-validator';
import { RookValidator } from './rook-validator';
import { QueenValidator } from './queen-validator';
import { IPoint } from 'src/app/board/cell/cell.component';
import { IBoardService } from 'src/app/board/i-board-service';
import { IPlayerService } from 'src/app/player/i-player.service';
import { IObstructionValidator } from '../obstructors/i-obstruction-validator';
import { BoardService } from 'src/app/board/board.service';
import { PlayerService } from 'src/app/player/player.service';
import { ObstructionValidatorService } from '../obstructors/obstruction.service';
import { Queen } from '../pieces/queen';
import { King } from '../pieces/king';
import { Player } from 'src/app/player/player';

const mockBoardService: IBoardService = MockService(BoardService);
const mockPlayerService: IPlayerService = MockService(PlayerService);
const mockObstructionValidator: IObstructionValidator = MockService(ObstructionValidatorService);
const mockBishopValidator: BishopValidator = MockService(BishopValidator);
const mockRookValidator: RookValidator = MockService(RookValidator);
const player1 = new Player('white', 'player1');
const player2 = new Player('black', 'player2');

describe('QueenValidator', () => {
    let queenValidator: QueenValidator;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                QueenValidator,
                { provide: 'IBoardService', useValue: mockBoardService },
                { provide: 'IPlayerService', useValue: mockPlayerService },
                { provide: 'IObstructionValidator', useValue: mockObstructionValidator },
                { provide: BishopValidator, useValue: mockBishopValidator },
                { provide: RookValidator, useValue: mockRookValidator },
            ],
        });

        queenValidator = TestBed.inject(QueenValidator);
        spyOnProperty(mockPlayerService, 'player1', 'get').and.returnValue(player1);
        spyOnProperty(mockPlayerService, 'player2', 'get').and.returnValue(player2);
        mockPlayerService.currentPlayer = mockPlayerService.player1;
    });

    it('should be created', () => {
        expect(queenValidator).toBeTruthy();
    });

    it('should allow a valid diagonal move', () => {
        const from: IPoint = { x: 0, y: 0 };
        const to: IPoint = { x: 2, y: 2 };
        spyOn(mockRookValidator, 'validateMove').and.returnValue(false);
        spyOn(mockBishopValidator, 'validateMove').and.returnValue(true);
        const result = queenValidator.validateMove(from, to);
        expect(result).toBe(true);
    });

    it('should allow a valid straight move', () => {
        const from: IPoint = { x: 0, y: 0 };
        const to: IPoint = { x: 0, y: 2 };
        spyOn(mockRookValidator, 'validateMove').and.returnValue(true);
        spyOn(mockBishopValidator, 'validateMove').and.returnValue(false);
        const result = queenValidator.validateMove(from, to);
        expect(result).toBe(true);
    });

    it('should allow a valid straight capturing move', () => {
        const from: IPoint = { x: 0, y: 0 };
        const to: IPoint = { x: 0, y: 2 };
        spyOn(mockBishopValidator, 'validateMove').and.returnValue(false);
        spyOn(mockRookValidator, 'validateMove').and.returnValue(true);
        const result = queenValidator.validateMove(from, to);
        expect(result).toBe(true);
    });

    it('should allow a valid diagonal capturing move', () => {
        const from: IPoint = { x: 0, y: 0 };
        const to: IPoint = { x: 2, y: 2 };
        spyOn(mockRookValidator, 'validateMove').and.returnValue(false);
        spyOn(mockBishopValidator, 'validateMove').and.returnValue(true);
        const result = queenValidator.validateMove(from, to);
        expect(result).toBe(true);
    });

    // Invalid Moves

    it('should not allow an invalid move', () => {
        const from: IPoint = { x: 0, y: 0 };
        const to: IPoint = { x: 3, y: 3 };
        spyOn(mockBishopValidator, 'validateMove').and.returnValue(false);
        spyOn(mockRookValidator, 'validateMove').and.returnValue(false);
        const result = queenValidator.validateMove(from, to);
        expect(result).toBe(false);
    });

    // Negative Test Cases for Invalid Moves

    it('should not allow a negative test - invalid move', () => {
        const from: IPoint = { x: 0, y: 0 };
        const to: IPoint = { x: 2, y: 1 }; // L-shape move
        spyOn(mockRookValidator, 'validateMove').and.returnValue(false);
        spyOn(mockBishopValidator, 'validateMove').and.returnValue(false);
        const result = queenValidator.validateMove(from, to);
        expect(result).toBe(false);
    });

    // Invalid Capture Moves

    it('should not allow an invalid capture move of an ally', () => {
        const from: IPoint = { x: 0, y: 0 };
        const to: IPoint = { x: 2, y: 2 };
        spyOn(mockBishopValidator, 'validateMove').and.returnValue(false);
        spyOn(mockRookValidator, 'validateMove').and.returnValue(false);
        const result = queenValidator.validateMove(from, to);
        expect(result).toBe(false);
    });

    // Invalid Moves Due to Obstruction

    it('should not allow an invalid move due to obstruction', () => {
        const from: IPoint = { x: 0, y: 0 };
        const to: IPoint = { x: 2, y: 2 };
        spyOn(mockBishopValidator, 'validateMove').and.returnValue(false);
        spyOn(mockRookValidator, 'validateMove').and.returnValue(false);
        const result = queenValidator.validateMove(from, to);
        expect(result).toBe(false);
    });

    it('should return true if the opponent king is in check in a straight line', () => {
        let from: IPoint = { x: 0, y: 0 };
        let to: IPoint = { x: 5, y: 0 };
        spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[new Queen(from, mockPlayerService.player1)],[],[],[],[],[new King( { x: 5 , y: 0 }, mockPlayerService.player2)]]);
        spyOn(mockBishopValidator, 'validateMove').and.returnValue(false);
        spyOn(mockRookValidator, 'validateMove').and.returnValue(true);
        let result = queenValidator.validateMove(from, to);
        expect(result).toBe(true);
    });

    it('should return true if the opponent king is in check diagnoally', () => {
        let from: IPoint = { x: 0, y: 0 };
        let to: IPoint = { x: 5, y: 5 };
        let queen = new Queen(from, mockPlayerService.player1);
        spyOnProperty(mockPlayerService, 'currentPlayer', 'get').and.returnValue(mockPlayerService.player2);
        spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[queen],[],[],[],[],[,,,,,new King( to, mockPlayerService.player2)]]);
        spyOn(mockBishopValidator, 'validateMove').and.returnValue(true);
        spyOn(mockRookValidator, 'validateMove').and.returnValue(false);
        let result = queenValidator.isOpponentKingInCheck(queen);
        expect(result).toBe(true);
    });

    it('should return false if the opponent king is not in check', () => {
        let from: IPoint = { x: 0, y: 0 };
        let to: IPoint = { x: 5, y: 0 };
        let queen = new Queen(from, mockPlayerService.player1);
        spyOnProperty(mockBoardService, 'view', 'get').and.returnValue([[queen],[],[],[],[],[,new King( to, mockPlayerService.player2)]]);
        spyOn(mockBishopValidator, 'validateMove').and.returnValue(false);
        spyOn(mockRookValidator, 'validateMove').and.returnValue(false);
        let result = queenValidator.isOpponentKingInCheck(queen);
        expect(result).toBe(false);
    });
    
});
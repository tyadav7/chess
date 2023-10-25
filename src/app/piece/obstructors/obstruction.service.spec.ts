import { TestBed } from '@angular/core/testing';
import { BoardService } from 'src/app/board/board.service';
import { IPoint } from 'src/app/board/cell/cell.component';
import { ObstructionValidatorService } from '../obstructors/obstruction.service';

describe('ObstructionValidatorService', () => {
    let service: ObstructionValidatorService;
    let mockedBoardService = jasmine.createSpyObj('mockedBoardService', {}, { 'view': [[]] });
    let spy: any;
    let modifyViewValue: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: BoardService, useValue: mockedBoardService },
                ObstructionValidatorService,
            ],
        });
        service = TestBed.inject(ObstructionValidatorService);
        spy = Object.getOwnPropertyDescriptor(mockedBoardService, "view");
        modifyViewValue = spy.get.and.returnValue.bind(spy.get.and);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // it('should return true for the same spot', () => {
    //     const from: IPoint = { x: 1, y: 1 };
    //     const to: IPoint = { x: 1, y: 1 };
    //     const result = service.checkIfSameSpot(from, to);
    //     expect(result).toBe(true);
    // });

    // it('should return false for different spots', () => {
    //     const from: IPoint = { x: 1, y: 1 };
    //     const to: IPoint = { x: 2, y: 2 };
    //     const result = service.checkIfSameSpot(from, to);
    //     expect(result).toBe(false);
    // });

    it('should return true for an occupied spot', () => {
        const to: IPoint = { x: 0, y: 0 };
        modifyViewValue([[{ piece: {} }]]);
        const result = service.checkIfSpotIsOccupied(to);
        expect(result).toBe(true);
    });

    it('should return false for an unoccupied spot', () => {
        const to: IPoint = { x: 1, y: 1 };
        modifyViewValue([new Array(2), new Array(2)]);
        const result = service.checkIfSpotIsOccupied(to);
        expect(result).toBe(false);
    });

    it('should return true if there is an obstruction in a straight line horizontally', () => {
        const from: IPoint = { x: 0, y: 0 };
        const to: IPoint = { x: 0, y: 3 };
        modifyViewValue([
            [{ piece: {} }, { piece: {} }, ,],
            new Array(4),
            new Array(4),
            new Array(4)]);
        const result = service.isObstructed(from, to);
        expect(result).toBe(true);
    });

    it('should return true if there is an obstruction in a straight line vertically', () => {
        const from: IPoint = { x: 0, y: 1 };
        const to: IPoint = { x: 3, y: 1 };
        modifyViewValue([[, { piece: {} }], [new Array(2)], [, { piece: {} }], new Array(2)]);
        const result = service.isObstructed(from, to);
        expect(result).toBe(true);
    });

    it('should return false if there is no obstruction in a straight line horizontally', () => {
        const from: IPoint = { x: 0, y: 0 };
        const to: IPoint = { x: 0, y: 3 };
        modifyViewValue([
            [{ piece: {} }, ,],
            new Array(4),
            new Array(4),
            new Array(4)]);
        const result = service.isObstructed(from, to);
        expect(result).toBe(false);
    });

    it('should return false if there is no obstruction in a straight line vertically', () => {
        const from: IPoint = { x: 0, y: 1 };
        const to: IPoint = { x: 3, y: 1 };
        modifyViewValue([[, { piece: {} }], new Array(2), new Array(2), [, { piece: {} }], new Array(2)]);
        const result = service.isObstructed(from, to);
        expect(result).toBe(false);
    });

    it('should return true if there is an obstruction in a diagonal line left to right', () => {
        const from: IPoint = { x: 0, y: 0 };
        const to: IPoint = { x: 3, y: 3 };
        modifyViewValue([
            [{ piece: {} }, , ,], 
            new Array(4), 
            [, ,{ piece: {} } ,],
            new Array(4), 
        ]);
        const result = service.isObstructed(from, to);
        expect(result).toBe(true);
    });

    it('should return true if there is an obstruction in a diagonal line right to left', () => {
        const from: IPoint = { x: 0, y: 3 };
        const to: IPoint = { x: 3, y: 0 };
        modifyViewValue([
            [, , ,{ piece: {} }], 
            new Array(4), 
            [,{ piece: {} } , , ],
            new Array(4), 
        ]);
        const result = service.isObstructed(from, to);
        expect(result).toBe(true);
    });

    it('should return false if there is no obstruction in a diagonal line', () => {
        const from: IPoint = { x: 0, y: 0 };
        const to: IPoint = { x: 3, y: 3 };
        modifyViewValue([
            [{ piece: {} }], 
            new Array(4), 
            new Array(4),
            [,,,{ piece: {} }], 
        ]);
        const result = service.isObstructed(from, to);
        expect(result).toBe(false);
    });
});

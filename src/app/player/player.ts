import { IPiece } from "../piece/pieces/i-piece";
import { King } from "../piece/pieces/king";

export class Player implements IPlayer {
    
    private _pieces: IPiece[];
    private _capturedPieces: IPiece[];

    constructor(private _color: 'white' | 'black', private _name: string)
    {
        this._pieces = [];
        this._capturedPieces = [];
    }

    public get capturedPieces() {
        return this._capturedPieces;
    }

    public get pieces() {
        return this._pieces;
    }

    public get color(): 'white' | 'black' {
        return this._color;
    }

    public get name(): string {
        return this._name;
    }

    public get king(): King {
        return this._pieces.find(p => p instanceof King ) as King;
    }

    public get isOpponentKingInCheck(): IPiece | undefined {
        return this.pieces.find((x) => x.isOpponentKingInCheck)
    }
}

export interface IPlayer {
    color: 'white' | 'black';
    name: string;
    pieces: IPiece[];
    king: King;
    isOpponentKingInCheck: IPiece | undefined;
    capturedPieces: IPiece[];
}
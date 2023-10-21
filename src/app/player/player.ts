import { IPiece } from "../piece/pieces/i-piece";

export class Player implements IPlayer {
    
    private _pieces: IPiece[] = []

    constructor(private _color: 'white' | 'black', private _name: string)
    {

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
}

export interface IPlayer {
    color: 'white' | 'black';
    name: string
}
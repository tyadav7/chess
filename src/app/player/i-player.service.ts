import { IPlayer } from "./player";

export interface IPlayerService {
    nextPlayer(): void;
    players: IPlayer[];
    currentPlayer: IPlayer;
    opponentPlayer: IPlayer;
    player1: IPlayer;
    player2: IPlayer;
}
import { TestBed } from '@angular/core/testing';
import { PlayerService } from './player.service';
import { Player } from './player';

describe('PlayerService', () => {
  let playerService: PlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerService],
    });

    playerService = TestBed.inject(PlayerService);
  });

  it('should be created', () => {
    expect(playerService).toBeTruthy();
  });

  it('should have two players', () => {
    const players = playerService.players;
    expect(players.length).toBe(2);
    expect(players[0] instanceof Player).toBeTruthy();
    expect(players[1] instanceof Player).toBeTruthy();
  });

  it('should initialize the current player to player 1', () => {
    const currentPlayer = playerService.currentPlayer;
    expect(currentPlayer).toBe(playerService.player1);
  });

  it('should switch to the next player correctly', () => {
    const currentPlayer = playerService.currentPlayer;
    const nextPlayer = playerService.player2;

    playerService.nextPlayer();

    const newCurrentPlayer = playerService.currentPlayer;
    expect(newCurrentPlayer).toBe(nextPlayer);

    playerService.nextPlayer();

    const afterSecondSwitch = playerService.currentPlayer;
    expect(afterSecondSwitch).toBe(currentPlayer);
  });

  it('should set the current player correctly', () => {
    const newCurrentPlayer = new Player('white', 'player 3');
    playerService.currentPlayer = newCurrentPlayer;
    const currentPlayer = playerService.currentPlayer;

    expect(currentPlayer).toBe(newCurrentPlayer);
  });
});

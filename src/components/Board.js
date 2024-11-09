import React, { useState } from 'react';
import { Board } from '../helper';
import TileView from './Tile';
import Cell from './Cell';
import useSwipe from '../hooks/useEvent';
import backbutton from "../assets/img/back_button.svg";

const BoardView = () => {
  const [board, setBoard] = useState(new Board());
  const [lost, setLost] = useState(false);
  const [won, setWon] = useState(false);

  const handleSwipe = (direction) => {
    // Stop interaction if game is over
    if (lost || won) return;

    let boardClone = Object.assign(Object.create(Object.getPrototypeOf(board)), board);

    let newBoard;
    switch (direction) {
      case "left":
        newBoard = boardClone.move(0);
        break;
      case "up":
        newBoard = boardClone.move(1);
        break;
      case "right":
        newBoard = boardClone.move(2);
        break;
      case "down":
        newBoard = boardClone.move(3);
        break;
      default:
        return;
    }

    setBoard(newBoard);

    // Check if player has won or lost after a move
    if (newBoard.hasWon()) setWon(true);
    if (newBoard.hasLost()) setLost(true);
  };

  // Attach swipe event listener
  useSwipe(handleSwipe);

  // const resetGame = () => {
  //   setBoard(new Board());
  //   setLost(false);
  //   setWon(false);
  // };

  const tiles = board.tiles
    .filter(tile => tile.value !== 0)
    .map((tile, index) => <TileView tile={tile} key={index} />);

  return (
    <div className='game_page'>
      <div className='details-box'>
        <div className='score-box'>SCORE</div>
        <div className='score-number'>{board.score}</div>
      </div>

      {/* Overlay for game over or win */}
      {(lost || won) && (
        <div className='overlay'>
          <div className='overlay-text'>
            {lost ? 'Game Over..!' : 'You Won..!'}
            {/* <button className='resetButton' onClick={resetGame}>
              Restart Game
            </button> */}
          </div>
        </div>
      )}

      {/* Game board */}
      <div className='board'>
        {[...Array(4)].map((_, row) => (
          <div key={row}>
            {[...Array(4)].map((_, col) => (
              <span className='cell' key={col}></span>
            ))}
          </div>
        ))}
        {tiles}
      </div>
    </div>
  );
};

export default BoardView;

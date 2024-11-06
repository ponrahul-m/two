import React, { useState} from 'react';
import { Board} from '../helper'
import TileView from './Tile';
import Cell from './Cell';
import useSwipe from '../hooks/useEvent';
import backbutton from "../assets/img/back_button.svg"

const BoardView = () => {
  const [board, setBoard] = useState(new Board());
  const [lost,setLost]=useState(false);
  // const resetGame=()=>{
  //   setBoard(new Board());
  // }
  const handleSwipe = (direction) => {
    if (board.hasWon()) return;
    if(board.hasLost()){
      setLost(true);
    }

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
  };


  useSwipe(handleSwipe);
  var tiles = board.tiles
    .filter(tile => tile.value != 0)
    .map((tile,index) => <TileView tile={tile} key={index} />);
  return (
    <div className='game_page'>
      <div className='details-box'>
     <div className='score-box'>SCORE</div>
     <div className='score-number'>{board.score}</div>
     {/* <div className='resetButton' onClick={resetGame}>Reset-Game</div> */}
     </div>
     <div>
     {lost && <div className='game_over'>Game Over..!</div>}
     </div>
     <div className='back_button'><img src={backbutton} alt="back" onClick={() => alert("hi")}/></div>
    <div className='board'>
      <div>
      <span className='cell'></span>
      <span className='cell'></span>
      <span className='cell'></span>
      <span className='cell'></span>
      </div>
      <div>
      <span className='cell'></span>
      <span className='cell'></span>
      <span className='cell'></span>
      <span className='cell'></span>
      </div>
      <div>
      <span className='cell'></span>
      <span className='cell'></span>
      <span className='cell'></span>
      <span className='cell'></span>
      </div>
      <div>
      <span className='cell'></span>
      <span className='cell'></span>
      <span className='cell'></span>
      <span className='cell'></span>
      </div>

      {tiles}
     
    </div>
    </div>
  );
}

export default BoardView;

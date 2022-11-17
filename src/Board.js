import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=4, ncols = 3, chanceLightStartsOn = .5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let gameBoard = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < ncols; j++) {
        row.push(Math.random()<chanceLightStartsOn);
      }
      gameBoard.push(row)
    }
    return gameBoard;
  }

  function hasWon() {
    return board.every((row)=>row.every((cell)=> cell===false));
    // TODO: check the board in state to determine whether the player has won.
  }

  /** Will check the old board, flip the cells surrounding the given
   * coordinates and then return the new board:
   */
  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const newBoard = _.cloneDeep(oldBoard);

      // TODO: in the copy, flip this cell and the cells around it
      const neighboringCells = [
        [y, x],
        [y + 1, x],
        [y - 1, x],
        [y, x + 1],
        [y, x - 1],
      ];

        for (const [y, x] of neighboringCells) {
          flipCell(y, x, newBoard);
      }
      return boardCopy;

      // TODO: return the copy
    });
  }
  let htmlBoard = [];
  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      const coordinate = `${x}-${y}`;
      row.push(
        <Cell
          key={coordinate}
          flipCellsAroundMe={flipCellsAround(coordinate)}
          istLit={false}
        />
      );
    }
    htmlBoard.push(<tr key={y} >{row}</tr>);
  }





  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board
  return (
    <table className="Board">
      <tbody>{htmlBoard}</tbody>
    </table>
  );

  const winGame = <span>"You Won"</span>
  return hasWon() ? winGame : boardUI

  // TODO
}

export default Board;

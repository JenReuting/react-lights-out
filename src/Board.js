import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import _ from "lodash";

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

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let i = 0; i < nrows; i++) {
      initialBoard.push([]);
      for (let j = 0; j < ncols; j++) {
        initialBoard[i].push(chanceLightStartsOn < Math.random());
      }
    }
    // TODO: create array-of-arrays of true/false values
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(array => !array.includes(true)) ? true : false;
  }

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
      let deepCopy = _.cloneDeep(oldBoard);
      const neighboringCells = [
        [y, x],
        [y + 1, x],
        [y - 1, x],
        [y, x + 1],
        [y, x - 1],
      ];
      // TODO: in the copy, flip this cell and the cells around it

      for (const [y, x] of neighboringCells) {
        flipCell(y, x, deepCopy);
      }
      // TODO: return the copy
      return deepCopy;
    });
  }

  const boardUI = (
    <table className="Board">
      <tbody>
        {board.map((row, r) => (
          <tr key={r}>
            {row.map((value, c) => (
              <Cell
                key={`${r}-${c}`}
                isLit={value}
                flipCellsAroundMe={(evt) => flipCellsAround(`${r}-${c}`)}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
  const winGame = <span>"You Won"</span>;


  // if the game is won, just show a winning msg & render nothing else
  // TODO
  // make table board
  // TODO

  return hasWon() ? winGame : boardUI;
}

export default Board;

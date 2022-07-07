/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

//Beginning of the OO Connect4 game

class Game {
  constructor(p1, p2, height, width) {
    this.players = [p1, p2];
    this.height = height;
    this.width = width;
    this.currPlayer = p1;
    this.board = [];
    this.makeBoard();
    this.makeHtmlBoard();
    this.gameOver = false;
  }

  makeBoard() {
    const {height, width, board} = this;
    for (let y = 0; y < height; y++) {
      board.push(Array.from({ length: width }));
    }
  }

  makeHtmlBoard() {
    const {height, width} = this;
    this.handleGameClick = this.handleClick.bind(this);

    const board = document.getElementById('board');
    board.innerHTML = "";

    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', this.handleGameClick);

    for (let x = 0; x < width; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }

    board.append(top);

    // make main part of board
    for (let y = 0; y < height; y++) {
      const row = document.createElement('tr');

      for (let x = 0; x < width; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }
      board.append(row);
    }
  }

  /** findSpotForCol: given column x, return top empty y (null if filled) */
  findSpotForCol(x) {
    const {height, board} = this;

    for (let y = height - 1; y >= 0; y--) {
      if (!board[y][x]) {
        return y;
      }
    }
    return null;
  } 

  /** placeInTable: update DOM to place piece into HTML table of board */

  placeInTable(y, x) {

    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundColor = this.currPlayer.color;
    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  /** endGame: announce game end */
  endGame(msg) {
    alert(msg);
    const top = document.querySelector("#column-top");
    top.removeEventListener("click", this.handleGameClick);
  }

  /** handleClick: handle click of column top to play piece */
  handleClick(evt) {
    const {board, endGame} = this;

    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    //const y = findSpotForCol(x);
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    board[y][x] = this.currPlayer;
    this.placeInTable(y, x);
  
    // check for win
    //this.checkForTheWin = this.checkForWin(this);
    if (this.checkForWin()) {
      this.gameOver = true;
      return this.endGame(`${this.currPlayer.color} won!`);
    }
  
    // check for tie
    if (board.every(row => row.every(cell => cell))) {
      this.gameOver = true;
      return endGame('Tie!');
    }

    // switch players
    if (this.currPlayer === this.players[0]) {
      this.currPlayer = this.players[1];
    } else {
      this.currPlayer =this.players[0];
    }
    //this.currPlayer = this.currPlayer === 1 ? 2 : 1;
  }

  /** checkForWin: check board cell-by-cell for "does a win start here?" */

  checkForWin() {
    const {board, height, width} = this;
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer
    const _win = cells =>
      cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < height &&
          x >= 0 &&
          x < width &&
          board[y][x] === this.currPlayer
      );

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}

class Player {
  constructor(color) {
    this.color = color;
  }
}

const startGame = document.querySelector(".game-button");
let clickCount = 0;
startGame.addEventListener("click", (e) => {
  e.preventDefault();
  let p1 = new Player(document.querySelector('.p1').value);
  let p2 = new Player(document.querySelector('.p2').value);

  let newGame = new Game(p1, p2, 6, 7);
})



//End of the OO Connect4 game
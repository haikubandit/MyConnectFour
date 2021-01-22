/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

const makeBoard = () => {
	// TODO: set "board" to empty HEIGHT x WIDTH matrix array
	for (let i = 0; i < HEIGHT; i++) {
		const row = [];
		for (let j = 0; j < WIDTH; j++) {
			row.push(null);
		}
		board.push(row);
	}
	return board;
};

/** makeHtmlBoard: make HTML table and row of column tops. */

const makeHtmlBoard = () => {
	// TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
	const htmlBoard = document.getElementById('board');
	// TODO: add comment for this code

	// create top row to select which column to play
	const top = document.createElement('tr');
	// give top row id="column-top"
	top.setAttribute('id', 'column-top');
	// create event listener for when top row is clicked
	top.addEventListener('click', handleClick);

	// loop based on width of board
	for (let i = 0; i < WIDTH; i++) {
		// create selection cell for each column of top row
		const headCell = document.createElement('td');
		//set id="i" for all top row cells
		headCell.setAttribute('id', i);
		// add cells to top row
		top.append(headCell);
	}
	//append top row to htmlBoard
	htmlBoard.append(top);

	// TODO: add comment for this code
	// loop based on height of board
	for (let i = 0; i < HEIGHT; i++) {
		// create number of table row elemnts based on HEIGHT
		const row = document.createElement('tr');
		// loop through each row based on WIDTH
		for (let j = 0; j < WIDTH; j++) {
			// create table data for each cell in the row
			const cell = document.createElement('td');
			// set an ID = the cells position on the board
			cell.setAttribute('id', `${i}-${j}`);
			// append each cell to the row
			row.append(cell);
		}
		// append each row to the board
		htmlBoard.append(row);
	}
};

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
	// TODO: write the real version of this, rather than always returning 0
	return 0;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
	// TODO: make a div and insert into correct table cell
	const cell = document.getElementById(`${y}-${x}`);
	const newPiece = document.createElement('div');
	newPiece.classList.add('piece');
	newPiece.classList.add('p1');
	cell.appendChild(newPiece);
	// cell.setAttribute('id', `${i}-${j}`);
}

/** endGame: announce game end */

function endGame(msg) {
	// TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
	// get x from ID of clicked cell
	const x = +evt.target.id;
	console.log(x);

	// get next spot in column (if none, ignore click)
	const y = findSpotForCol(x);
	if (y === null) {
		return;
	}

	// place piece in board and add to HTML table
	// TODO: add line to update in-memory board
	placeInTable(y, x);

	// check for win
	if (checkForWin()) {
		return endGame(`Player ${currPlayer} won!`);
	}

	// check for tie
	// TODO: check if all cells in board are filled; if so call, call endGame

	// switch players
	// TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
	function _win(cells) {
		// Check four cells to see if they're all color of current player
		//  - cells: list of four (y, x) cells
		//  - returns true if all are legal coordinates & all match currPlayer

		return cells.every(([ y, x ]) => y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH && board[y][x] === currPlayer);
	}

	// TODO: read and understand this code. Add comments to help you.

	for (var y = 0; y < HEIGHT; y++) {
		for (var x = 0; x < WIDTH; x++) {
			var horiz = [ [ y, x ], [ y, x + 1 ], [ y, x + 2 ], [ y, x + 3 ] ];
			var vert = [ [ y, x ], [ y + 1, x ], [ y + 2, x ], [ y + 3, x ] ];
			var diagDR = [ [ y, x ], [ y + 1, x + 1 ], [ y + 2, x + 2 ], [ y + 3, x + 3 ] ];
			var diagDL = [ [ y, x ], [ y + 1, x - 1 ], [ y + 2, x - 2 ], [ y + 3, x - 3 ] ];

			if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
				return true;
			}
		}
	}
}

makeBoard();
makeHtmlBoard();

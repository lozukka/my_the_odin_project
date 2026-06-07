function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }
  const getBoard = () => board;

  const changeToken = (row, column, player) => {
    const pickedCell = board[row][column];

    if (pickedCell.getValue() !== 0) return;

    board[row][column].addToken(player);
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue()),
    );
    console.log(boardWithCellValues);
  };
  return {
    getBoard,
    changeToken,
    printBoard,
  };
}

function Cell() {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return { getValue, addToken };
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two",
) {
  const game = Gameboard();
  const players = [
    {
      name: playerOneName,
      token: 1,
    },
    {
      name: playerTwoName,
      token: 2,
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    game.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    console.log(
      `Changing ${getActivePlayer().name}'s token into cell ${row} / ${column}`,
    );
    game.changeToken(row, column, getActivePlayer().token);

    const result = checkWinner();

    if (result === "draw") {
      game.printBoard();
      console.log("It's a draw!");
      return;
    }

    if (result) {
      game.printBoard();
      console.log(`${result.name} wins!`);
      return;
    }

    switchPlayerTurn();
    printNewRound();
  };

  const checkWinner = () => {
    const board = game.getBoard();

    const v = (row, col) => board[row][col].getValue();

    const winningCombinations = [
      // Rows
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      // Columns
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      // Diagonals
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        v(a[0], a[1]) !== 0 &&
        v(a[0], a[1]) === v(b[0], b[1]) &&
        v(a[0], a[1]) === v(c[0], c[1])
      ) {
        return getActivePlayer();
      }
    }

    const isDraw = board.every((row) =>
      row.every((cell) => cell.getValue() !== 0),
    );
    if (isDraw) return "draw";

    return null;
  };

  return { playRound, getActivePlayer, getBoard: game.getBoard };
}

function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");

  const updateScreen = () => {
    boardDiv.textContent = "";
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();
    playerTurnDiv.textContent = `${activePlayer.name}'s turn`;

    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");

        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = colIndex;
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      });
    });
  };

  function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;

    if (!selectedColumn || !selectedRow) return;

    game.playRound(selectedRow, selectedColumn);
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);

  updateScreen();
}

ScreenController();

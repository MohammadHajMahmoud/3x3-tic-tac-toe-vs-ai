let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let w; // = width / 3;
let h; // = height / 3;

let ai = 'AI';
let human = 'Player';
let currentPlayer = human;

function setup() {
  createCanvas(400, 400);
  w = width / 3;
  h = height / 3;
  let first = Math.floor(Math.random() * 3);
  let second = Math.floor(Math.random() * 3);
  board[first][second] = ai;
}

function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

function checkWinner() {
  let winner = null;
  let w = width / 3;
  let h = height / 3;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      strokeWeight(16);
      let x = w * i + w / 2;
      line (x, 0, x, height);
       winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      strokeWeight(16);
      let y = h * i + h / 2;
      line (0, y, width, y);
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
    strokeWeight(16);
    line(0,0,width,height);
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    strokeWeight(16);
    winner = board[2][0];

    line(0, width, height, 0);
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

function mousePressed() {
  if (currentPlayer == human) {
    // Human make turn
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    // If valid turn
    if (board[i][j] == '') {
      board[i][j] = human;
      currentPlayer = ai;
      setTimeout(bestMove, 400);
      
    }
  }
}

function draw() {
  background(255);
  stroke(0, 0, 0);
  strokeWeight(4);
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(64);
      let r = w / 4;
      if (spot == human) {
        textAlign(CENTER, CENTER);
        text('O', x, y);
      } else if (spot == ai) {
        textAlign(CENTER, CENTER);
        text('X', x, y);
      }
    }
  }

  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultP = createP('');
    if (result == 'tie') {
      resultP.html("GAME OVER");
    } else {
      resultP.html(`... AND THE WINNER IS: ${result} !!!`);
    }
  }
}
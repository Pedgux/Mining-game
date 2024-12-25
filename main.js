const worldCanvas = /** @type {HTMLCanvasElement} */ (
  document.getElementById("worldCanvas")
);
const ctx = worldCanvas.getContext("2d");
const size = 16; //cell size
let timeStamp = 0;

function clearScreen(color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, worldCanvas.width, worldCanvas.height);
}
function resizeCanvas() {
  worldCanvas.width = window.innerWidth;
  worldCanvas.height = window.innerHeight;
  clearScreen("black");
}
window.addEventListener("resize", resizeCanvas);

function createGrid() {
  let rows = Math.floor(worldCanvas.height / size);
  let cols = Math.floor(worldCanvas.width / size);
  const grid = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      if (i > rows - 10) {
        row.push(1);
      } else {
        row.push(0);
      }
    }
    grid.push(row);
  }
  return grid;
}

function drawGrid(grid) {
  clearScreen("black");
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      switch (grid[i][j]) {
        case 1:
          ctx.strokeStyle = "white";
          break;
        default:
          ctx.strokeStyle = "black";
          break;
      }
      ctx.strokeRect(j * size, i * size, size, size);
      ctx.rect;
    }
  }
}

function gameLoop(timeStamp) {
  //update grid when kun tehty
  player.update();

  drawGrid(grid);
  player.draw();
  requestAnimationFrame(() => gameLoop());
}

resizeCanvas();
let grid = createGrid();

let player = {
  x: worldCanvas.width / 2,
  y: worldCanvas.height / 2,
  vx: 0,
  vy: 0,
  width: size,
  height: size,
  color: "white",

  update: function () {
    this.x += this.vx;
    this.y += this.vy;
  },
  draw: function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};
//self explanatory 1
function handleKeydown(event) {
  switch (event.key) {
    case "w":
      player.vy = -1;
      break;
    case "s":
      player.vy = 1;
      break;
    case "a":
      player.vx = -1;
      break;
    case "d":
      player.vx = 1;
      break;
  }
}
//self explanatory 2
function handleKeyup(event) {
  switch (event.key) {
    case "w":
      player.vy = 0;
      break;
    case "s":
      player.vy = 0;
      break;
    case "a":
      player.vx = 0;
      break;
    case "d":
      player.vx = 0;
      break;
  }
}

//start the game
window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyup);
gameLoop();

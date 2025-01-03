const worldCanvas = /** @type {HTMLCanvasElement} */ (
  document.getElementById("worldCanvas")
);
const ctx = worldCanvas.getContext("2d");
const size = 16; //cell size
const gravityConstant = 0.1;

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
let previousTime = performance.now();
function gameLoop(timeStamp) {
  const deltaTime = Math.max(0, timeStamp - previousTime) / 1000 || 0;
  previousTime = timeStamp;

  //update grid tähä kun tehty
  player.update(deltaTime);

  drawGrid(grid);
  player.draw();
  requestAnimationFrame(gameLoop);
}

resizeCanvas();
let grid = createGrid();

let player = {
  x: worldCanvas.width / 2,
  y: worldCanvas.height / 2,
  vx: 0,
  vy: 0,
  speed: 100,
  width: size,
  height: size,
  color: "white",

  update: function (dt) {
    //apply gravity
    this.vy += gravityConstant;
    //position update
    this.x += this.vx * this.speed * dt;
    this.y += this.vy * this.speed * dt;

    //debugaus kamaa
    console.log("new update data yay");
    console.log(`x: ${this.x}  y:  ${this.y}`);
    console.log(`vx: ${this.vx}  vy:  ${this.vy}`);
    console.log(`deltaTime = ${dt}`);
    console.log(`worldCanvas width: ${worldCanvas.width / 2}`);
    console.log(`worldCanvas height: ${worldCanvas.height / 2}`);
  },
  draw: function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

function keydown(event) {
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

function keyup(event) {
  switch (event.key) {
    case "w":
    case "s":
      player.vy = 0;
      break;
    case "a":
    case "d":
      player.vx = 0;
      break;
  }
}

//start the game
window.addEventListener("keydown", keydown);
window.addEventListener("keyup", keyup);
gameLoop();

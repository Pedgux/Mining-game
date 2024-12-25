const worldCanvas = /** @type {HTMLCanvasElement} */ (
  document.getElementById("worldCanvas")
);
const ctx = worldCanvas.getContext("2d");
const size = 16; //cell size, universal for the graphics

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
  let x = Math.floor(worldCanvas.width / size);
  let y = Math.floor(worldCanvas.height / size);
  const grid = [];
  for (let i = 0; i < x; i++) {
    const row = [];
    for (let j = 0; j < y; j++) {
      row.push(0);
    }
    grid.push(row);
  }
  return grid;
}

function drawGrid(grid) {
  clearScreen("black");
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      ctx.fillStyle = "blue";
      ctx.fillRect(x * size, y * size, size, size);
    }
  }
  requestAnimationFrame(() => drawGrid(grid));
}
resizeCanvas();
let grid = createGrid();
drawGrid(grid);

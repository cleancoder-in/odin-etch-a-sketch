const gridContainerEl = document.querySelector(".grid-wrapper");
const newGridBtnEl = document.querySelector(".newGridBtn");
const clearGridBtnEl = document.querySelector(".clearGridBtn");
const cells = [];
let initialGridNum = 16;
let rgbColor = "";
const MAX_GRID_NUMBER = 100;
let decreasingAmount = 0;

function getRandomColor() {
  return `rgb(${Math.floor(Math.random() * 256)}, 
  ${Math.floor(Math.random() * 256)},
   ${Math.floor(Math.random() * 256)})`;
}

function colorTheCells(cell) {
  // if cell already colored, then darken it
  if (cell.classList.contains("marked")) {
    let rgbArr = cell.style
      .getPropertyValue("background-color")
      .match(/\d+/g)
      .map(Number);

    rgbArr = rgbArr.map((num) => {
      decreasingAmount = Math.ceil(num / 10);
      return (num -= decreasingAmount);
    });

    rgbColor = `rgb(${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]})`;
    cell.style.removeProperty("background-color");
    cell.style.removeProperty("border-color");
    cell.style.cssText += `background-color:${rgbColor}; border-color:${rgbColor}`;
    // if cell is not colored, then color it
  } else {
    rgbColor = getRandomColor();
    cell.style.cssText += `background-color:${rgbColor}; border-color:${rgbColor}`;
    cell.classList.add("marked");
  }
}

function createGrid(cellsPerSide) {
  let numOfCells = cellsPerSide * cellsPerSide;
  if (gridContainerEl.children.length > 0) {
    gridContainerEl.innerHTML = "";
  }
  for (let i = 1; i <= numOfCells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("box");
    cell.setAttribute(
      "style",
      `width: ${960 / cellsPerSide}px; height: ${960 / cellsPerSide}px`
    );
    gridContainerEl.appendChild(cell);
    cells.push(cell);
  }

  cells.forEach((cell) => {
    cell.addEventListener("mouseenter", () => {
      colorTheCells(cell);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  createGrid(initialGridNum);
});

newGridBtnEl.addEventListener("click", () => {
  let customizedGridNum = Number(prompt("Enter a number b/w 1 to 100"));
  if (customizedGridNum > MAX_GRID_NUMBER) {
    customizedGridNum = MAX_GRID_NUMBER;
  } else if (customizedGridNum < 0) {
    customizedGridNum = 0;
  } else {
    createGrid(customizedGridNum);
  }
});

clearGridBtnEl.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.style.removeProperty("background-color");
    cell.style.removeProperty("border-color");
    cell.classList.remove("marked");
  });
});

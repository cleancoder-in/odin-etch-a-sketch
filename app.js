const gridContainerEl = document.querySelector(".grid-wrapper");
const createGridBtnEl = document.querySelector("button");
let flexBasisValue;
const MAX_GRID_NUMBER = 100;

function getFlexBasisValue(num) {
  flexBasisValue = Math.floor(100 / num);
  return flexBasisValue;
}
function createGrid(num) {
  let numOfBoxes = num * num;
  flexBasisValue = getFlexBasisValue(num);
  if (gridContainerEl.children.length > 0) {
    gridContainerEl.innerHTML = "";
  }
  for (let i = 1; i <= numOfBoxes; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.style.flexBasis = flexBasisValue + "%";
    box.setAttribute("data-id", i);
    gridContainerEl.appendChild(box);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  createGrid(16);
});

gridContainerEl.addEventListener("mouseout", (e) => {
  let boxId = e.target.dataset.id;
  let boxEl = gridContainerEl.querySelector(`[data-id = "${boxId}"]`);
  if (boxEl) {
    boxEl.classList.add("boxColorOnHover");
  }
});

createGridBtnEl.addEventListener("click", () => {
  let gridNum = Number(prompt("Create a grid of your choice"));
  if (gridNum > MAX_GRID_NUMBER) {
    gridNum = MAX_GRID_NUMBER;
  }
  createGrid(gridNum);
});

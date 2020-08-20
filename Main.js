let attackButton = document.getElementById("attack");

let turnHistory = document.getElementById("turnHistory");

let enemyGrid = [
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, true, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false]
]

//Finds the grid div and places one button for each tile on the grid
const placeGrid = function(){

  let grid = document.getElementById("grid");

  for(let y= 1; y <= 10; y++){

    for(let x = 1; x <= 10; x++){

      grid.innerHTML += `<button class="gridButton" id="gB${x + (y*10)}" onclick=attack(${x},${y})></button>`;

    }

    grid.innerHTML += "<br>";

  }

}

const attack = function(x, y,){

  button = document.getElementById(`gB${x + (y*10)}`);

  if(enemyGrid[y][x]){

    turnHistory.innerHTML += `<div class='turn'>P1 Attacks ${x}, ${y}: Hit!<div>`;

    button.className = "hit";

  } else {

    turnHistory.innerHTML += `<div class='turn'>P1 Attacks ${x}, ${y}: Miss!<div>`;

    button.className = "noHit";

  }

  button.setAttribute("onClick", "");

}

//+++Start Game+++
placeGrid();
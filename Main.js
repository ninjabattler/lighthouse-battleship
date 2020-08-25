let attackButton = document.getElementById("attack");

const turnHistory = document.getElementById("turnHistory");

let enemyGrid = [
  [false, false, false, false, false, true, false, false, false, false],
  [false, false, false, false, false, true, false, false, false, false],
  [false, false, false, false, false, true, false, false, false, false],
  [false, false, false, false, false, true, false, false, false, false],
  [false, false, false, false, false, true, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, true, true, false, false, false, false, true, true, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false]
]

let playerGrid = [
  [false, false, false, false, false, true, false, false, false, false],
  [false, false, false, false, false, true, false, false, false, false],
  [false, false, false, false, false, true, false, false, false, false],
  [false, false, false, false, false, true, false, false, false, false],
  [false, false, false, false, false, true, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, true, true, false, false, false, false, true, true, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false]
]

//Finds the grid div and places one button for each tile on the grid
const placeGrid = function(grid, enemy){

  for(let y= 1; y <= 10; y++){

    for(let x = 1; x <= 10; x++){

      if(!enemy){

        grid.innerHTML += `<button class="gridButton" id="gB${x + (y*10)}" onclick="attack(${x},${y},'P1')"></button>`;

      } else {

        grid.innerHTML += `<button class="gridButton" id="eB${x + (y*10)}" ></button>`;

      }

    }

    grid.innerHTML += "<br>";

  }

}

const attack = function(x, y, attacker, enemy){

  let button = document.getElementById(`gB${x + (y*10)}`);
  if(enemy) button = document.getElementById(`eB${x + (y*10)}`);

  let gridToAttack = enemyGrid;
  if(enemy) gridToAttack = playerGrid

  if(gridToAttack[y-1][x-1]){

    turnHistory.innerHTML += `<div class='turn'><div class="nameIcon">${attacker}</div>Attacks ${x}, ${y}: <div style="color: lime;">Hit!</div><div>`;

    button.className = "hit";

  } else {

    turnHistory.innerHTML += `<div class='turn'><div class="nameIcon">${attacker}</div>Attacks ${x}, ${y}: <div style="color: red;">Miss!</div><div>`;

    button.className = "noHit";

  }

  button.setAttribute("onClick", "");

  if(!enemy) {setTimeout(() => {attack(Math.ceil(Math.random() * 10), Math.ceil(Math.random() * 10),"P2", true)}, 1000);}

}

//+++Start Game+++
placeGrid(document.getElementById("grid"), false);
placeGrid(document.getElementById("grid2"), true);
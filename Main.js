let attackButton = document.getElementById("attack");

const turnHistory = document.getElementById("turnHistory");

const columnNames = ['A','B','C','D','E','F','G','H','I','J'];

const enemyGrid = [
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false]
]

const playerGrid = [
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false]
]

let playerShips = {

  carrier: {

    position: [1,1],

    hits: 5

  },

  battleship: {

    position: [1,1],

    hits: 4

  },

  cruiser: {

    position: [1,1],

    hits: 3

  }, 

  submarine: {

    position: [1,1],

    hits: 3

  }, 

  destroyer: {

    position: [1,1],

    hits: 2

  }

}

let verticle = true;

const rotate = function(){

  verticle = !verticle;

  moveShip("battleship",0,0);

}

const resetGrid = function(){

  for(let y= 1; y <= 10; y++){

    for(let x = 1; x <= 10; x++){

      if(document.getElementById(`gB${x + (y*10)}`).className !== "ship"){
        document.getElementById(`gB${x + (y*10)}`).outerHTML = `<button class="gridButton" id="gB${x + (y*10)}" onclick="attack(${x},${y},'P1')">${columnNames[x-1]}${y}</button>`;
      }

    }

  }
}

//Finds the grid div and places one button for each tile on the grid
const placeGrid = function(grid, enemy){

  for(let y= 1; y <= 10; y++){

    for(let x = 1; x <= 10; x++){

      if(!enemy){

        grid.innerHTML += `<button class="gridButton" id="gB${x + (y*10)}" onclick="attack(${x},${y},'P1')">${columnNames[x-1]}${y}</button>`;

      } else {

        grid.innerHTML += `<button class="gridButton" id="eB${x + (y*10)}" >${columnNames[x-1]}${y}</button>`;

      }

    }

    grid.innerHTML += "<br>";

  }

};
//Script for placing a ship on the grid
const moveShip = function(ship, x, y){

  resetGrid();

  playerShips[ship].position[0] += x;
  playerShips[ship].position[1] += y;

  

  if(x !== 0 && (playerShips[ship].position[0] + playerShips[ship].hits > 14 || playerShips[ship].position[0] + playerShips[ship].hits < 5)){

    playerShips[ship].position[0] -= x;

  }

  if(y !== 0 && (playerShips[ship].position[1] + playerShips[ship].hits > 11 || playerShips[ship].position[1] + playerShips[ship].hits < 5)){

    playerShips[ship].position[1] -= y;

  }

  let posX = playerShips[ship].position[0];
  let posY = playerShips[ship].position[1];
  
  if(!verticle){
    for(let i = 0; i < playerShips[ship].hits; i++){
      
      if(document.getElementById(`gB${(posX) + ((posY*10) + i)}`).className !== "ship"){
        document.getElementById(`gB${(posX) + ((posY*10) + i)}`).className = "placing";
      }

    }
  } else {
    for(let i = 0; i < playerShips[ship].hits; i++){

      if(document.getElementById(`gB${(posX) + ((posY*(10)) + 10*i)}`).className !== "ship"){
        document.getElementById(`gB${(posX) + ((posY*(10)) + 10*i)}`).className = "placing";
      }
  
    }
  }

}

const placeShip = (ship) => {

  let posX = playerShips[ship].position[0];
  let posY = playerShips[ship].position[1];
  for(let i = 0; i < playerShips[ship].hits; i++){
    if(!verticle){

      playerGrid[posX + i][posY] = true;
      document.getElementById(`gB${(posX + i) + ((posY*(10)))}`).className = "ship";

    } else {

      playerGrid[posX][posY + i] = true;
      document.getElementById(`gB${(posX) + ((posY*(10)) + 10*i)}`).className = "ship";

    }
  }

}

const attack = function(x, y, attacker, enemy){

  let button = document.getElementById(`gB${x + (y*10)}`);
  if(enemy) button = document.getElementById(`eB${x + (y*10)}`);

  let gridToAttack = enemyGrid;
  if(enemy) gridToAttack = playerGrid;

  if(gridToAttack[y-1][x-1]){

    turnHistory.innerHTML += `<div class='turn'><div class="nameIcon">${attacker}</div>Attacks ${columnNames[x-1]}, ${y}: <div style="color: lime;">Hit!</div><div>`;

    button.className = "hit";

  } else {

    turnHistory.innerHTML += `<div class='turn'><div class="nameIcon">${attacker}</div>Attacks ${columnNames[x-1]}, ${y}: <div style="color: red;">Miss!</div><div>`;

    button.className = "noHit";

  }

  button.setAttribute("onClick", "");

  if(!enemy) {setTimeout(() => {attack(Math.ceil(Math.random() * 10), Math.ceil(Math.random() * 10),"P2", true)}, 1000);};

}

//+++Start Game+++
placeGrid(document.getElementById("grid"), false);
placeGrid(document.getElementById("grid2"), true);

moveShip("battleship", 1, 5);
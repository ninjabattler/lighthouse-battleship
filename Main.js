let attackButton = document.getElementById("attack");

let turnHistory = document.getElementById("turnHistory");

//Finds the grid div and places one button for each tile on the grid
const placeGrid = function(){

  let grid = document.getElementById("grid");

  for(let y= 1; y <= 10; y++){

    for(let x = 1; x <= 10; x++){

      grid.innerHTML += `<button onclick="attack(${x},${y})"></button>`;

    }

    grid.innerHTML += "<br>";

  }

}

const attack = function(x, y){

  turnHistory.innerHTML += `<div class='turn'>P1 Attacks ${x}, ${y}: <div>`;

}

//+++Start Game+++
placeGrid();
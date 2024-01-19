/* Inspired by
    https://mathworld.wolfram.com/ElementaryCellularAutomaton.html
    https://youtu.be/Ggxt06qSAe4
*/

// Variables to set freely (even numbers preffered)
let amountOfCells = 100;
let scale = 10;

/*
  Also check the lookup table in Cell.js as it contains the actual
  rules for this cellular automata!
*/

// global variables (get set automatically)
let stepButton;
let autoButton;
let showIndexButton;
let depth = 0;
let auto = false;
let showIndex = false;

// global grid containing the cells
let grid = []

/*
  Basically it runs through all the cells, gives them a "new value"
  and then runs through all of them again to actually set the new value
  as the current one. This is done to prevent the cells from grabbing
  a partially updated set of values from the current pass.
*/
function tick() {
  if(depth > height) return;
  for(let i = 0; i < amountOfCells; i++) {
        grid[i].step();
  }
  for(let i = 0; i < amountOfCells; i++) {
        grid[i].update();
  }
  depth += scale;
}

function setup() {
  createCanvas(amountOfCells*scale, 800);
  background(50);
  
  console.log(`Amount of cells: ${amountOfCells}`)
  
  console.log(`Cellsize: ${scale}`);
  
  stepButton = createButton("Step");
  autoButton = createButton("Auto");
  showIndexButton = createButton("Show Index"); // Shows index of neighbourhood during last pass
  
  for(let i = 0; i < amountOfCells; i++) {
    grid[i] = new Cell(0) // or replace 0 init value with: Math.round(Math.random())
  }
  
  grid[parseInt(amountOfCells/2)].value = 1 // this sets the most center cell to 1
  
  
  for(let i = 0; i < amountOfCells; i++) {
    const indexPrev = (i-1) >= 0 ? i-1 : amountOfCells-1;
    const indexNext = (i+1) % amountOfCells;
    
    grid[i].registerNeighbours(grid[indexPrev], grid[indexNext]); 
  }
  
  // Buttonhandling
  
  stepButton.mousePressed(() => {
     tick();
  })
  
  autoButton.mousePressed(() => {
     auto = !auto;
  })
  
  showIndexButton.mousePressed(() => {
     showIndex = !showIndex;
  })
  
  // the interval running when auto is toggled on
  setInterval(() => {
    if(auto) tick();
  }, 20);
  
  // Styling
  textAlign(CENTER);
  textSize(scale/2);
}

function draw() {
  for(let i = 0; i < amountOfCells; i++) {
    noStroke();
    fill(grid[i].value == 0 ? 255 : 0);
    rect(i*scale, depth, i+scale, scale);
    
    if(showIndex && grid[i].lastIndex !== undefined) {
        stroke(0);
        fill(255);
        textSize(scale/2);
        text(grid[i].lastIndex, i*scale+scale/2, depth+scale/2);
        textSize(12);
        text((grid[i].lastIndex >>> 0).toString(2), i*scale+scale/2, depth+scale/2+12);
    }
    
   }
  
  depth = depth % height;
}

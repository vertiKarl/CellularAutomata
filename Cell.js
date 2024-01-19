/*
  000 => lookupTable[0]
  ...
  111 => lookupTable[7]
*/

/*
  These are the actual rules. To understand this, you might want to
  check this resource: https://mathworld.wolfram.com/ElementaryCellularAutomaton.html
  
  It is basically a one dimensional array containing all the possible indices
  of the last neighbourhood if that makes sense.

  To set it to a specific ruleset:
  1. Just take the given rule number and convert it to binary.
  2. set the binary number bottom-to-top in this lookup table.
    (11010010 is the one set here!)
  3. Profit!
*/
const lookupTable = [
  0, // 1
  1, // 2
  0, // 4
  0, // 8
  1, // 16
  0, // 32
  1, // 64
  1 // 128
]

class Cell {
  constructor(value) {
    this.value = value;
    this.nextValue = value;
  }
  
  // sets references to the neighbour objects, so that we can check them anytime
  registerNeighbours(a, b) {
    this.neighbours = [a,b];
  }
  
  step() {
    if(!this.neighbours) throw new Error("Neighbours not registered!");
    
    // Pattern-Rules
    let index = 0;
    
    index += this.neighbours[0].value * 4; // sets leftmost bit
    index += this.value * 2;               // sets center bit
    index += this.neighbours[1].value * 1; // sets rightmost bit
    
    // save lastIndex so we can reference it later as text!
    this.lastIndex = index;
    
    // set our nextValue so we don't modify it mid pass!
    this.nextValue = lookupTable[index];
  }
  
  // this then actually changes it after we passed completely
  update() {
    this.value = this.nextValue;
  }
}

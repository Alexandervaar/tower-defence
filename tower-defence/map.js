let canvasSize = 500; //Defines the size of canvas 
let numGridElems = 10; //Defines the number os grid elements
let framecount = 0; //Amount of frames

let path = [
    {row:3, col:0}, {row:3, col:1}, {row:3, col:2}, {row:3, col:3},
    {row:4, col:3}, {row:5, col:3}, {row:6, col:3}, {row:7, col:3},
    {row:7, col:4}, {row:7, col:5}, {row:7, col:6},
    {row:6, col:6}, {row:5, col:6}, {row:4, col:6}, {row:3, col:6}, {row:2, col:6},
    {row:2, col:7}, {row:2, col:8}, {row:2, col:9}
]; //Defines the path that the monsters will follow

let start_of_path = {row:3, col:0}; //Defines were the path starts, used as spawnpoint of monsters


function setup() {
    createCanvas(canvasSize, canvasSize);
} 

function draw() {
    background(220);
}

function draw() {
    framecount++;
    background(95, 135, 49);

    // Draw grid x axes
    for (let i=0; i < grid.numElems; i++) {
        line(0,i*grid.sizeElems,width,i*grid.sizeElems)
    }
    // Draw grid y axes
    for (let i=0; i < grid.numElems; i++) {
        line(i*grid.sizeElems,0,i*grid.sizeElems,canvasSize)
    }

    // Draw monster track
    for(let i=0; i < grid.numElems; i++){
        if (grid.data[i].length > 0) {
            for(let j=0; j<grid.numElems; j++) {
                if (grid.data[i][j] === 1) {
                    fill(176, 136, 93)
                    rect(j*grid.sizeElems,i*grid.sizeElems,grid.sizeElems)
                }
            }
        }
    }
}
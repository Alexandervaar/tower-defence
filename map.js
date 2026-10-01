let canvasSize = 500; // Defines the size of the canvas
let numGridElems = 10; // Defines the number of grid elements
let framecount = 0; // Amount of frames


let grid = {
    numElems: numGridElems,
    sizeElems: canvasSize/numGridElems, // size of grid elements in pixels
    data: [
        [],
        [],
        [0,0,0,0,0,0,1,1,1,1],
        [1,1,1,1,0,0,1,0,0,0],
        [0,0,0,1,0,0,1,0,0,0],
        [0,0,0,1,0,0,1,0,0,0],
        [0,0,0,1,0,0,1,0,0,0],
        [0,0,0,1,1,1,1,0,0,0],
        [],
        []
    ],
}

let path = [
    { row: 3, col: 0 }, { row: 3, col: 1 }, { row: 3, col: 2 }, { row: 3, col: 3 },
    { row: 4, col: 3 }, { row: 5, col: 3 }, { row: 6, col: 3 }, { row: 7, col: 3 },
    { row: 7, col: 4 }, { row: 7, col: 5 }, { row: 7, col: 6 },
    { row: 6, col: 6 }, { row: 5, col: 6 }, { row: 4, col: 6 }, { row: 3, col: 6 }, { row: 2, col: 6 },
    { row: 2, col: 7 }, { row: 2, col: 8 }, { row: 2, col: 9 }
]; // Defines the path that monsters will follow

let start_of_path = { row: 3, col: 0 }; // Defines where the path starts, used as spawn point of monsters


function setup() {
    createCanvas(canvasSize, canvasSize);
}

function draw() {
    framecount++;
    background(95, 135, 49);

    // Draw grid x axes
    for (let i = 0; i < grid.numElems; i++) {
        line(0, i * grid.sizeElems, width, i * grid.sizeElems);
    }

    // Draw grid y axes
    for (let i = 0; i < grid.numElems; i++) {
        line(i * grid.sizeElems, 0, i * grid.sizeElems, canvasSize);
    }

    // Draw monster track
    for (let i = 0; i < grid.numElems; i++) {
        if (grid.data[i].length > 0) {
            for (let j = 0; j < grid.numElems; j++) {
                if (grid.data[i][j] === 1) {
                    fill(176, 136, 93);
                    rect(j * grid.sizeElems, i * grid.sizeElems, grid.sizeElems, grid.sizeElems);
                }
            }
        }
    }

    if (typeof drawPlayerHud === "function") {
        drawPlayerHud();
    }
}
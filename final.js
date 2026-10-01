// Me and Gustav have worked together on this project. If you want to know more, contact us

let canvasSize = 500;    // Size of canvas
let numGridElems = 10;  // Amount of grid elements
let framecount = 0;    // Frame count

// Spawn time period
let waveDelay = 600;          // Delay before a wave starts, in frames (10s at 60 FPS)
let waitingForWave = true;   // Whether we're currently counting down to the next wave
let waveCountdownStart = 0; // The frame the current countdown began

// Display variables
let health = 100;         // Amount of starting health
let money = 500;         // Amount of starting cash
let killReward = 25;    // Money earned per monster killed
let highScore_mk = 0;  // Highscore for monsters killed
let highScore_wn = 0; // Highscore for highest wave completed
let waveNumber = 1;  // Which wave we are on

// Monster
let monstersKilled = 0;            // Monsters killed
let monstersinwave = 0;           // Monsters in the current wave
let monstersspawned = 0;         // Monsters spawned in the current wave
let monsterspawninterval = 60;  // Spawn a monster every 60 frames (1 second at 60fps)
let lastMonsterSpawnTime = 0;  // Last time a monster was spawned (in frames)
let waveActive = false;       // Whether a wave is currently active
let monsters = [];           // Array to hold all active monsters

// Monster stats
let monsterdamage1 = 5;      // The damage of monster 1
let monsterspeed1 = 2;      // The speed of monster 1
let monsterhealth1 = 100;  // The health of monster 1

// Towers
let towers = [];                        // List of placed towers
let selectedTowerIndex = -1;           // Track which tower is selected
let towerRadius = 3;                  // Tower radius in tiles
let towerdps = 50;                   // Damage per shot (one shot per second)
let towerCooldown = 60;             // Frames between shots
let shotDuration = 8;              // How many frames a shot line stays visible
let numberoftowers = 0;           // Number of towers placed
let towerBaseCost = 200;         // Price of the first tower
let towerCostIncrease = 75;     // How much each extra tower adds to the price

let grid = {
    numElems: numGridElems,
    sizeElems: canvasSize / numGridElems, // size of grid elements in pixels
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
};

let start = {row: 3, col: 0};

let path = [
    {row:3, col:0}, {row:3, col:1}, {row:3, col:2}, {row:3, col:3},
    {row:4, col:3}, {row:5, col:3}, {row:6, col:3}, {row:7, col:3},
    {row:7, col:4}, {row:7, col:5}, {row:7, col:6},
    {row:6, col:6}, {row:5, col:6}, {row:4, col:6}, {row:3, col:6}, {row:2, col:6},
    {row:2, col:7}, {row:2, col:8}, {row:2, col:9}
];

// ---------------- Monsters ----------------

function createMonster() {
    return {
        x: start.col * grid.sizeElems + grid.sizeElems / 2,
        y: start.row * grid.sizeElems + grid.sizeElems / 2,
        pathIndex: 0,
        speed: monsterspeed1,
        health: monsterhealth1,
        damage: monsterdamage1,
        isAlive: true,
        reachedEnd: false
    };
}

function moveMonster(monster) {
    if (monster.pathIndex >= path.length - 1) {
        health -= monster.damage;
        monster.reachedEnd = true; // Mark the monster as having reached the end
        return monster;
    }

    let target = path[monster.pathIndex + 1];
    let targetX = target.col * grid.sizeElems + grid.sizeElems / 2;
    let targetY = target.row * grid.sizeElems + grid.sizeElems / 2;

    let dx = targetX - monster.x;
    let dy = targetY - monster.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < monster.speed) {
        monster.x = targetX;
        monster.y = targetY;
        monster.pathIndex++;
    } else {
        monster.x += (dx / distance) * monster.speed;
        monster.y += (dy / distance) * monster.speed;
    }
    return monster;
}

function drawMonster(monster) {
    fill(50, 191, 165);
    ellipse(monster.x, monster.y, grid.sizeElems * 0.6, grid.sizeElems * 0.6);
}

function startwave() {
    waveActive = true;
    monstersspawned = 0;
    monstersinwave = 10;
}

function updateWave() {
    if (waveActive === false) {
        return; // No wave is currently active
    }
    if (monstersspawned >= monstersinwave) {
        waveActive = false; // All monsters in the wave have been spawned
        return;
    }
    if (framecount - lastMonsterSpawnTime >= monsterspawninterval) {
        monsters.push(createMonster());
        monstersspawned++;
        lastMonsterSpawnTime = framecount;
    }
}

function updatemonsters() {
    for (let i = monsters.length - 1; i >= 0; i--) {
        let m = monsters[i];

        // Killed by a tower
        if (m.health <= 0) {
            monsters.splice(i, 1);
            monstersKilled++;
            money += killReward;
            continue;
        }

        m = moveMonster(m);

        // Reached the end (does NOT count as a kill)
        if (m.reachedEnd) {
            monsters.splice(i, 1);
            continue;
        }

        drawMonster(m);
        monsters[i] = m;
    }
}

function isWaveFinished() {
    return waveActive === false && monsters.length === 0;
}

// ---------------- Towers ----------------

// Current price of the next tower (recalculated every time it is needed)
function getTowerCost() {
    return towerBaseCost + numberoftowers * towerCostIncrease;
}

// Get mouse position in grid coordinates
function mousePositionInGrid() {
    let col = floor(mouseX / grid.sizeElems);
    let row = floor(mouseY / grid.sizeElems);
    return {col: col, row: row};
}

// Check if a tower is at the clicked position
function getTowerAtPosition(col, row) {
    for (let i = 0; i < towers.length; i++) {
        let tower = towers[i];
        let towerX = tower.col * grid.sizeElems + grid.sizeElems / 2;
        let towerY = tower.row * grid.sizeElems + grid.sizeElems / 2;
        let clickX = col * grid.sizeElems + grid.sizeElems / 2;
        let clickY = row * grid.sizeElems + grid.sizeElems / 2;
        let distance = dist(clickX, clickY, towerX, towerY);
        if (distance < grid.sizeElems) {
            return i;
        }
    }
    return -1;
}

function updateTowerAttacks() {
    for (let tower of towers) {
        if (tower.cooldown > 0) {
            tower.cooldown--;
            continue;
        }

        let towerX = tower.col * grid.sizeElems + grid.sizeElems / 2;
        let towerY = tower.row * grid.sizeElems + grid.sizeElems / 2;
        let target = null;
        let nearestDistance = Infinity;

        for (let monster of monsters) {
            if (monster.reachedEnd || monster.health <= 0) continue;

            let distance = dist(towerX, towerY, monster.x, monster.y);
            if (distance <= towerRadius * grid.sizeElems && distance < nearestDistance) {
                target = monster;
                nearestDistance = distance;
            }
        }

        if (target) {
            target.health -= towerdps;
            tower.cooldown = towerCooldown;
            // Remember the shot so it can be drawn for a few frames
            tower.shot = {x1: towerX, y1: towerY, x2: target.x, y2: target.y, frame: framecount};
        }
    }
}

function drawShots() {
    for (let tower of towers) {
        if (tower.shot && framecount - tower.shot.frame < shotDuration) {
            stroke(255, 255, 0);
            strokeWeight(3);
            line(tower.shot.x1, tower.shot.y1, tower.shot.x2, tower.shot.y2);
        }
    }
    stroke(0);
    strokeWeight(1);
}

// ---------------- p5 ----------------

function setup() {
    createCanvas(canvasSize, canvasSize);
}

function draw() {
    framecount++;
    background(95, 135, 49);
    stroke(0);
    strokeWeight(1);

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
                    rect(j * grid.sizeElems, i * grid.sizeElems, grid.sizeElems);
                }
            }
        }
    }

    // Size of tower in pixels
    let towerSize = 30;

    // Draw radius for selected tower
    if (selectedTowerIndex >= 0 && selectedTowerIndex < towers.length) {
        let tower = towers[selectedTowerIndex];
        let x = tower.col * grid.sizeElems + grid.sizeElems / 2;
        let y = tower.row * grid.sizeElems + grid.sizeElems / 2;
        let radiusPixels = towerRadius * grid.sizeElems;
        fill(100, 150, 255, 30);
        stroke(100, 150, 255, 60);
        strokeWeight(1);
        circle(x, y, radiusPixels * 2);
        stroke(0);
        strokeWeight(1);
    }

    // Draw towers that have been placed
    fill(0, 0, 0);
    for (let tower of towers) {
        let x = tower.col * grid.sizeElems + grid.sizeElems / 2;
        let y = tower.row * grid.sizeElems + grid.sizeElems / 2;
        circle(x, y, towerSize);
    }

    // Draws a preview of where the tower is going to be placed
    let col = floor(mouseX / grid.sizeElems);
    let row = floor(mouseY / grid.sizeElems);
    if (money >= getTowerCost()) {
        if (col >= 0 && col < grid.numElems && row >= 0 && row < grid.numElems) {
            let x = col * grid.sizeElems + grid.sizeElems / 2;
            let y = row * grid.sizeElems + grid.sizeElems / 2;
            fill(0, 0, 0, 100);
            circle(x, y, towerSize);
        }
    }

    // Start a wave once the countdown has passed
    if (waitingForWave && (framecount - waveCountdownStart >= waveDelay)) {
        waitingForWave = false;
        startwave();
    }

    // Game logic - each is called exactly once per frame
    updateWave();
    updateTowerAttacks();
    updatemonsters();
    drawShots();

    // Draw text for health, money, tower cost, and monster stats
    stroke(0);
    strokeWeight(1);
    fill("white");
    textSize(16);
    textAlign(LEFT, TOP);
    text("Health: " + health, 6, 15);
    text("Money: " + money, 6, 30);
    text("Tower Cost: " + getTowerCost(), 6, 45);
    text("Monsters Killed: " + monstersKilled, 6, 60);
    text("Wave: " + waveNumber, 6, 75);

    // Show a countdown while waiting for the next wave
    if (waitingForWave) {
        let secondsLeft = ceil((waveDelay - (framecount - waveCountdownStart)) / 60);
        fill("white");
        textSize(24);
        textAlign(CENTER, CENTER);
        text("Next wave in: " + secondsLeft, 250, 45);
    }

    // Once a wave is finished, start counting down to the next one
    if (isWaveFinished() && !waitingForWave) {
        waveNumber++;
        waitingForWave = true;
        waveCountdownStart = framecount;
    }

    // Game over
    if (health <= 0) {
        highScore_mk = max(highScore_mk, monstersKilled);
        highScore_wn = max(highScore_wn, waveNumber - 1); // Waves actually completed
        background(0);
        fill("White");
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(30);
        text("Game Over - Your Score: " + monstersKilled + "\nYour Highscore: " + highScore_mk + " monsters killed" + "\nMax wave cleared: " + highScore_wn + "\nLeft-click to restart", width / 2, height / 2);
        noLoop(); // Stops the draw loop when the game is over
    }
}

function mousePressed() {
    if (health <= 0) {
        health = 100;                     // Reset health
        money = 500;                     // Reset money
        monsters = [];                  // Reset the monsters array
        monstersKilled = 0;            // Reset the number of monsters killed
        waveNumber = 1;               // Reset wave number
        towers = [];                 // Reset placed towers
        selectedTowerIndex = -1;    // Reset selected tower
        waveActive = false;        // Reset wave state
        monstersspawned = 0;      // Reset spawn counter
        waitingForWave = true;   // Delay applies again before the first wave
        waveCountdownStart = framecount; // Restart the countdown from now
        numberoftowers = 0;             // Reset number of towers (and therefore the price)
        loop();                        // Restart the draw loop
        return;
    }

    let mousePosition = mousePositionInGrid();

    // Ignore clicks outside the canvas
    if (mousePosition.col < 0 || mousePosition.col >= grid.numElems || mousePosition.row < 0 || mousePosition.row >= grid.numElems) {
        return;
    }

    // Check if clicking on an existing tower
    let towerIndex = getTowerAtPosition(mousePosition.col, mousePosition.row);
    if (towerIndex >= 0) {
        selectedTowerIndex = towerIndex;
        return;
    }

    // Check if grid element is occupied by the monster track
    if (grid.data[mousePosition.row].length > 0 && grid.data[mousePosition.row][mousePosition.col] === 1) {
        return;
    }

    // Check if money is sufficient compared to tower cost
    if (money < getTowerCost()) {
        return;
    }

    // Place tower
    money -= getTowerCost();
    towers.push({row: mousePosition.row, col: mousePosition.col, cooldown: 0, shot: null});
    numberoftowers++;
    selectedTowerIndex = towers.length - 1;
}
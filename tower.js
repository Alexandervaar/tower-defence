// Tower logic for the existing map.js.
// This file does not change the map itself.

class Tower {
    constructor(col, row, options = {}) {
        this.col = col;
        this.row = row;
        this.color = options.color ?? [255, 180, 70];
        this.previewColor = options.previewColor ?? [120, 220, 120];
        this.invalidColor = options.invalidColor ?? [220, 90, 90];
        this.isPreview = Boolean(options.isPreview);
        this.isPlaced = Boolean(options.isPlaced);
        this.isSelected = Boolean(options.isSelected);
        this.isVisible = options.isVisible ?? true;
        this.validPlacement = options.validPlacement ?? true;
    }

    get tileSize() {
        return grid && grid.sizeElems ? grid.sizeElems : canvasSize / numGridElems;
    }

    get diameter() {
        return this.tileSize * 0.8;
    }

    get x() {
        return this.col * this.tileSize + this.tileSize / 2;
    }

    get y() {
        return this.row * this.tileSize + this.tileSize / 2;
    }

    get range() {
        return this.tileSize * 3;
    }

    canPlaceHere() {
        if (!grid || !grid.data || !grid.data[this.row]) {
            return false;
        }

        if (this.col < 0 || this.col >= grid.numElems || this.row < 0 || this.row >= grid.numElems) {
            return false;
        }

        return grid.data[this.row][this.col] !== 1;
    }

    draw() {
        if (!this.isVisible) {
            return;
        }

        const showRange = this.isPreview || this.isSelected || this.isPlaced;
        const rangeAlpha = this.isPreview ? 30 : 120;

        if (showRange) {
            noFill();
            stroke(this.validPlacement ? 80 : 220, 220, 120, rangeAlpha);
            strokeWeight(0.8);
            ellipse(this.x, this.y, this.range * 2, this.range * 2);
        }

        if (this.isPreview) {
            noFill();
            stroke(this.validPlacement ? 120 : 220, 220, 120, 100);
            strokeWeight(1.2);
            circle(this.x, this.y, this.diameter);
            return;
        }

        fill(this.color[0], this.color[1], this.color[2], 220);
        stroke(40, 40, 40, 200);
        strokeWeight(1.2);
        circle(this.x, this.y, this.diameter);

        noStroke();
        fill(30, 30, 30, 140);
        circle(this.x, this.y, this.diameter * 0.12);
    }
}

function getTileFromMouse() {
    if (!grid || !grid.numElems || !grid.sizeElems) {
        return null;
    }

    const col = floor(mouseX / grid.sizeElems);
    const row = floor(mouseY / grid.sizeElems);

    if (col < 0 || col >= grid.numElems || row < 0 || row >= grid.numElems) {
        return null;
    }

    return { row, col };
}

let towerPreview = new Tower(0, 0, {
    isPreview: true,
    isVisible: false,
    validPlacement: true
});

let placedTowers = [];
let selectedTower = null;

function updateTowerPreview() {
    const tile = getTileFromMouse();
    if (!tile) {
        towerPreview.isVisible = false;
        return;
    }

    towerPreview.col = tile.col;
    towerPreview.row = tile.row;
    towerPreview.isVisible = true;
    towerPreview.validPlacement = towerPreview.canPlaceHere();
}

function drawTowerPreview() {
    if (!towerPreview.isVisible) {
        return;
    }

    towerPreview.draw();
}

function drawPlacedTowers() {
    for (let i = 0; i < placedTowers.length; i++) {
        placedTowers[i].draw();
    }
}

function placeTowerAtMouse() {
    const tile = getTileFromMouse();
    if (!tile) {
        return;
    }

    const testTower = new Tower(tile.col, tile.row, { isPlaced: true });
    if (!testTower.canPlaceHere()) {
        return;
    }

    const tower = new Tower(tile.col, tile.row, {
        isPlaced: true,
        isVisible: true,
        validPlacement: true,
        color: [255, 180, 70]
    });

    placedTowers.push(tower);
    selectedTower = tower;
}

function selectTowerAtMouse() {
    const tile = getTileFromMouse();
    if (!tile) {
        selectedTower = null;
        return;
    }

    for (let i = 0; i < placedTowers.length; i++) {
        const tower = placedTowers[i];
        if (tower.col === tile.col && tower.row === tile.row) {
            selectedTower = tower;
            tower.isSelected = true;
            return;
        }
    }

    selectedTower = null;
}

function clearTowerSelection() {
    for (let i = 0; i < placedTowers.length; i++) {
        placedTowers[i].isSelected = false;
    }
    selectedTower = null;
}

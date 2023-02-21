import { PaletteFactory } from "../palettes/PaletteFactory.js";
export class BaseDrawer {
    get grid() {
        return this.model.grid;
    }
    ;
    get spreadFactor() {
        return this.model.getSpreadFactor();
    }
    ;
    constructor(model, initialX, initialY) {
        this.allowCollisions = false;
        this.range = 0;
        this.model = model;
        this.lineWidth = model.getLineWidth();
        this.range = model.getRange();
        this.palette = PaletteFactory.getPalette(model);
        initialX = initialX - (initialX % this.lineWidth);
        initialY = initialY - (initialY % this.lineWidth);
        const initialColor = this.palette.initialColor();
        this.frontier = [{ x: initialX, y: initialY, color: initialColor }];
        this.origin = { x: initialX, y: initialY };
        this.id = BaseDrawer.nextID++;
    }
    addElToCanvas(canvasContext, x, y, color) {
        canvasContext.fillStyle = "rgb(" + color.red + ", " + color.green + ", " + color.blue + ")";
        canvasContext.fillRect(x, y, this.lineWidth, this.lineWidth);
        this.grid[x][y] = this.id;
    }
    getDistance(a, b) {
        return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
    }
    nextColor(color) {
        return this.palette.nextColor(color);
    }
    randomizeOrder(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
}
BaseDrawer.nextID = 1;

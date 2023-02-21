import { BaseDrawer } from "./BaseDrawer.js";
export class LineDrawer extends BaseDrawer {
    nextStep(canvasContext) {
        let { x, y, color } = this.frontier.shift();
        if (!this.isSquareAvailable(x, y)) {
            return false;
        }
        this.addElToCanvas(canvasContext, x, y, color);
        const nextColor = this.nextColor(color);
        let adjOptions = [];
        adjOptions.push({ x: x, y: y - this.lineWidth, color: nextColor });
        adjOptions.push({ x: x, y: y + this.lineWidth, color: nextColor });
        adjOptions.push({ x: x + this.lineWidth, y: y, color: nextColor });
        adjOptions.push({ x: x - this.lineWidth, y: y, color: nextColor });
        let cleansedOptions = [];
        for (let option of adjOptions) {
            //if (option.x >= 0 && option.x < this.grid.length - this.lineWidth && option.y >= 0 && option.y < this.grid[0].length - this.lineWidth)
            if (!this.isSquareAvailable(option.x, option.y)) {
                continue;
            }
            cleansedOptions.push(option);
        }
        this.randomizeOrder(cleansedOptions);
        cleansedOptions.sort((a, b) => { return this.getDistance(b, this.origin) - this.getDistance(a, this.origin); });
        //cleansedOptions.sort((a, b) => {return this.getDistance(b, {x: this.grid.length , y: 0}) - this.getDistance(a, {x: this.grid.length, y: 0})});
        if (cleansedOptions.length == 0) {
            return false;
        }
        //const factor = this.spreadFactor * 1/cleansedOptions.length;
        const factor = this.spreadFactor;
        let remaining = 1;
        const probability = [];
        for (let i = 0; i < cleansedOptions.length; i++) {
            if (i == cleansedOptions.length - 1) {
                probability.push(remaining);
            }
            else {
                probability.push(factor * remaining);
                remaining *= (1 - factor);
            }
        }
        const r = Math.random();
        let sum = 0;
        // probability will be something like [.4, .3, .2, .1], and cleansed options is sorted furtherFromOrigin -> closerToOrigin, 
        // so we want a higher chance of choosing a point further from the origin
        for (let i = 0; i < cleansedOptions.length; i++) {
            sum += probability[i];
            if (r < sum) {
                const option = cleansedOptions[i];
                // only continue this frontier if we chose something that wouldn't send us off the edge of the canvas
                if (option.x >= 0 && option.x < this.grid.length - this.lineWidth && option.y >= 0 && option.y <= this.grid[0].length) {
                    this.frontier.push(option);
                    return true;
                }
                break;
            }
        }
        return false;
    }
    isSquareAvailable(x, y) {
        if (this.allowCollisions) {
            return true;
        }
        // else if (this.grid[x][y] > 0 && this.grid[x][y] !== this.id) // allowed to overlap with itself
        // {
        //     return false;
        // }
        if (this.grid[x][y] > 0) {
            return false;
        }
        return true;
    }
}

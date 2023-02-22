import { BaseDrawer } from "./BaseDrawer.js";
export class FloodDrawer extends BaseDrawer {
    nextStep(canvasContext) {
        let { x, y, color } = this.frontier.shift();
        //console.log(this.frontier.length);
        if (!this.isSquareAvailable(x, y)) {
            return this.frontier.length !== 0;
        }
        this.addElToCanvas(canvasContext, x, y, color);
        let nextColor = this.nextColor(color);
        this.grid[x][y] = this.id;
        let adjOptions = [];
        adjOptions.push({ x: x, y: y - this.lineWidth, color: nextColor });
        adjOptions.push({ x: x, y: y + this.lineWidth, color: nextColor });
        adjOptions.push({ x: x + this.lineWidth, y: y, color: nextColor });
        adjOptions.push({ x: x - this.lineWidth, y: y, color: nextColor });
        let cleansedOptions = [];
        for (let option of adjOptions) {
            if (!this.isSquareAvailable(option.x, option.y)) {
                continue;
            }
            if (this.getDistance(option, this.origin) > this.range) {
                continue;
            }
            cleansedOptions.push(option);
        }
        this.randomizeOrder(cleansedOptions);
        for (let i = 0; i < cleansedOptions.length; i++) {
            let option = cleansedOptions[i];
            if (this.isSquareAvailable(option.x, option.y)) {
                // higher spread factor means our new points will be placed near the front of the queue, producing long chains (ala dfs).  Low spread factor will give an effect more like bfs
                let max = Math.floor(Math.pow(Math.random(), this.spreadFactor * 10) * this.frontier.length);
                //console.log("max = " + max);
                let position = Math.floor(Math.random() * (max + 1));
                let start = performance.now();
                this.frontier.splice(position, 0, option);
                let end = performance.now();
                document.jgcTemp += (end - start);
            }
        }
        return this.frontier.length !== 0;
    }
    isSquareAvailable(x, y) {
        if (x < 0 || y < 0 || x >= this.grid.length || y >= this.grid[x].length) {
            return false;
        }
        if (!this.allowCollisions && this.grid[x][y] !== 0) {
            return false;
        }
        return true;
    }
}

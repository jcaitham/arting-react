import { DrawerFactory } from "./drawers/DrawerFactory.js";
export class aRtiNG {
    constructor(model, canvas) {
        this.disallowNewDrawer = false;
        this.drawsPerInterval = 100;
        this.canvas = canvas;
        canvas.addEventListener("mousedown", this.onCanvasClick.bind(this));
        canvas.addEventListener("mousemove", this.onCanvasMouseMove.bind(this));
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        this.canvasContext = canvas.getContext("2d", { alpha: false });
        this.model = model;
        this.drawers = [];
        this.clearGrid();
        this.drawInterval = setInterval(this.onTimer.bind(this), 0);
    }
    onTimer() {
        if (this.drawers.length > 0) {
            document.jgcTemp = 0;
            let numNewBlocksPerDrawer = this.drawsPerInterval / this.drawers.length;
            for (let i = 0; i < numNewBlocksPerDrawer; i++) {
                let drawerCount = this.drawers.length;
                while (drawerCount-- > 0) {
                    let cur = this.drawers.shift();
                    let success = cur.nextStep(this.canvasContext);
                    if (success) {
                        this.drawers.push(cur);
                    }
                }
            }
            console.log("splices took: " + document.jgcTemp);
        }
    }
    stop() {
        clearInterval(this.drawInterval);
        this.drawers = [];
    }
    onCanvasClick(event) {
        this.drawers.push(DrawerFactory.getDrawer(this.model, event.clientX, event.clientY));
        this.disallowNewDrawer = true;
        setTimeout(() => { this.disallowNewDrawer = false; }, 80);
    }
    onCanvasMouseMove(event) {
        if (event.buttons === 1 && this.disallowNewDrawer === false) {
            this.drawers.push(DrawerFactory.getDrawer(this.model, event.clientX, event.clientY));
            this.disallowNewDrawer = true;
            setTimeout(() => { this.disallowNewDrawer = false; }, 80);
        }
    }
    clearGrid() {
        this.canvas.innerHTML = "";
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawers = [];
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.canvasContext = this.canvas.getContext("2d");
    }
}

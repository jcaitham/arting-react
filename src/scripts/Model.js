export class Model {
    constructor(width, height) {
        this.lineWidth = 0;
        this.spreadFactor = 0; // [0, 1]
        this.spreadFactorMin = 0;
        this.spreadFactorMax = 1;
        this.range = 0; // [1, 1000]
        this.minRange = 1;
        this.maxRange = 1000;
        this.colorChangeRate = 0; //[0, 100]
        this.colorChangeMin = 0;
        this.colorChangeMax = 20;
        this.selectedDrawerType = "";
        this.selectedPalette = "";
        this.grid = [];
        this.width = width;
        this.height = height;
        for (let i = 0; i < width; i++) {
            this.grid[i] = [];
        }
        this.resetGrid();
        this.setDefaultValues();
    }
    setDefaultValues() {
        this.lineWidth = 5;
        this.spreadFactor = .5;
        this.range = 500;
        this.colorChangeRate = 20;
        this.selectedDrawerType = "flood";
        this.selectedPalette = "random";
    }
    resetModel(width, height) {
        this.width = width;
        this.height = height;
        this.resetGrid();
    }
    resetGrid() {
        for (let i = 0; i < this.width; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.height; j++) {
                this.grid[i][j] = 0;
            }
        }
    }
    setLineWidth(event) {
        this.lineWidth = Number(event.currentTarget.value);
    }
    setSpreadFactor(event) {
        const temp = Number(event.currentTarget.value) / 100;
        this.spreadFactor = temp * (this.spreadFactorMax - this.spreadFactorMin);
    }
    setColorChange(event) {
        const temp = Number(event.currentTarget.value) / 100;
        this.colorChangeRate = temp * (this.colorChangeMax - this.colorChangeMin);
    }
    setSelectedPalette(event) {
        this.selectedPalette = String(event.currentTarget.value);
    }
    setSelectedDrawer(event) {
        this.selectedDrawerType = String(event.currentTarget.value);
    }
    setRange(event) {
        this.range = Number(event.currentTarget.value);
    }
}

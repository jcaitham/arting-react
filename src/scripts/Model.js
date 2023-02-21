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
        this.spreadFactor = 50;
        this.range = 50;
        this.colorChangeRate = 50;
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
    getLineWidth() {
        return this.lineWidth;
    }
    getSpreadFactor() {
        return this.spreadFactor / 100 * (this.spreadFactorMax - this.spreadFactorMin);
    }
    getColorChange() {
        return this.colorChangeRate / 100 * (this.colorChangeMax - this.colorChangeMin);
    }
    getSelectedPalette() {
        return this.selectedPalette;
    }
    getSelectedDrawer() {
        return this.selectedDrawerType;
    }
    getRange() {
        return this.range / 100 * (this.maxRange - this.minRange);
    }
    getRangePercentage() {
        return this.range;
    }
    getColorChangePercentage() {
        return this.colorChangeRate;
    }
    getSpreadFactorPercentage() {
        return this.spreadFactor;
    }
    setLineWidth(val) {
        this.lineWidth = Number(val);
    }
    setSelectedPallette(val) {
        this.selectedPalette = val;
    }
    setColorChangePercentage(val) {
        this.colorChangeRate = Number(val);
    }
    setSelectedDrawer(val) {
        this.selectedDrawerType = val;
    }
    setRangePercentage(val) {
        this.range = Number(val);
    }
    setSpreadFactorPercentage(val) {
        this.spreadFactor = Number(val);
    }
}

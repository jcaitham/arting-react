import { BasePalette } from "./BasePalette.js";
export class DarkPalette extends BasePalette {
    constructor() {
        super();
        this.red = { min: 0, max: 150, delta: 0 };
        this.green = { min: 0, max: 150, delta: 0 };
        this.blue = { min: 0, max: 150, delta: 0 };
    }
}

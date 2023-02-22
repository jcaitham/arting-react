import { RandomPalette } from "./RandomPalette.js";
export class ForestPalette2 extends RandomPalette {
    constructor() {
        super();
        this.green.min = 80;
        this.green.max = 170;
        this.red.max = 100;
        this.blue.max = 50;
    }
}
;

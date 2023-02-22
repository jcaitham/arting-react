import { DarkPalette } from "./DarkPalette.js";
import { ForestPalette } from "./ForestPalette.js";
import { ForestPalette2 } from "./ForestPalette2.js";
import { OceanPalette } from "./OceanPalette.js";
import { RandomPalette } from "./RandomPalette.js";
import { SunsetPalette } from "./SunsetPalette.js";
export class PaletteFactory {
    static getPalette(model) {
        let palette;
        switch (model.getSelectedPalette()) {
            case "random":
                palette = new RandomPalette();
                break;
            case "dark":
                palette = new DarkPalette();
                break;
            case "forest":
                palette = new ForestPalette();
                break;
            case "forest2":
                palette = new ForestPalette2();
                break;
            case "sunset":
                palette = new SunsetPalette();
                break;
            case "ocean":
                palette = new OceanPalette();
                break;
            default:
                palette = new RandomPalette();
                break;
        }
        palette.initialize(model.getColorChange());
        return palette;
    }
}

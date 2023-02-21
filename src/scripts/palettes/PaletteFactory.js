import { DarkPalette } from "./DarkPalette.js";
import { ForestPalette } from "./ForestPalette.js";
import { RandomPalette } from "./RandomPalette.js";
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
            default:
                palette = new RandomPalette();
                break;
        }
        palette.initialize(model.getColorChange());
        return palette;
    }
}

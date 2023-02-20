import { Model } from "../Model.js";
import { BasePalette } from "./BasePalette.js";
import { DarkPalette } from "./DarkPalette.js";
import { ForestPalette } from "./ForestPalette.js";
import { RandomPalette } from "./RandomPalette.js";


export class PaletteFactory{

    public static getPalette(model: Model): BasePalette
    {
        let palette: BasePalette;
        switch(model.selectedPalette)
        {
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

        palette.initialize(model.colorChangeRate);
        return palette;
    }
}
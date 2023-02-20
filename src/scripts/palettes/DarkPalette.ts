import { IColor } from "../drawers/BaseDrawer.js";
import { BasePalette } from "./BasePalette.js";


export class DarkPalette extends BasePalette
{

    public constructor(){
        super();
        this.red = {min: 0, max: 150, delta: 0};
        this.green = {min: 0, max: 150, delta: 0};
        this.blue = {min: 0, max: 150, delta: 0};
    }
    
}
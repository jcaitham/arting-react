import { BaseDrawer } from "./BaseDrawer.js";
import { LineDrawer } from "./LineDrawer.js";
import { Model } from "../Model.js";
import { FloodDrawer } from "./FloodDrawer.js";


export class DrawerFactory
{
    public static getDrawer(model: Model, x: number, y: number): BaseDrawer{
        switch (model.selectedDrawerType)
        {
            case "line":
                return new LineDrawer(model, x, y);
            case "flood":
            default:
                return new FloodDrawer(model, x, y);

        }
    }
}
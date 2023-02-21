import { LineDrawer } from "./LineDrawer.js";
import { FloodDrawer } from "./FloodDrawer.js";
export class DrawerFactory {
    static getDrawer(model, x, y) {
        switch (model.getSelectedDrawer()) {
            case "line":
                return new LineDrawer(model, x, y);
            case "flood":
            default:
                return new FloodDrawer(model, x, y);
        }
    }
}

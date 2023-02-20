import { Model } from "../Model";
import { BasePalette } from "../palettes/BasePalette";
import { PaletteFactory } from "../palettes/PaletteFactory.js";


export abstract class BaseDrawer{
    protected frontier: IFrontierMember[];

    protected origin: {x: number, y: number};

    protected palette: BasePalette;

    protected allowCollisions: boolean = false;

    protected range: number = 0;

    protected static nextID = 1;
    protected id: number;

    protected model: Model;

    protected get grid(): number[][]
    {
        return this.model.grid;
    };

    // protected get lineWidth() : number{
    //     return this.model.lineWidth;
    // };

    protected lineWidth: number;

    protected get spreadFactor(): number
    {
        return this.model.spreadFactor;
    };


    constructor(model: Model, initialX: number, initialY: number)
    {
        this.model = model;
        this.lineWidth = model.lineWidth;
        this.range = model.range;
        this.palette = PaletteFactory.getPalette(model);
        initialX = initialX - (initialX % this.lineWidth);
        initialY = initialY - (initialY % this.lineWidth);
        const initialColor: IColor = this.palette.initialColor();
        this.frontier = [{x: initialX, y: initialY, color: initialColor}];
        this.origin = {x: initialX, y: initialY};
        this.id = BaseDrawer.nextID++;
    }

    public addElToCanvas(canvasContext: CanvasRenderingContext2D, x: number, y: number, color: IColor): void
    {
        canvasContext.fillStyle = "rgb(" + color.red + ", " + color.green + ", " + color.blue + ")";
        canvasContext.fillRect(x, y, this.lineWidth, this.lineWidth);

        this.grid[x][y] = this.id;
    }

    public abstract nextStep(canvasContext: CanvasRenderingContext2D): boolean;

    protected abstract isSquareAvailable(x: number, y: number): boolean;

    protected getDistance(a: {x: number, y: number}, b: {x: number, y: number}): number
    {
        return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
    }

    protected nextColor(color: IColor): IColor{
        return this.palette.nextColor(color);
    }

    protected randomizeOrder(array: any[]): void{
        for (let i = array.length - 1; i > 0; i--)
        {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;

        }
    }
}

export interface IFrontierMember
{
    x: number;
    y: number;
    color: IColor;
}

export interface IColor{
    red: number;
    green: number;
    blue: number;
    activeIdx: number;
}
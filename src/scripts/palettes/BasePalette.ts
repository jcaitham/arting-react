import { IColor } from "../drawers/BaseDrawer";


export abstract class BasePalette
{
    public red: PaletteColor;

    public green: PaletteColor;

    public blue: PaletteColor;

    public constructor()
    {
        this.red = {min: 0, max: 256, delta: 0};
        this.green = {min: 0, max: 256, delta: 0};
        this.blue = {min: 0, max: 256, delta: 0};        
    }

    public initialize(colorChangeRate: number): void
    {
        for (let c of [this.red, this.green, this.blue])
        {
            c.delta = (c.max - c.min) * (colorChangeRate / 100);
        }
    }

    public initialColor(): IColor
    {
        const red = Math.random() * (this.red.max - this.red.min) + this.red.min;
        const green = Math.random() * (this.green.max - this.green.min) + this.green.min;
        const blue = Math.random() * (this.blue.max - this.blue.min) + this.blue.min;
        return {red: red, green: green, blue: blue, activeIdx: Math.floor(Math.random() * 3) };
    }

    public nextColor(color: IColor): IColor
    {
        let result: IColor = {red: color.red, green: color.green, blue: color.blue, activeIdx: color.activeIdx};

        switch(color.activeIdx)
        {
            case 0:
                result.red = Math.min(this.red.max, result.red + this.red.delta);
                result.blue = Math.max(this.blue.min, result.blue - this.blue.delta);
                
                if (result.red === this.red.max || result.blue === this.blue.min)
                {
                    result.activeIdx = 1;
                }
                break;
            case 1:
                result.green = Math.min(this.green.max, result.green + this.green.delta);
                result.red = Math.max(this.red.min, result.red - this.red.delta);

                if (result.green === this.green.max || result.red === this.red.min)
                {
                    result.activeIdx = 2;
                }
                break;
            case 2:
                result.blue = Math.min(this.blue.max, result.blue + this.blue.delta);
                result.green = Math.max(this.green.min, color.green - this.green.delta);

                if (result.blue === this.blue.max || result.green === this.green.min)
                {
                    result.activeIdx = 0;
                }
                break;
        }

        return result;
    }
    
    protected getBlueRange(): number{
        return this.blue.max - this.blue.min;
    }

    protected getGreenRange(): number{
        return this.green.max - this.green.min;
    }

    protected getRedRange(): number{
        return this.red.max - this.red.min;
    }

    protected getRandomRedValue(): number
    {
        return Math.random() * this.getRedRange() + this.red.min;
    }

    protected getRandomGreenValue(): number
    {
        return Math.random() * this.getGreenRange() + this.green.min;
    }

    protected getRandomBlueValue(): number{
        return Math.random() * this.getBlueRange() + this.blue.min;
    }

    protected clampBlue(blue: number): number
    {
        return Math.min(this.blue.max, Math.max(0, blue));
    }

    protected clampRed(red: number): number
    {
        return Math.min(this.red.max, Math.max(0, red));
    }
    protected clampGreen(green: number): number
    {
        return Math.min(this.green.max, Math.max(0, green));
    }
}

export interface PaletteColor{
    min: number;
    max: number;
    delta: number;
}


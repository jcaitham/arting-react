import { BaseDrawer, IColor, IFrontierMember } from "./BaseDrawer.js";

export class FloodDrawer extends BaseDrawer
{
    public nextStep(canvasContext: CanvasRenderingContext2D): boolean {

        let {x, y, color} = this.frontier.shift() as IFrontierMember;
        //console.log(this.frontier.length);

        if (!this.isSquareAvailable(x, y))
        {
            return this.frontier.length !== 0;
        }

        this.addElToCanvas(canvasContext, x, y, color);
        
        let nextColor = this.nextColor(color);
        this.grid[x][y] = this.id;


        let adjOptions: IFrontierMember[] = [];
        adjOptions.push({x: x, y: y - this.lineWidth, color: nextColor});
        adjOptions.push({x: x, y: y + this.lineWidth, color: nextColor});
        adjOptions.push({x: x + this.lineWidth, y: y, color: nextColor});
        adjOptions.push({x: x - this.lineWidth, y: y, color: nextColor});

        let cleansedOptions: IFrontierMember[] = [];

        for (let option of adjOptions)
        {
            //if (option.x >= 0 && option.x < this.grid.length - this.lineWidth && option.y >= 0 && option.y < this.grid[0].length - this.lineWidth)
            if (!this.isSquareAvailable(option.x, option.y))
            {
                continue;
            }

            if (this.getDistance(option, this.origin) > this.range)
            {
                continue;
            }
            cleansedOptions.push(option);
        }

        //console.log("randomizing " + cleansedOptions.length + " options");
        this.randomizeOrder(cleansedOptions);

        //cleansedOptions.sort((a, b) => {return this.getDistance(b, this.origin) - this.getDistance(a, this.origin)});
        //cleansedOptions.sort((a, b) => {return this.getDistance(b, {x: this.grid.length , y: 0}) - this.getDistance(a, {x: this.grid.length, y: 0})});

        //const factor = this.spreadFactor * 1/cleansedOptions.length;
        const factor = this.spreadFactor;
        let remaining = 1;

        const probability = [];

        for (let i = 0; i < cleansedOptions.length; i++)
        {
            if (i == cleansedOptions.length - 1)
            {
                probability.push(remaining);
            }
            else
            {
                probability.push(factor * remaining);
                remaining *= (1-factor);
            }
        }


        const r = Math.random();
        let sum = 0;

        // probability will be something like [.4, .3, .2, .1], and cleansed options is sorted furtherFromOrigin -> closerToOrigin, 
        // so we want a higher chance of choosing a point further from the origin
        for (let i = 0; i < cleansedOptions.length; i++)
        {
            let option = cleansedOptions[i];
            if (this.isSquareAvailable(option.x, option.y))
            {
                let max = Math.floor(Math.pow(Math.random(), this.spreadFactor * 10) * this.frontier.length);
                //console.log("max = " + max);
                let position = Math.floor(Math.random() * (max+ 1));
                let start = performance.now();
                this.frontier.splice(position, 0, option);
                let end = performance.now();
                (document as any).jgcTemp += (end - start);
            }
            //this.frontier.push(cleansedOptions[i]);
            // sum += probability[i];
            // if (r < sum)
            // {
            //     const option = cleansedOptions[i];

            //     // only continue this frontier if we chose something that wouldn't send us off the edge of the canvas
            //     if (option.x >= 0 && option.x < this.grid.length - this.lineWidth && option.y >= 0 && option.y <= this.grid[0].length)
            //     {
            //         this.frontier.push(option);
            //     }
            // }
        }

        return this.frontier.length !== 0;

        
    }


    protected isSquareAvailable(x: number, y: number): boolean {

        if (x < 0 || y < 0 || x >= this.grid.length || y >= this.grid[x].length)
        {
            return false;
        }
        if (!this.allowCollisions && this.grid[x][y] !== 0)
        {
            return false;
        }
        return true;
    }
    
}
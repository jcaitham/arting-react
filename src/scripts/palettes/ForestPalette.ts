import { IColor } from "../drawers/BaseDrawer.js";
import { BasePalette } from "./BasePalette.js";


export class ForestPalette extends BasePalette
{

	private greenBias: number;

	private greenPortion: number;

	private totalBias: number;

	public constructor()
	{
		super();
		this.greenBias = 1.1;
		this.totalBias = .9;
		this.greenPortion = .5;
		this.red = { min: 0, max: 100, delta: 0 };
		this.green = { min: 50, max: 120, delta: 0 };
		this.blue = { min: 0, max: 20, delta: 0 };
	}

	public initialize(colorChangeRate: number): void
	{
		this.red.delta = colorChangeRate;
		this.green.delta = colorChangeRate;
		this.blue.delta = colorChangeRate * .5;
	}


	public initialColor(): IColor
	{
		let green = Math.random() * (this.green.max - this.green.min) + this.green.min;
		let red = Math.random() * green;
		let blue = Math.random() * this.blue.max;

		return { red: red, green: green, blue: blue, activeIdx: 1 };
	}


	// I think the issue is here is that we need to track the state for each cell, not for the palette as a whole, but then I'll need to redo the whole color generator system
	public nextColor(color: IColor): IColor
	{
		//return super.nextColor(color);
		// let bias = 1.2;

		let result = { red: color.red, green: color.green, blue: color.blue, activeIdx: color.activeIdx };

		// let greenDelta = Math.random() * this.green.delta * 2 * this.bias;
		// greenDelta -= this.green.delta;
		// result.green += greenDelta;

		// if (result.green > this.green.max)
		// {
		//     result.green = this.green.max;
		//     this.bias = .8;
		// }
		// if (result.green < this.green.min)
		// {
		//     result.green = this.green.min;
		//     this.bias = 1.2;
		// }

		// result.red = Math.random() * result.green;
		// result.blue = Math.random() * this.blue.max;


		// choose a random number near the current sum, but biased towards a direction
		let curTotal = color.red + color.green;
		let deltaTotal = Math.random() * 2 * this.green.delta * this.totalBias;  // weird to use the green delta here for both red and green combined
		deltaTotal -= this.green.delta;
		curTotal += deltaTotal;
		if (Math.random() < .01)
		{
			this.totalBias = 2 - this.totalBias;  // flip-flop between .8 and 1.2
		}

		result.green = this.greenPortion * curTotal;
		result.red = (1 - this.greenPortion) * curTotal;

		this.greenPortion += (Math.random() / 5 * this.greenBias) - .1;  // go up or down, but with a bias
		//console.log(this.greenPortion);

		// if (this.greenPortion >= 1 || this.greenPortion <= 0)// || Math.random() < .1)
		// {
		//     this.greenBias = 2 - this.greenBias;  // flip-flop between .8 and 1.2
		// }

		if (this.greenPortion >= 1 && this.greenBias > 1)
		{
			this.greenBias = 2 - this.greenBias;
		}
		else if (this.greenPortion <= .2 && this.greenBias < 1)
		{
			this.greenBias = 2 - this.greenBias;
		}

		result.blue += (Math.random() > .5 ? this.blue.delta : -this.blue.delta);


		result.green = this.clampGreen(result.green);
		result.blue = this.clampBlue(result.blue);
		result.red = this.clampRed(result.red);


		return result;
	}
}
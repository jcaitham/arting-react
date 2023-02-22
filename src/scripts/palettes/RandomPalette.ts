import { IColor } from "../drawers/BaseDrawer";
import { BasePalette } from "./BasePalette.js";


export class RandomPalette extends BasePalette
{
	private randomDeltaMultiplier: number = 1;
	private randomRedMultiplier: number = 1;
	private randomGreenMultiplier: number = 1;
	private randomBlueMultiplier: number = 1;

	public constructor()
	{
		super();
		this.red.min = 0;
		this.blue.min = 0;
		this.green.min = 0;
		this.randomDeltaMultiplier = this.newRandomMultiplier();
	}

	public initialize(colorChangeRate: number): void
	{
		for (let c of [this.red, this.green, this.blue])
		{
			c.delta = (c.max - c.min) * (colorChangeRate / 100);
			c.delta *= (Math.random() + .5);
		}
	}

	public initialColor(): IColor
	{
		const red = this.getRandomRedValue();
		const green = this.getRandomGreenValue();
		const blue = this.getRandomBlueValue();
		return { red: red, green: green, blue: blue, activeIdx: Math.floor(Math.random() * 3) };
	}

	public nextColor(color: IColor): IColor
	{
		let result: IColor = { red: color.red, green: color.green, blue: color.blue, activeIdx: color.activeIdx };

		if (Math.random() < .001)
		{
			this.randomDeltaMultiplier = this.newRandomMultiplier();
			console.log("NEW RANDOM MULTIPLIER = " + this.randomDeltaMultiplier);
		}

		if (Math.random() < .001)
		{
			this.randomBlueMultiplier *= -1;
		}

		if (Math.random() < .001)
		{
			this.randomGreenMultiplier *= -1;
		}

		if (Math.random() < .001)
		{
			this.randomRedMultiplier *= -1;
		}

		switch (color.activeIdx)
		{
			case 0:
				result.red = this.clampRed(result.red + this.red.delta * this.randomDeltaMultiplier * this.randomRedMultiplier);
				result.blue = this.clampBlue(result.blue - this.blue.delta * this.randomDeltaMultiplier * this.randomBlueMultiplier);

				if (result.red === this.red.max || result.red === this.red.min || result.blue === 0 || result.blue === this.blue.max)
				{
					result.activeIdx = 1;
				}
				break;
			case 1:
				result.green = this.clampGreen(result.green + this.green.delta * this.randomDeltaMultiplier * this.randomGreenMultiplier);
				result.red = this.clampRed(result.red - this.red.delta * this.randomDeltaMultiplier * this.randomRedMultiplier);

				if (result.green === this.green.max || result.green === this.green.min || result.red === 0 || result.red === this.red.max)
				{
					result.activeIdx = 2;
				}
				break;
			case 2:
				result.blue = this.clampBlue(result.blue + this.blue.delta * this.randomDeltaMultiplier * this.randomBlueMultiplier);
				result.green = this.clampGreen(result.green - this.green.delta * this.randomDeltaMultiplier * this.randomGreenMultiplier);

				if (result.blue === this.blue.max || result.blue === this.blue.min || result.green === 0 || result.green === this.green.max)
				{
					result.activeIdx = 0;
				}
				break;
		}

		console.log("red: " + result.red, " green: " + result.green + " blue: " + result.blue);
		return result;
	}

	private newRandomMultiplier(): number
	{
		if (Math.random() > .5)
		{
			return this.randomDeltaMultiplier * -1;
		}
		return this.randomDeltaMultiplier * -1;
	}
}

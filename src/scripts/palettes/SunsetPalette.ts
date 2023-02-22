import { RandomPalette } from "./RandomPalette.js";


export class SunsetPalette extends RandomPalette
{
	public constructor()
	{
		super();
		this.red.min = 200;

		this.blue.max = 150;
		this.green.max = 150;

	}
}
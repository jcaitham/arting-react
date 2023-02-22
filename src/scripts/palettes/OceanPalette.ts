import { RandomPalette } from "./RandomPalette.js";


export class OceanPalette extends RandomPalette
{

	public constructor()
	{
		super();
		this.blue.min = 120;
		this.blue.max = 200;
		this.green.max = 70;
		this.red.max = 30;
	}
}
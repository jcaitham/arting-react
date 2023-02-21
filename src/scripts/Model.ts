import { ChangeEvent, FormEvent } from "react";


export class Model
{
	private lineWidth: number = 0;

	private spreadFactor: number = 0; // [0, 1]
	private spreadFactorMin: number = 0;
	private spreadFactorMax: number = 1;

	private range: number = 0; // [1, 1000]
	private minRange: number = 1;
	private maxRange: number = 1000;

	private colorChangeRate: number = 0; //[0, 100]
	private colorChangeMin: number = 0;
	private colorChangeMax: number = 20;

	public grid: number[][];

	private selectedDrawerType: string = "";

	private selectedPalette: string = "";

	public width: number;
	public height: number;

	constructor(width: number, height: number)
	{
		this.grid = [];
		this.width = width;
		this.height = height;
		for (let i = 0; i < width; i++)
		{
			this.grid[i] = [];
		}
		this.resetGrid();

		this.setDefaultValues();
	}

	private setDefaultValues(): void
	{
		this.lineWidth = 5;
		this.spreadFactor = 50;
		this.range = 50;
		this.colorChangeRate = 50;
		this.selectedDrawerType = "flood";
		this.selectedPalette = "random";
	}

	public resetModel(width: number, height: number): void
	{
		this.width = width;
		this.height = height;
		this.resetGrid();
	}

	private resetGrid(): void
	{
		for (let i = 0; i < this.width; i++)
		{
			this.grid[i] = [];
			for (let j = 0; j < this.height; j++)
			{
				this.grid[i][j] = 0;
			}
		}
	}

	public getLineWidth(): number
	{
		return this.lineWidth;
	}

	public getSpreadFactor(): number
	{
		return this.spreadFactor / 100 * (this.spreadFactorMax - this.spreadFactorMin);
	}

	public getColorChange(): number
	{
		return this.colorChangeRate / 100 * (this.colorChangeMax - this.colorChangeMin);
	}

	public getSelectedPalette(): string
	{
		return this.selectedPalette;
	}

	public getSelectedDrawer(): string
	{
		return this.selectedDrawerType;
	}

	public getRange(): number
	{
		return this.range / 100 * (this.maxRange - this.minRange);
	}

	public getRangePercentage(): number
	{
		return this.range;
	}

	public getColorChangePercentage(): number
	{
		return this.colorChangeRate;
	}

	public getSpreadFactorPercentage(): number
	{
		return this.spreadFactor;
	}

	public setLineWidth(val: number | string): void
	{
		this.lineWidth = Number(val);
	}

	public setSelectedPallette(val: string): void
	{
		this.selectedPalette = val;
	}

	public setColorChangePercentage(val: number | string): void
	{
		this.colorChangeRate = Number(val);
	}

	public setSelectedDrawer(val: string): void
	{
		this.selectedDrawerType = val;
	}

	public setRangePercentage(val: number | string): void
	{
		this.range = Number(val);
	}

	public setSpreadFactorPercentage(val: number | string): void
	{
		this.spreadFactor = Number(val);
	}

	// public setLineWidth(event: FormEvent)
	// {
	// 	this.lineWidth = Number((event.currentTarget as HTMLInputElement).value);
	// }

	// public setSpreadFactor(event: Event)
	// {
	// 	const temp = Number((event.currentTarget as HTMLInputElement).value) / 100;
	// 	this.spreadFactor = temp * (this.spreadFactorMax - this.spreadFactorMin);
	// }

	// public setColorChange(event: FormEvent): void
	// {
	// 	const temp = Number((event.currentTarget as HTMLInputElement).value) / 100;
	// 	this.colorChangeRate = temp * (this.colorChangeMax - this.colorChangeMin);
	// }

	// public setSelectedPalette(event: ChangeEvent): void
	// {
	// 	this.selectedPalette = String((event.currentTarget as HTMLSelectElement).value);
	// }

	// public setSelectedDrawer(event: ChangeEvent): void
	// {
	// 	this.selectedDrawerType = String((event.currentTarget as HTMLSelectElement).value);
	// }

	// public setRange(event: FormEvent): void 
	// {
	// 	this.range = Number((event.currentTarget as HTMLInputElement).value);
	// }
}
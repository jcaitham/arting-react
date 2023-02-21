import { ChangeEvent, FormEvent } from "react";


export class Model
{
	public lineWidth: number = 0;

	public spreadFactor: number = 0; // [0, 1]
	private spreadFactorMin: number = 0;
	private spreadFactorMax: number = 1;

	public range: number = 0; // [1, 1000]
	public minRange: number = 1;
	public maxRange: number = 1000;

	public colorChangeRate: number = 0; //[0, 100]
	private colorChangeMin: number = 0;
	private colorChangeMax: number = 20;

	public grid: number[][];

	public selectedDrawerType: string = "";

	public selectedPalette: string = "";

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
		this.spreadFactor = .5;
		this.range = 500;
		this.colorChangeRate = 20;
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

	public setLineWidth(event: FormEvent)
	{
		this.lineWidth = Number((event.currentTarget as HTMLInputElement).value);
	}

	public setSpreadFactor(event: Event)
	{
		const temp = Number((event.currentTarget as HTMLInputElement).value) / 100;
		this.spreadFactor = temp * (this.spreadFactorMax - this.spreadFactorMin);
	}

	public setColorChange(event: FormEvent): void
	{
		const temp = Number((event.currentTarget as HTMLInputElement).value) / 100;
		this.colorChangeRate = temp * (this.colorChangeMax - this.colorChangeMin);
	}

	public setSelectedPalette(event: ChangeEvent): void
	{
		this.selectedPalette = String((event.currentTarget as HTMLSelectElement).value);
	}

	public setSelectedDrawer(event: ChangeEvent): void
	{
		this.selectedDrawerType = String((event.currentTarget as HTMLSelectElement).value);
	}

	public setRange(event: FormEvent): void 
	{
		this.range = Number((event.currentTarget as HTMLInputElement).value);
	}
}
import { BaseDrawer } from "./drawers/BaseDrawer.js";
import { DrawerFactory } from "./drawers/DrawerFactory.js";
import { Model } from "./Model.js";

export class aRtiNG
{

	private canvas: HTMLCanvasElement;
	private canvasContext: CanvasRenderingContext2D;

	private drawers: BaseDrawer[];

	private disallowNewDrawer: boolean = false;

	private model: Model;

	private drawsPerInterval: number = 100;

	constructor(model: Model, canvas: HTMLCanvasElement)
	{
		this.canvas = document.getElementById("backgroundCanvas") as HTMLCanvasElement;
		this.canvas.addEventListener("mousedown", this.onCanvasClick.bind(this));
		this.canvas.addEventListener("mousemove", this.onCanvasMouseMove.bind(this));

		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.canvasContext = this.canvas.getContext("2d", { alpha: false }) as CanvasRenderingContext2D;
		this.model = model;
		this.drawers = [];

		this.clearGrid();

		setInterval(this.onTimer.bind(this), 0);
	}

	private onTimer(): void
	{
		if (this.drawers.length > 0)
		{
			(document as any).jgcTemp = 0;
			let numNewBlocksPerDrawer = this.drawsPerInterval / this.drawers.length;
			for (let i = 0; i < numNewBlocksPerDrawer; i++)
			{
				let drawerCount = this.drawers.length;
				while (drawerCount-- > 0)
				{
					let cur = this.drawers.shift() as BaseDrawer;
					let success = cur.nextStep(this.canvasContext);
					if (success)
					{
						this.drawers.push(cur);
					}
				}
			}
			console.log("splices took: " + (document as any).jgcTemp);

		}
	}


	private onCanvasClick(event: MouseEvent): void
	{
		this.drawers.push(DrawerFactory.getDrawer(this.model, event.clientX, event.clientY));
		this.disallowNewDrawer = true;
		setTimeout(() => { this.disallowNewDrawer = false; }, 80);

	}

	private onCanvasMouseMove(event: MouseEvent): void
	{
		if (event.buttons === 1 && this.disallowNewDrawer === false)
		{
			this.drawers.push(DrawerFactory.getDrawer(this.model, event.clientX, event.clientY));
			this.disallowNewDrawer = true;
			setTimeout(() => { this.disallowNewDrawer = false; }, 80);
		}
	}


	public clearGrid(): void
	{
		this.canvas.innerHTML = "";
		this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.drawers = [];
		//this.canvas.width = window.innerWidth;
		//this.canvas.height = window.innerHeight;
		this.canvasContext = this.canvas.getContext("2d") as CanvasRenderingContext2D;
		//this.model.resetModel(this.canvas.width, this.canvas.height);
	}

}


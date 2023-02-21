import React from "react";
import { Model } from "./Model.js";
import "../styles/controlWidget.scss";


// export class ControlWidget
// {

// 	private drawerTypeButtons: Element[];

// 	private model: Model;


// 	constructor(el: HTMLElement, model: Model, clearGrid: () => void)
// 	{
// 		this.model = model;
// 		this.drawerTypeButtons = [];

// 		el.setAttribute("class", "controlWidget");

// 		const clearButton = document.getElementById("clearCanvasButton") as HTMLDivElement;
// 		clearButton.addEventListener("click", clearGrid);


// 		const sizeInput = document.getElementById("lineWidthInput") as HTMLInputElement;
// 		sizeInput.defaultValue = model.lineWidth + "";
// 		sizeInput.addEventListener("input", model.setLineWidth.bind(model));

// 		const spreadInput = document.getElementById("lineSpreadInput") as HTMLInputElement;
// 		spreadInput.defaultValue = "" + (Number(spreadInput.min) + Number(spreadInput.max)) / 2;
// 		spreadInput.addEventListener("input", model.setSpreadFactor.bind(model));

// 		const colorInput = document.getElementById("colorChangeInput") as HTMLInputElement;
// 		colorInput.defaultValue = "" + (Number(colorInput.min) + Number(colorInput.max)) / 2;
// 		colorInput.addEventListener("input", model.setColorChange.bind(model));

// 		const paletteOptions = document.getElementById("paletteOptions") as HTMLSelectElement;
// 		paletteOptions.addEventListener("change", model.setSelectedPalette.bind(model));


// 		const drawerOptions = document.getElementById("drawerTypeOptions") as HTMLSelectElement;
// 		drawerOptions.addEventListener("change", model.setSelectedDrawer.bind(model));

// 		const rangeInput = document.getElementById("rangeInput") as HTMLInputElement;
// 		rangeInput.max = "" + model.range;
// 		rangeInput.value = "" + model.range;
// 		rangeInput.addEventListener("change", model.setRange.bind(model));

// 	}
// }

export const ControlWidget = ({ model, clearGrid }: { model: Model, clearGrid: Function; }) =>
{

	return (
		<div className="controlWidget" id="controlWidget">

			<div className="widgetRow" >
				<div className="widgetLabel">
					Palette
				</div>
				<select id="paletteOptions" className="selectDropDown" onChange={(e) => model.setSelectedPalette(e)}>
					<option value="random"> Random </option>
					<option value="dark"> Dark </option>
					<option value="forest"> Forest </option>
				</select>
			</div>
			<div className="widgetRow" id="drawerTypeButtons" >
				<div className="widgetLabel">
					Type
				</div>
				<select id="drawerTypeOptions" className="selectDropDown" onChange={(e) => model.setSelectedDrawer(e)}>
					<option value="line">Line</option>
					<option value="flood">Flood</option>
				</select>
			</div>
			<div className="widgetRow">
				<div className="widgetLabel">
					Line Width
				</div>
				<input className="widgetInput" defaultValue={model.lineWidth} min="1" max="50" type="number" id="lineWidthInput" onInput={(e) => model.setLineWidth(e)} />
			</div>

			<div className="widgetRow">
				<div className="widgetLabel">
					Spread Factor
				</div>
				<input className="widgetInput" type="range" defaultValue={model.spreadFactor} min="0" max="100" id="lineSpreadInput" onInput={(e: any) => model.setSpreadFactor(e)} />
			</div>

			<div className="widgetRow">
				<div className="widgetLabel">
					Color Factor
				</div>
				<input className="widgetInput" type="range" defaultValue={model.colorChangeRate} min="0" max="100" id="colorChangeInput" onInput={(e) => model.setColorChange(e)} />
			</div>

			<div className="widgetRow">
				<div className="widgetLabel">
					Range
				</div>
				<input className="widgetInput" type="range" defaultValue={model.range} min="0" max="1000" id="rangeInput" onInput={(e) => model.setRange(e)} />
			</div>

			<div className="widgetRow">
				<div className="widgetButton" id="clearCanvasButton" onClick={() => clearGrid()}>Clear Canvas</div>
			</div>
		</div>
	);
};
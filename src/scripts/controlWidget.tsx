import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
	const [state, setState] = useState({
		palette: model.getSelectedPalette(),
		type: model.getSelectedDrawer(),
		lineWidth: model.getLineWidth(),
		spreadFactor: model.getSpreadFactorPercentage(),
		colorFactor: model.getColorChangePercentage(),
		range: model.getRangePercentage()
	});

	const updateModel = () =>
	{
		model.setColorChangePercentage(state.colorFactor);
		model.setLineWidth(state.lineWidth);
		model.setRangePercentage(state.range);
		model.setSpreadFactorPercentage(state.spreadFactor);
		model.setSelectedPallette(state.palette);
		model.setSelectedDrawer(state.type);
	};

	useEffect(() =>
	{
		updateModel();
	}, [state]);



	return (
		<div className="controlWidget" id="controlWidget">

			<div className="widgetRow" >
				<label className="widgetLabel" htmlFor="paletteOptions">
					Palette
				</label>
				<select id="paletteOptions" className="selectDropDown" value={state.palette} onChange={(e) => { setState({ ...state, palette: e.currentTarget.value }); }}>
					<option value="random"> Random </option>
					<option value="dark"> Dark </option>
					<option value="forest"> Forest </option>
					<option value="sunset"> Sunset </option>
					<option value="forest2"> Forest2 </option>
					<option value="ocean"> Ocean </option>
				</select>
			</div>
			<div className="widgetRow" id="drawerTypeButtons" >
				<label className="widgetLabel" htmlFor="drawerTypeOptions">
					Type
				</label>
				<select id="drawerTypeOptions" className="selectDropDown" value={state.type} onChange={(e) => { setState({ ...state, type: e.currentTarget.value }); }}>
					<option value="line">Line</option>
					<option value="flood">Flood</option>
				</select>
			</div>
			<div className="widgetRow">
				<label className="widgetLabel" htmlFor="lineWidthInput">
					Line Width
				</label>
				<input className="widgetInput" value={state.lineWidth} min="1" max="50" type="number" id="lineWidthInput" onInput={(e) => { setState({ ...state, lineWidth: Number(e.currentTarget.value) }); }} />
			</div>

			<div className="widgetRow">
				<label className="widgetLabel" htmlFor="lineSpreadInput">
					Spread Factor
				</label>
				<input className="widgetInput" type="range" value={state.spreadFactor} min="0" max="100" id="lineSpreadInput" onInput={(e) => { setState({ ...state, spreadFactor: Number(e.currentTarget.value) }); }} />
			</div>

			<div className="widgetRow">
				<label className="widgetLabel" htmlFor="colorChangeInput">
					Color Factor
				</label>
				<input className="widgetInput" type="range" value={state.colorFactor} min="0" max="100" id="colorChangeInput" onInput={(e) => { setState({ ...state, "colorFactor": Number(e.currentTarget.value) }); }} />
			</div>

			<div className="widgetRow">
				<label className="widgetLabel" htmlFor="rangeInput">
					Range
				</label>
				<input className="widgetInput" type="range" value={state.range} min="0" max="100" id="rangeInput" onInput={(e) => { setState({ ...state, "range": Number(e.currentTarget.value) }); }} />
			</div>

			<div className="widgetRow">
				<div className="widgetButton" id="clearCanvasButton" onClick={() => clearGrid()}>Clear Canvas</div>
			</div>
		</div>
	);
};
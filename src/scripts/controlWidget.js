import React from "react";
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
export const ControlWidget = ({ model, clearGrid }) => {
    return (React.createElement("div", { className: "controlWidget", id: "controlWidget" },
        React.createElement("div", { className: "widgetRow" },
            React.createElement("div", { className: "widgetLabel" }, "Palette"),
            React.createElement("select", { id: "paletteOptions", className: "selectDropDown", onChange: (e) => model.setSelectedPalette(e) },
                React.createElement("option", { value: "random" }, " Random "),
                React.createElement("option", { value: "dark" }, " Dark "),
                React.createElement("option", { value: "forest" }, " Forest "))),
        React.createElement("div", { className: "widgetRow", id: "drawerTypeButtons" },
            React.createElement("div", { className: "widgetLabel" }, "Type"),
            React.createElement("select", { id: "drawerTypeOptions", className: "selectDropDown", onChange: (e) => model.setSelectedDrawer(e) },
                React.createElement("option", { value: "line" }, "Line"),
                React.createElement("option", { value: "flood" }, "Flood"))),
        React.createElement("div", { className: "widgetRow" },
            React.createElement("div", { className: "widgetLabel" }, "Line Width"),
            React.createElement("input", { className: "widgetInput", defaultValue: model.lineWidth, min: "1", max: "50", type: "number", id: "lineWidthInput", onInput: (e) => model.setLineWidth(e) })),
        React.createElement("div", { className: "widgetRow" },
            React.createElement("div", { className: "widgetLabel" }, "Spread Factor"),
            React.createElement("input", { className: "widgetInput", type: "range", defaultValue: model.spreadFactor, min: "0", max: "100", id: "lineSpreadInput", onInput: (e) => model.setSpreadFactor(e) })),
        React.createElement("div", { className: "widgetRow" },
            React.createElement("div", { className: "widgetLabel" }, "Color Factor"),
            React.createElement("input", { className: "widgetInput", type: "range", defaultValue: model.colorChangeRate, min: "0", max: "100", id: "colorChangeInput", onInput: (e) => model.setColorChange(e) })),
        React.createElement("div", { className: "widgetRow" },
            React.createElement("div", { className: "widgetLabel" }, "Range"),
            React.createElement("input", { className: "widgetInput", type: "range", defaultValue: model.range, min: "0", max: "1000", id: "rangeInput", onInput: (e) => model.setRange(e) })),
        React.createElement("div", { className: "widgetRow" },
            React.createElement("div", { className: "widgetButton", id: "clearCanvasButton", onClick: () => clearGrid() }, "Clear Canvas"))));
};

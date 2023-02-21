import React, { useEffect, useState } from "react";
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
    const [state, setState] = useState({
        palette: model.getSelectedPalette(),
        type: model.getSelectedDrawer(),
        lineWidth: model.getLineWidth(),
        spreadFactor: model.getSpreadFactorPercentage(),
        colorFactor: model.getColorChangePercentage(),
        range: model.getRangePercentage()
    });
    const updateModel = () => {
        model.setColorChangePercentage(state.colorFactor);
        model.setLineWidth(state.lineWidth);
        model.setRangePercentage(state.range);
        model.setSpreadFactorPercentage(state.spreadFactor);
        model.setSelectedPallette(state.palette);
        model.setSelectedDrawer(state.type);
    };
    useEffect(() => {
        updateModel();
    }, [state]);
    return (React.createElement("div", { className: "controlWidget", id: "controlWidget" },
        React.createElement("div", { className: "widgetRow" },
            React.createElement("label", { className: "widgetLabel", htmlFor: "paletteOptions" }, "Palette"),
            React.createElement("select", { id: "paletteOptions", className: "selectDropDown", value: state.palette, onChange: (e) => { setState(Object.assign(Object.assign({}, state), { palette: e.currentTarget.value })); } },
                React.createElement("option", { value: "random" }, " Random "),
                React.createElement("option", { value: "dark" }, " Dark "),
                React.createElement("option", { value: "forest" }, " Forest "))),
        React.createElement("div", { className: "widgetRow", id: "drawerTypeButtons" },
            React.createElement("label", { className: "widgetLabel", htmlFor: "drawerTypeOptions" }, "Type"),
            React.createElement("select", { id: "drawerTypeOptions", className: "selectDropDown", value: state.type, onChange: (e) => { setState(Object.assign(Object.assign({}, state), { type: e.currentTarget.value })); } },
                React.createElement("option", { value: "line" }, "Line"),
                React.createElement("option", { value: "flood" }, "Flood"))),
        React.createElement("div", { className: "widgetRow" },
            React.createElement("label", { className: "widgetLabel", htmlFor: "lineWidthInput" }, "Line Width"),
            React.createElement("input", { className: "widgetInput", value: state.lineWidth, min: "1", max: "50", type: "number", id: "lineWidthInput", onInput: (e) => { setState(Object.assign(Object.assign({}, state), { lineWidth: Number(e.currentTarget.value) })); } })),
        React.createElement("div", { className: "widgetRow" },
            React.createElement("label", { className: "widgetLabel", htmlFor: "lineSpreadInput" }, "Spread Factor"),
            React.createElement("input", { className: "widgetInput", type: "range", value: state.spreadFactor, min: "0", max: "100", id: "lineSpreadInput", onInput: (e) => { setState(Object.assign(Object.assign({}, state), { spreadFactor: Number(e.currentTarget.value) })); } })),
        React.createElement("div", { className: "widgetRow" },
            React.createElement("label", { className: "widgetLabel", htmlFor: "colorChangeInput" }, "Color Factor"),
            React.createElement("input", { className: "widgetInput", type: "range", value: state.colorFactor, min: "0", max: "100", id: "colorChangeInput", onInput: (e) => { setState(Object.assign(Object.assign({}, state), { "colorFactor": Number(e.currentTarget.value) })); } })),
        React.createElement("div", { className: "widgetRow" },
            React.createElement("label", { className: "widgetLabel", htmlFor: "rangeInput" }, "Range"),
            React.createElement("input", { className: "widgetInput", type: "range", value: state.range, min: "0", max: "100", id: "rangeInput", onInput: (e) => { setState(Object.assign(Object.assign({}, state), { "range": Number(e.currentTarget.value) })); } })),
        React.createElement("div", { className: "widgetRow" },
            React.createElement("div", { className: "widgetButton", id: "clearCanvasButton", onClick: () => clearGrid() }, "Clear Canvas"))));
};

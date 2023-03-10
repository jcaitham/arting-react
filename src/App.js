import React, { useEffect, useRef } from 'react';
import { Model } from './scripts/Model.js';
import { aRtiNG } from './scripts/aRtiNG.js';
import { ControlWidget } from './scripts/controlWidget.js';
import "./styles/App.scss";
function App() {
    const canvasRef = useRef(null);
    const behaviorRef = useRef(null);
    const modelRef = useRef(new Model(0, 0));
    const resetEverything = () => {
        var _a, _b, _c;
        modelRef.current.resetModel(((_a = canvasRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth) || 0, ((_b = canvasRef.current) === null || _b === void 0 ? void 0 : _b.clientHeight) || 0);
        (_c = behaviorRef.current) === null || _c === void 0 ? void 0 : _c.clearGrid();
    };
    useEffect(() => {
        resetEverything();
        behaviorRef.current = new aRtiNG(modelRef.current, canvasRef.current);
        window.addEventListener("resize", () => resetEverything());
        // on unmount, we should clean up our resize handler, and also call stop() on the behavior, so that it can stop the timer interval and do other cleanup
        return () => { var _a; window.removeEventListener("resize", () => resetEverything()); (_a = behaviorRef.current) === null || _a === void 0 ? void 0 : _a.stop(); };
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("canvas", { id: "backgroundCanvas", className: "backgroundCanvas", ref: canvasRef }),
        React.createElement(ControlWidget, { model: modelRef.current, clearGrid: resetEverything })));
}
export default App;

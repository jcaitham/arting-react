import React, { useEffect, useRef } from 'react';
import { Model } from './scripts/Model.js';
import { aRtiNG } from './scripts/aRtiNG.js';
import { ControlWidget } from './scripts/controlWidget.js';
import "./styles/App.scss";

function App()
{

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const behaviorRef = useRef<aRtiNG | null>(null);
	const modelRef = useRef<Model>(new Model(0, 0));


	const resetEverything = () =>
	{
		modelRef.current.resetModel(canvasRef.current?.clientWidth || 0, canvasRef.current?.clientHeight || 0);
		behaviorRef.current?.clearGrid();
	};

	useEffect(() =>
	{
		resetEverything();
		behaviorRef.current = new aRtiNG(modelRef.current, canvasRef.current as HTMLCanvasElement);
		window.addEventListener("resize", () => resetEverything());

		// on unmount, we should clean up our resize handler, and also call stop() on the behavior, so that it can stop the timer interval and do other cleanup
		return () => { window.removeEventListener("resize", () => resetEverything()); behaviorRef.current?.stop(); };
	}, []);

	return (
		<>
			<canvas id="backgroundCanvas" className="backgroundCanvas" ref={canvasRef}></canvas>

			<ControlWidget model={modelRef.current} clearGrid={resetEverything} />
		</>
	);
}

export default App;

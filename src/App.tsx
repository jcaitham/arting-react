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

		return () => window.removeEventListener("resize", () => resetEverything());
	}, []);

	return (
		<>
			<canvas id="backgroundCanvas" className="backgroundCanvas" ref={canvasRef}></canvas>

			<ControlWidget model={modelRef.current} clearGrid={resetEverything} />
		</>
	);
}

export default App;

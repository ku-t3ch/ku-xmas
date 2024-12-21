"use client";
import { useEffect, useRef } from "react";
// import { categoriesType } from "./AvatarCreate";

const christmasTreePath = "/image/asset/christmas-tree.png";
// const keys: categoriesType[] = ["accessory", "face", "shoe"];
const accessoryPosition = {
	accessory: { x: 0, y: 0 },
	face: { x: 0, y: 150 },
	shoe: { x: 0, y: 10 },
};

interface props {
	accessory: string;
	face: string;
	shoe: string;
}

export default function RenderChristmasTree({
	avatarInfo,
	trigger,
}: {
	avatarInfo: props;
	trigger: boolean;
}) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const handleRedrawCanvas = async () => {
		if (canvasRef.current) {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext("2d");

			if (ctx) {
				// Adjust canvas resolution
				const devicePixelRatio = window.devicePixelRatio || 1;
				const width = 2480; // Tree image width
				const height = 3508; // Tree image height

				canvas.width = width * devicePixelRatio;
				canvas.height = height * devicePixelRatio;
				canvas.style.width = `${width / 10}px`; // Adjust for display size
				canvas.style.height = `${height / 10}px`;

				ctx.scale(devicePixelRatio, devicePixelRatio);

				// Clear the canvas
				ctx.clearRect(0, 0, canvas.width, canvas.height);

				await drawImage(ctx, christmasTreePath, 0, 0, width, height);

				const drawingOrder = [
					{
						src: avatarInfo.accessory,
						x: accessoryPosition.accessory.x,
						y: accessoryPosition.accessory.y,
						width: 2480,
						height: 3508,
					},
					{
						src: avatarInfo.face,
						x: accessoryPosition.face.x,
						y: accessoryPosition.face.y,
						width: 2480,
						height: 3508,
					},
					{
						src: avatarInfo.shoe,
						x: accessoryPosition.shoe.x,
						y: accessoryPosition.shoe.y,
						width: 2480,
						height: 3508,
					},
				];

				for (const { src, x, y, width, height } of drawingOrder) {
					if (src) {
						await drawImage(ctx, src, x, y, width, height);
					}
				}
			}
		}
	};

	const drawImage = (
		ctx: CanvasRenderingContext2D,
		src: string,
		x: number,
		y: number,
		width: number,
		height: number
	): Promise<void> => {
		return new Promise((resolve, reject) => {
			const img = new window.Image();
			img.src = src;
			img.onload = () => {
				ctx.drawImage(img, x, y, width, height);
				resolve();
			};
			img.onerror = () =>
				reject(new Error(`Failed to load image: ${src}`));
		});
	};

	useEffect(() => {
		handleRedrawCanvas();
	}, [trigger]);

	return (
		<div className="w-full flex justify-center">
			<canvas ref={canvasRef} className="rounded-lg" />
		</div>
	);
}

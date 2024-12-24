"use client";
import { useEffect, useRef } from "react";

const christmasTreePath = "/image/asset/christmas-tree.png";
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
  trigger?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleRedrawCanvas = async () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // ขนาดต้นคริสต์มาสต้นฉบับ
        const treeWidth = 2480;
        const treeHeight = 3508;

        // ใช้สเกลเพื่อปรับขนาด
        const scale = 0.2; // ลดขนาดลงเป็น 30%

        // ปรับขนาด canvas ให้เหมาะสมกับ devicePixelRatio
        const devicePixelRatio = window.devicePixelRatio || 1;
        const width = treeWidth * scale * devicePixelRatio;
        const height = treeHeight * scale * devicePixelRatio;

        // ปรับขนาด canvas
        canvas.width = width;
        canvas.height = height;

        // ปรับขนาดที่แสดงบนหน้าจอ
        // canvas.style.width = `${treeWidth * scale}px`;
        // canvas.style.height = `${treeHeight * scale}px`;

        // สเกล ctx ให้เหมาะสมกับการวาด
        ctx.scale(devicePixelRatio, devicePixelRatio);

        // เคลียร์ canvas ก่อนที่จะวาดใหม่
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // วาดต้นคริสต์มาส
        await drawImage(ctx, christmasTreePath, 0, 0, treeWidth * scale, treeHeight * scale);

        // วาดชิ้นส่วนต่างๆ
        const drawingOrder = [
          {
            src: avatarInfo.accessory,
            x: accessoryPosition.accessory.x * scale,
            y: accessoryPosition.accessory.y * scale,
            width: treeWidth * scale,
            height: treeHeight * scale,
          },
          {
            src: avatarInfo.face,
            x: accessoryPosition.face.x * scale,
            y: accessoryPosition.face.y * scale,
            width: treeWidth * scale,
            height: treeHeight * scale,
          },
          {
            src: avatarInfo.shoe,
            x: accessoryPosition.shoe.x * scale,
            y: accessoryPosition.shoe.y * scale,
            width: treeWidth * scale,
            height: treeHeight * scale,
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
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    });
  };

  useEffect(() => {
    handleRedrawCanvas();
  }, [trigger]);

  return (
    <div className="w-full flex justify-center">
      <canvas
        ref={canvasRef}
        className="w-full md:w-[405px] rounded-lg"
        style={{
          // maxWidth: "100%",  // กำหนดให้ canvas ไม่เกินขนาด container
          // maxHeight: "100%", // กำหนดให้ canvas ไม่เกินขนาด container
        }}
      />
    </div>
  );
}

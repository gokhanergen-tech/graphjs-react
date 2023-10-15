import { MutableRefObject } from "react";

/**
 * @description this function provides to clear canvas
 * @param ctx
 */
export const clearCanvas=(ctx:CanvasRenderingContext2D)=>{
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export const extractContextAndCanvasFromRef=(canvasRef:MutableRefObject<HTMLCanvasElement|null>)=>{
    return {canvas:canvasRef.current as HTMLCanvasElement,
        ctx:canvasRef.current?.getContext("2d") as CanvasRenderingContext2D}
}
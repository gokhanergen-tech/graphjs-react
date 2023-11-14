import { MutableRefObject } from "react";
import { Position } from "./mouseUtils";
import { RefPoints } from "../interfaces/line-chart-interfaces";

/**
 * @description this function provides to clear canvas
 * @param ctx
 */
export const clearCanvas = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export const extractContextAndCanvasFromRef = (canvasRef: MutableRefObject<HTMLCanvasElement | null>) => {
    return {
        canvas: canvasRef.current as HTMLCanvasElement,
        ctx: canvasRef.current?.getContext("2d") as CanvasRenderingContext2D
    }
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} xPosMove 
 * @param {number} yPosMove 
 * @param {number} toXPos 
 * @param {number} toYPos 
 */
export const drawGridLine = (
    ctx: CanvasRenderingContext2D,
    xPosMove: number,
    yPosMove: number,
    toXPos: number,
    toYPos: number) => {
    ctx.strokeStyle = 'lightgray'
    ctx.beginPath()
    ctx.moveTo(xPosMove, yPosMove)
    ctx.lineTo(
        toXPos,
        toYPos
    )
    ctx.stroke()
}

/**
 * 
 * @param paths This contains points info
 * @param point to control whether the point is in any path
 * @param context canvas context2d object
 * @returns {RefPoints}
 */
export const InFindValueIfInPath = (paths: RefPoints[], point: Position, context: CanvasRenderingContext2D) => {
    return paths.find((item) => {
        return context?.isPointInPath(
            item.path as Path2D,
            point.x,
            point.y
        )
    })?.item;
}


/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @description Utilized Utilized https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-using-html-canvas
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object 
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
export function roundRect(
    path:Path2D,
    x:number,
    y:number,
    width:number,
    height:number,
    radius:number|{tl:number,tr:number,br:number,bl:number} = 5
  ) {
    if (typeof radius === 'number') {
      radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
      radius = {...{tl: 0, tr: 0, br: 0, bl: 0}, ...radius};
    }
    path.moveTo(x + radius.tl, y);
    path.lineTo(x + width - radius.tr, y);
    path.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    path.lineTo(x + width, y + height - radius.br);
    path.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    path.lineTo(x + radius.bl, y + height);
    path.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    path.lineTo(x, y + radius.tl);
    path.quadraticCurveTo(x, y, x + radius.tl, y);
 
  }
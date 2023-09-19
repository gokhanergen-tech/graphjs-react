import { Position } from "./mouseUtils";

/**
 * 
 * @param ctx Canvas context
 * @param text 
 * @param position like {x:5, y:7}
 * @param color any color such as rgb and #000000
 * @param size text size
 * @param fontFamily You can specify any font text type
 */
export const writeText = (ctx: CanvasRenderingContext2D, text: string, position: Position,color="black", size = "12px", fontFamily = "Arial") => {
    ctx.font = size + " " + fontFamily;
    ctx.fillStyle=color;
    ctx.textBaseline="middle";
    ctx.fillText(text, position.x, position.y);
}

export function fittingString(c:CanvasRenderingContext2D, str:string, maxWidth:number) {
    var width = c.measureText(str).width;
    var ellipsis = '…';
    var ellipsisWidth = c.measureText(ellipsis).width;
    if (width<=maxWidth || width<=ellipsisWidth) {
      return str;
    } else {
      var len = str.length;
      while (width>=maxWidth-ellipsisWidth && len-->0) {
        str = str.substring(0, len);
        width = c.measureText(str).width;
      }
      return str+ellipsis;
    }
  }
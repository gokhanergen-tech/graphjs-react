import { clearCanvas } from "../utils/canvasUtils";

class BaseDrawer{
  clear(ctx:CanvasRenderingContext2D,bgColor:string){
    clearCanvas(ctx);
    ctx.fillStyle=bgColor||"white";
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
  }
}

export default BaseDrawer;
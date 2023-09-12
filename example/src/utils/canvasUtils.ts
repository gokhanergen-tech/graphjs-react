
/**
 * @description this function provides to clear canvas
 * @param ctx
 */
export const clearCanvas=(ctx:any)=>{
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
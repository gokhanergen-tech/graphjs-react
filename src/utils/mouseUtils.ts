
export interface Position{
  x:number,y:number
}
/**
 * @description you can calculate mouse canvas position for its events
 * @param canvas 
 * @param mouse 
 * @returns 
 */
export function D(canvas:HTMLCanvasElement, mouse:any):Position {
    var n = canvas.getBoundingClientRect();
    const scaleX = canvas.width / n.width;
    const scaleY = canvas.height / n.height;
    const clientX = mouse.clientX ? mouse.clientX : mouse?.touches?.item(0)?.clientX;
    const clientY = mouse.clientY ? mouse.clientY : mouse?.touches?.item(0)?.clientY;
    return {
      x: (clientX - n.left) * scaleX,
      y: (clientY - n.top) * scaleY
    };
}
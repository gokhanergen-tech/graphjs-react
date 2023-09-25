import { MutableRefObject, useEffect } from 'react'
import { D } from '../utils/mouseUtils';
import { extractContextAndCanvasFromRef } from '../utils/canvasUtils';

const useMouse = (canvasRef: MutableRefObject<HTMLCanvasElement>, onMouseMove?: Function, onMouseClick?: Function, onMouseLeave?: Function) => {

    
    // Mouse leave
    useEffect(() => {
        const {canvas,ctx}=extractContextAndCanvasFromRef(canvasRef);
        let mouseLeave = (_: MouseEvent) => {}
        if(onMouseLeave){
            canvas.removeEventListener("mousemove", mouseLeave);
            mouseLeave = (e: MouseEvent) => {
                onMouseLeave(e,ctx);
            }
            canvas.addEventListener("mouseleave", mouseLeave);
        }
        
        return () => {
            canvas.removeEventListener("mouseleave", mouseLeave);
        }
    }, [onMouseLeave])

    /*
       I used this for mouse events
    */
    useEffect(() => {
        const {canvas,ctx}=extractContextAndCanvasFromRef(canvasRef);
        
        let mouseMove=(_: MouseEvent)=>{};
        let mouseClick = (_: MouseEvent) => {}

        // This prevents to stay over true when the mouse leave out of canvas

        if(onMouseMove){
            canvas.removeEventListener("mousemove", mouseMove);
            mouseMove = async (e: MouseEvent) => {
                const positionMouse = D(canvas, e);
                onMouseMove(e, positionMouse,ctx);
            }
            canvas.addEventListener("mousemove", mouseMove);
        }
    

        if (onMouseClick) {
            canvas.removeEventListener("click", mouseClick);
            mouseClick = (e: MouseEvent) => {
                const positionMouse = D(canvas, e);
                onMouseClick(e, positionMouse,ctx);
            }
            canvas.addEventListener("click", mouseClick);
        }

        return () => {
            canvas.removeEventListener("mousemove", mouseMove);
            canvas.removeEventListener("click", mouseClick);
        }
    }, [onMouseMove,onMouseClick])
    return (
      []
  )
}

export default useMouse
import { MutableRefObject, useEffect } from 'react'
import { D } from '../utils/mouseUtils';
import { extractContextAndCanvasFromRef } from '../utils/canvasUtils';

const useMouse = (canvasRef: MutableRefObject<HTMLCanvasElement>, hasMouseClick: boolean, onMouseMove: Function, onMouseClick: Function, onMouseLeave: Function) => {

    
    // Mouse leave
    useEffect(() => {
        const {canvas,ctx}=extractContextAndCanvasFromRef(canvasRef);
        const mouseLeave = (e: MouseEvent) => {
            onMouseLeave(e,ctx);
        }
        canvas.addEventListener("mouseleave", mouseLeave);

        return () => {
            canvas.removeEventListener("mouseleave", mouseLeave);
        }
    }, [])

    /*
       I used this for mouse events
    */
    useEffect(() => {
        const {canvas,ctx}=extractContextAndCanvasFromRef(canvasRef);
        const mouseMove = async (e: MouseEvent) => {
            const positionMouse = D(canvas, e);
            onMouseMove(e, positionMouse,ctx);
        }

        const mouseClick = (e: MouseEvent) => {
            const positionMouse = D(canvas, e);
            onMouseClick(e, positionMouse,ctx);
        }

        // This prevents to stay over true when the mouse leave out of canvas

        canvas.removeEventListener("mousemove", mouseMove);
        canvas.addEventListener("mousemove", mouseMove);

        if (hasMouseClick) {
            canvas.removeEventListener("click", mouseClick);
            canvas.addEventListener("click", mouseClick);
        }

        return () => {
            canvas.removeEventListener("mousemove", mouseMove);
            canvas.removeEventListener("click", mouseClick);
        }
    }, [hasMouseClick])
    return (
      []
  )
}

export default useMouse
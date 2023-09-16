import React, { MutableRefObject, useRef } from 'react'

import styles from './canvas.module.css'

type CanvasProps = React.HTMLProps<HTMLCanvasElement>

const Canvas = React.forwardRef<HTMLCanvasElement,CanvasProps>((props:object,ref:any) => {
    const canvasRef:MutableRefObject<HTMLCanvasElement| undefined>=useRef();

    return (
     <canvas className={[styles.canvas].join(" ")} ref={(canvas:HTMLCanvasElement)=>{
        if(canvas){
         ref.current=canvas;
           canvasRef.current=canvas;
           ref.current=canvas;
        }
     }} {...props}>
        
     </canvas>
    )
});

export default React.memo(Canvas)
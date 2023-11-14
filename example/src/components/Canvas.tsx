import React, { MutableRefObject, useCallback, useEffect, useRef } from 'react'

import styles from './canvas.module.css'
import { CanvasCustomProps } from '../interfaces/graph-interface'
import { clearCanvas } from '../utils/canvasUtils';

const Canvas = React.forwardRef<HTMLCanvasElement, CanvasCustomProps>(
  ({ render,clearRef,sizeCanvas,setScaleValue,wheelScaling, ...props }: CanvasCustomProps, ref:any) => {
    const ctxRef: MutableRefObject<CanvasRenderingContext2D | null> = useRef(null);
    const scaleValueRef = useRef<number>(1)
    const title = props?.titlegraph;
    const firstRender=useRef(true);


    const clear = useCallback((transparancy: boolean) => {
      // Initially, clear the whole screen
      const ctx = ctxRef.current as CanvasRenderingContext2D;
      if(ctx){
        clearCanvas(ctx);
        if (!transparancy) {
          ctx.fillStyle = props.bgcolor || "white";
          ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
      }
    
    }, [props.bgcolor])

    useEffect(() => {
      const step = 0.1;
      const wheelEvent=(event:WheelEvent)=>{
        event.preventDefault()
        const dir = Math.sign(event.deltaY);
        const newScaledValue=scaleValueRef.current+dir*step;
        scaleValueRef.current = Math.max(0.75,Math.min(3,newScaledValue));
   
        setScaleValue&&setScaleValue(scaleValueRef.current)
      }

      if (!ctxRef.current && ref.current.getContext) {
        ctxRef.current = ref.current.getContext("2d");
  
        if(wheelScaling){
          ref.current.addEventListener("mousewheel",wheelEvent);
        }
      }

      return ()=>{
        ref.current.removeEventListener("mousewheel",wheelEvent)
      }
      
    }, [])

    useEffect(() => {
      clear(!props.bgcolor);
      render()
    }, [render])


    useEffect(() => {
      if(!firstRender.current){
        clear(!props.bgcolor);
        render(true);
      }else{
        firstRender.current=false;
        if(clearRef)
         clearRef.current=clear;
      }
    }, [clear])
    

    return (
      <div style={{
        maxWidth: sizeCanvas.width
      }}>
        {title?.label && (
          <h3
            style={{
              textAlign: 'center',
              margin: 0,
              color: 'gray',
              fontSize: '2rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              ...(title?.style || {})
            }}
            title={title.label}
          >
            {title.label}
          </h3>
        )}
        <canvas
          className={[styles.canvas].join(' ')}
          ref={(canvas: HTMLCanvasElement) => {
            if (canvas) {
              ref.current = canvas
            }
          }}
       
          {...props}
          style={{
            width:sizeCanvas?.width||0,
            height:sizeCanvas?.height||0,
            ...props.style
          }}
          title=''
        />
      </div>

    )
  }
)

export default React.memo(Canvas)

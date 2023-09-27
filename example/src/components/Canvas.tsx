import React, { MutableRefObject, useCallback, useEffect, useRef } from 'react'

import styles from './canvas.module.css'
import { CanvasCustomProps } from '../interfaces/graph-interface'
import { clearCanvas } from '../utils/canvasUtils';

const Canvas = React.forwardRef<HTMLCanvasElement, CanvasCustomProps>(
  ({ render,clearRef, ...props }: CanvasCustomProps, ref: any) => {
    const ctxRef: MutableRefObject<CanvasRenderingContext2D | null> = useRef(null);
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
      if (!ctxRef.current && ref.current.getContext) {
        ctxRef.current = ref.current.getContext("2d");
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
        maxWidth: props.width
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
          title=''
        />
      </div>

    )
  }
)

export default React.memo(Canvas)

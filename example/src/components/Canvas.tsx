import React, { useEffect, useLayoutEffect } from 'react'

import styles from './canvas.module.css'
import { CanvasCustomProps } from '../interfaces/graph-interface';

const Canvas = React.forwardRef<HTMLCanvasElement, CanvasCustomProps>((props: CanvasCustomProps, ref: any) => {
   return (
      <canvas className={[styles.canvas].join(" ")} ref={(canvas: HTMLCanvasElement) => {
         if (canvas) {
            ref.current = canvas;
         }
      }} {...props}>

      </canvas>
   )
});

export default Canvas
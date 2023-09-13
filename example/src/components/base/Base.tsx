import React, { MutableRefObject, useCallback, useEffect, useRef } from 'react'
import Canvas from '../Canvas';
import Plot from './Plot';

interface DataProps{
    x:number[],
    y:number[]
}

interface BaseProps{
    data:DataProps
}
const Base = ({data}:BaseProps) => {
  const canvasRef: MutableRefObject<any> = useRef();
  const plotRef=useRef(new Plot());

  const renderData=useCallback(()=>{
     const ctx=canvasRef.current.getContext("2d");

     if(ctx){
       ctx.clearRect(0,0,canvasRef.current.width,canvasRef.current.height)
       plotRef.current.drawAxises(ctx,{
        x:{
            max:200,
            increaseSize:50
        },
        y:{
            max:200,
            increaseSize:50
        }
       });
     }

  },[data])

  useEffect(()=>{
     renderData();
  },[renderData])

  return (
    <div>
      <Canvas width={500} height={500} ref={canvasRef}>
      </Canvas>
    </div>
  )
}

export default React.memo(Base)
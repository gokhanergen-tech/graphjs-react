import React, { MutableRefObject, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Canvas from '../Canvas'
import { sumOfArray } from '../../utils/mathUtils';
import styles from './pie.module.css'
import { D } from '../../utils/mouseUtils';
import { sleep } from '../../utils/promiseUtil';
import { clearCanvas } from '../../utils/canvasUtils';
interface ItemProps {
  value: number,
  name: string,
  backgroundColor: string
}

interface MouseEventData {
  root: ItemProps,
  name: string,
  angle: number,
  bgColor: string
}

interface PathData {
  path: Path2D,
  data: any,
  over: boolean,
  endAngle: number,
  startAngle: number,
  scale:number
}

interface PieProps {
  radius?: number,
  data: ItemProps[],
  scaled?: boolean,
  onMouseClickPiece?: (data: MouseEventData) => void
}


/**
 * @description It creates piece
 * @param ctx 
 * @param cx 
 * @param cy 
 * @param radius 
 * @param startAngle 
 * @param endAngle 
 * @param fillcolor 
 * @param scaled 
 * @returns void
 */
async function fillWedge(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, startAngle: number,
  endAngle: number,
  fillcolor: string,
  scaled: boolean,
  over: boolean,
  scale:number,
  initialLoadingRef:any): Promise<Path2D> {
    let path = new Path2D();
  
  if(!initialLoadingRef.current){
    for(let i=startAngle;i<=endAngle;i=i+0.20){
      await sleep(10);
      path = new Path2D();
      ctx.save();
      path.moveTo(cx, cy);
      ctx.shadowColor = fillcolor;
      ctx.shadowBlur = radius / 10;
      if (scaled) {
        ctx.translate(cx, cy);
        ctx.scale(scale,scale);
        ctx.translate(-cx, -cy);
      }
    
      if (over) {
        ctx.shadowColor = fillcolor;
        ctx.shadowBlur = radius / 4;
      }
      
      path.arc(cx, cy, radius, i, i+0.20>endAngle?endAngle:i+0.20);
      path.closePath();
      ctx.fillStyle = fillcolor;
      ctx.fill(path);
      ctx.restore();
    }
  }

  path = new Path2D();
  ctx.save();
  path.moveTo(cx, cy);
  ctx.shadowColor = fillcolor;
  ctx.shadowBlur = radius / 10;
  if (scaled) {
    ctx.translate(cx, cy);
    ctx.scale(scale,scale);
    ctx.translate(-cx, -cy);
  }

  if (over) {
    ctx.shadowColor = fillcolor;
    ctx.shadowBlur = radius / 4;
  }
  
  path.arc(cx, cy, radius, startAngle,endAngle);
  path.closePath();
  ctx.fillStyle = fillcolor;
  ctx.fill(path);
  ctx.restore();
 
  return path;
}



/**
 * radius @default 120
 * scaled @default false
 * data  It is array for data
 */
const Pie = ({ radius = 120, data, scaled = false, onMouseClickPiece=(item)=>{
   alert(item.name)
} }: PieProps) => {
  const canvasRef: MutableRefObject<any> = useRef();
  const pathsRef: MutableRefObject<PathData[] | undefined> = useRef(undefined);
  const [dataCopy, setDataCopy] = useState(data);
  const initialLoadingRef=useRef(false);


  const updateCanvasSizeWhenScaled = scaled ? 1.5 : 1;

  const renderData = useCallback(async (item: PathData | null | undefined) => {

    const ctx = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (ctx) {
      clearCanvas(ctx);
      const totalValue = sumOfArray(data.map(item => item.value));
      const withPercent = dataCopy.map(item => ({
        root: item,
        name: item.name,
        angle: (360 * item.value) / totalValue,
        bgColor: item.backgroundColor
      }))
      let prev = 0;

      const paths: PathData[] = []

      for (let i = 0; i < withPercent.length; i++) {
        const first = withPercent[i];
        const endAngle = ((first.angle) * (Math.PI / 180)) + prev;

        const over = item?.data?.name === first.name ? item.over : false;
        let scale = 1;
        if(scaled){
          const scaleValue = (endAngle - prev) / 1.5;
          scale=scaleValue < 1 ? 1 : (scaleValue > 1.3 ? 1.3 : scaleValue);
        }
        paths.push({
          path: await fillWedge(ctx, canvas.width / 2, canvas.height / 2, radius, prev, endAngle, first.bgColor, scaled, over,scale,initialLoadingRef),
          data: first,
          over,
          startAngle: prev,
          endAngle,
          scale
        });


        prev += (first.angle) * (Math.PI / 180);
      }

      if(!initialLoadingRef.current)
       initialLoadingRef.current=true;
      
   
      pathsRef.current = paths;
      

      for (let i = 0; i < withPercent.length; i++) {

        const first = withPercent[i];
        ctx.save();

        let textX = Math.round(((canvas.width / 2) + (radius / 1.75)));
        let textY = (canvas.height / 2);

        const angle = prev + (first.angle * (Math.PI / 180)) / 2;
        textX = textX - (canvas.width / 2) * 1
        textY = textY - (canvas.height / 2) * 1
        const a = Math.cos(-angle) * textX + Math.sin(-angle) * textY;
        const b = -Math.sin(-angle) * textX + Math.cos(-angle) * textY;
        const percent: number = (100 * (first.angle / 360));
        const fontSize=((radius / 10) * Math.round((100 / (100 - Math.round(percent)))));
        
        ctx.font =  (fontSize>=30?30:fontSize)+ "px Sans-serif";
        ctx.textBaseline = "middle"
        ctx.textAlign = "center"
        ctx.fillStyle = "white";

        ctx.fillText(percent.toFixed(2) + "%", (canvas.width / 2) + a, (canvas.height / 2) + b);

        ctx.restore();
        prev += first.angle * (Math.PI / 180);
      }
    }
  }, [radius, dataCopy])

  useLayoutEffect(() => {
    pathsRef.current=undefined;
    setDataCopy(data);
  }, [data])

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
    if(!!onMouseClickPiece){
      canvasRef.current.style.cursor = "pointer";
    }else{
      canvasRef.current.style.cursor = "default";
    }
    const mouseMove = async (e: MouseEvent) => {
      const positionMouse = D(canvasRef.current, e);

      if(pathsRef.current){
        for(let i=0;i<pathsRef.current.length;++i){
          const item=pathsRef.current[i];
          if (ctx.isPointInPath(item.path, positionMouse.x, positionMouse.y)) {
            if (!item.over) {
              item.over = true;
              await renderData(item);
              break;
            }
          }else{
            if(item.over=== true){
              item.over = false;
              await renderData(null);
              break;
            }
          }
        }
      }
    }

    const mouseClick = (e: MouseEvent) => {
      const positionMouse = D(canvasRef.current, e);
      pathsRef.current?.forEach(item => {
        if (ctx.isPointInPath(item.path, positionMouse.x, positionMouse.y)) {
          if (onMouseClickPiece)
            onMouseClickPiece(item.data);
        }
      })
    }

    canvasRef.current.removeEventListener("mousemove", mouseMove);
    canvasRef.current.addEventListener("mousemove", mouseMove);

    if (!!onMouseClickPiece) {
      canvasRef.current.removeEventListener("click", mouseClick);
      canvasRef.current.addEventListener("click", mouseClick);
    }

    return () => {
      canvasRef.current.removeEventListener("mousemove", mouseMove);
      canvasRef.current.removeEventListener("click", mouseClick);
    }
  }, [onMouseClickPiece])

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = radius * 2.5 * updateCanvasSizeWhenScaled;
      canvasRef.current.height = radius * 2.5 * updateCanvasSizeWhenScaled;
    }
  }, [radius, updateCanvasSizeWhenScaled])

  useEffect(() => {
    renderData(null);
  }, [renderData])

  return (
    <div className={[styles.wrapper].join(" ")}>
      <Canvas style={{
        minWidth: radius * 2.5 * updateCanvasSizeWhenScaled,
        minHeight: radius * 2.5 * updateCanvasSizeWhenScaled,
      }} ref={canvasRef}>
      </Canvas>
      <div>
        <ul className={
          styles.ul
        }>
          {
            dataCopy.map(item => <li className={styles.li} key={item.name}>
              <div style={{
                width: "10px",
                height: "10px",
                backgroundColor: item.backgroundColor
              }}></div>
              <span title={item.name} className={styles.name}>
                {
                  item.name
                }
              </span>
            </li>)
          }
        </ul>
      </div>
    </div>
  )
}

export default React.memo(Pie)
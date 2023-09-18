import React, { MutableRefObject, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Canvas from '../Canvas'
import { sigmoid, sumOfArray } from '../../utils/mathUtils';
import styles from './pie.module.css'
import { Position } from '../../utils/mouseUtils';
import { sleep } from '../../utils/promiseUtil';
import { clearCanvas } from '../../utils/canvasUtils';
import useMouse from '../../hooks/useMouse';
import { DoughNutPieProps, ItemProps, PathData, PieProps } from '../../interfaces/pie-interfaces';
import Legend from '../legend/Legend';
import { CommonProps } from '../../interfaces/graph-interface';



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
  scale: number,
  initialLoadingRef: any): Promise<Path2D> {
  let path = new Path2D();


  if (!initialLoadingRef.current) {
    for (let i = startAngle; i <= endAngle; i = i + 0.20) {
      await sleep(10);
      path = new Path2D();
      ctx.save();
      path.moveTo(cx, cy);
      const p = new Path2D();
      let transform = new DOMMatrix();
      if (scaled) {
        transform = transform.translate(cx, cy)
          .scale(scale).translate(-cx, -cy)
      }

      if (over) {
        ctx.shadowColor = fillcolor;
        ctx.shadowBlur = radius / 4;
      }

      path.arc(cx, cy, radius, i, i + 0.20 > endAngle ? endAngle : i + 0.20);
      path.closePath();
      ctx.fillStyle = fillcolor;
      p.addPath(path, transform);
      ctx.fill(p);
      ctx.restore();
    }
  }

  path = new Path2D();
  ctx.save();
  path.moveTo(cx, cy);
  ctx.shadowColor = fillcolor;
  ctx.shadowBlur = radius / 10;
  const p = new Path2D();
  let transform = new DOMMatrix();
  if (scaled) {
    transform = transform.translate(cx, cy)
      .scale(scale).translate(-cx, -cy)
  }

  path.arc(cx, cy, radius, startAngle, endAngle);
  path.closePath();
  ctx.fillStyle = fillcolor;
  
  if (over) {
    ctx.shadowColor = fillcolor;
    ctx.shadowBlur = radius / 4;
  }
  p.addPath(path, transform);
  ctx.fill(p);
  ctx.restore();

  return p;
}



/**
 * radius @default 120
 * scaled @default false
 * data  It is array for data
 */
const Pie = ({
  radius = 120,
  data,
  textToCenter = true,
  labels,
  scaled = false,
  legend = false,
  onMouseClickPiece,
  pieStyle,
  rootStyle,
  doughnut }: PieProps & CommonProps & DoughNutPieProps) => {
  const canvasRef: MutableRefObject<any> = useRef();
  const pathsRef: MutableRefObject<PathData[] | undefined> = useRef(undefined);
  const [dataCopy, setDataCopy] = useState(data);
  const initialLoadingRef = useRef(false);
  const settingsRef: MutableRefObject<{
    radius: number, textToCenter: boolean, scaled: boolean,doughnut:boolean, data: ItemProps[]
  }> = useRef({ radius, textToCenter, scaled, data,doughnut });




  const mouseMove = useCallback(async (_: MouseEvent, position: Position, ctx: CanvasRenderingContext2D) => {

    if (pathsRef.current) {
      for (let i = 0; i < pathsRef.current.length; ++i) {
        const item = pathsRef.current[i];
        if (ctx.isPointInPath(item.path, position.x, position.y)) {
          if (!item.over) {
            item.over = true;
            await renderData(item);
            canvasRef.current.style.cursor = "pointer";
            break;
          }
        } else {
          if (item.over === true) {
            item.over = false;
            await renderData(null);
            canvasRef.current.style.cursor = "default";
            break;
          }
        }
      }
    }
  }, [])

  const mouseClick = useCallback((_: MouseEvent, position: Position, ctx: CanvasRenderingContext2D) => {
    pathsRef.current?.forEach(item => {
      if (ctx.isPointInPath(item.path, position.x, position.y)) {
        if (onMouseClickPiece)
          onMouseClickPiece(item.data);
      }
    })
  }, [])

  // This prevents to stay over true when the mouse leave out of canvas
  const mouseLeave = useCallback(() => {
    if (!pathsRef.current?.every(item => {
      const beforeOverValue = item.over;
      item.over = false;
      return !beforeOverValue;
    }))
      renderData(null);
  }, [])

  useMouse(
    canvasRef,
    !!onMouseClickPiece,
    [],
    mouseMove,
    mouseClick,
    mouseLeave);



  const renderData = useCallback(async (item: PathData | null | undefined) => {

    // get context
    const ctx = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (ctx) {
      // Initially, clear the whole screen
      clearCanvas(ctx);

      // sum all value
      const totalValue = sumOfArray(settingsRef.current.data.map(item => item.value));

      // calculate angel according to 360 value
      const withPercent = settingsRef.current.data.map(item => ({
        root: item,
        name: item.name,
        angle: (360 * item.value) / totalValue,
        bgColor: item.backgroundColor,
        textColor: item.textColor
      }))
      let prev = 0;

      const paths: PathData[] = []

      const positionPie = {
        x: canvas.width / 2, y: canvas.height / 2
      }

      /*
        For every single pie piece, combine all peice with its calculated angle for PI number
      */
      for (let i = 0; i < withPercent.length; i++) {
        const first = withPercent[i];
        const endAngle = ((first.angle) * (Math.PI / 180)) + prev;

        const over = item?.data?.name === first.name ? item.over : false;

        const differenceWithStartEndAngle = sigmoid(endAngle - prev);
        // Draw and push for mouse event
        paths.push({
          path: await fillWedge(ctx, positionPie.x, positionPie.y, settingsRef.current.radius, prev, endAngle, first.bgColor, settingsRef.current.scaled, over, differenceWithStartEndAngle, initialLoadingRef),
          data: first,
          over,
          startAngle: prev,
          endAngle,
          scale: differenceWithStartEndAngle
        });


        prev += (first.angle) * (Math.PI / 180);
      }
      if (!initialLoadingRef.current)
        initialLoadingRef.current = true;

      pathsRef.current = paths;
      for (let i = 0; i < withPercent.length; i++) {

        const first = withPercent[i];
        const scaleValue = settingsRef.current.scaled ? sigmoid(((first.angle) * (Math.PI / 180))) : 1;
        ctx.save();

        let a = 0;
        let b = 0;
        const angle = prev + (first.angle * (Math.PI / 180)) / 2;
        if (settingsRef.current.data.length > 1) {
          let textX = Math.round(((positionPie.x) + (settingsRef.current.radius / (settingsRef.current.doughnut ? 1.4 : 1.75)) * scaleValue));
          let textY = (positionPie.y);


          textX = textX - (positionPie.x) * 1
          textY = textY - (positionPie.y) * 1
          a = Math.cos(-angle) * textX + Math.sin(-angle) * textY;
          b = -Math.sin(-angle) * textX + Math.cos(-angle) * textY;


        }

        const percent: number = (100 * (first.angle / 360));
        const fontSize = (settingsRef.current.radius / 10);

        const posX = (positionPie.x) + a;
        const posY = (positionPie.y) + b;
        ctx.font = (fontSize >= 30 ? 30 : fontSize) + "px Sans-serif";
        ctx.textBaseline = "middle"
        ctx.textAlign = "center"

        if (settingsRef.current.textToCenter) {
          const withoutPIAngle = angle * (180 / Math.PI);
          const remindDivided360 = withoutPIAngle % 360;
          const xYAngle = remindDivided360 >= 0 && remindDivided360 <= 90 ||
            remindDivided360 >= 270 && remindDivided360 <= 360 ? 0 : 180;
          ctx.setTransform(new DOMMatrix()
            .translate(posX, posY)
            .rotate(xYAngle, xYAngle, remindDivided360)
            .translate(-posX, -posY))
        }

        ctx.fillStyle = first.textColor || "white";

        ctx.fillText(percent.toFixed(2) + "%", posX, posY);

        ctx.restore();
        prev += first.angle * (Math.PI / 180);
      }

      if (settingsRef.current.doughnut) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(positionPie.x, positionPie.y, radius / 2, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.strokeStyle="lightblue";
        ctx.fill()
        ctx.stroke();
        ctx.restore();
      }
    }
  }, [radius, dataCopy, textToCenter, scaled, doughnut])

  /*
  If the data changes, run this
  */
  useLayoutEffect(() => {
    pathsRef.current = undefined;
    setDataCopy(data);
  }, [data])

  useEffect(() => {
    settingsRef.current = {
      radius, textToCenter, scaled:doughnut?false:scaled,doughnut, data
    }
  }, [radius, textToCenter, scaled, data,doughnut])

  /*
   If radius and updateCanvasSizeWhenScaled change, run this
  */
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = radius * 2.5;
      canvasRef.current.height = radius * 2.5;
    }
  }, [radius])

  useEffect(() => {
    renderData(null);
  }, [renderData])

  const legendItem = useMemo(() => labels || data.map(item => ({
    name: item.name,
    color: item.backgroundColor
  })), [data, labels])

  return (
    <div style={rootStyle} className={[styles.wrapper].join(" ")}>
      <Canvas style={{
        ...(pieStyle || {}),
        minWidth: radius * 2,
        minHeight: radius * 2,
      }} ref={canvasRef}>
      </Canvas>
      {
        legend && <Legend labels={legendItem}></Legend>
      }
    </div>
  )
}

export default React.memo(Pie)
import React, { MutableRefObject, useEffect, useRef } from 'react'
import Canvas from '../Canvas'
import { sumOfArray } from '../../utils/mathUtils';
import styles from './pie.module.css'
interface ItemProps {
  value: number,
  name: string,
  backgroundColor: string
}

interface PieProps {
  radius?: number,
  data: ItemProps[]
}

function fillWedge(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, startAngle: number, endAngle: number, fillcolor: string) {
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  const gradient=ctx.createLinearGradient(cx-radius,cy,cx+radius,cy);
  ctx.shadowColor = fillcolor;
  ctx.shadowBlur = 15;
  gradient.addColorStop(0,fillcolor);
  gradient.addColorStop(1,"purple");
  ctx.arc(cx, cy, radius, startAngle, endAngle);
  ctx.closePath();
  ctx.fillStyle = fillcolor;
  ctx.fill();
}

const Pie = ({ radius = 90, data }: PieProps) => {
  const canvasRef: MutableRefObject<any> = useRef();

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = radius * 2.5;
      canvasRef.current.height = radius * 2.5;
    }
  }, [])

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (ctx) {
      const totalValue = sumOfArray(data.map(item => item.value));
      const withPercent = data.map(item => ({
        name: item.name,
        angle: (360 * item.value) / totalValue ,
        bgColor: item.backgroundColor
      }))
      let prev = 0;

      for (let i = 0; i < withPercent.length; i++) {

        const first = withPercent[i];
        fillWedge(ctx, canvas.width / 2, canvas.height / 2, radius, prev, (first.angle*(Math.PI / 180)) + prev, first.bgColor);
        prev += first.angle*(Math.PI / 180);
      }

      for (let i = 0; i < withPercent.length; i++) {

        const first = withPercent[i];
        ctx.save();

        let textX=Math.round(((canvas.width / 2)+(radius/1.75)));
        let textY=(canvas.height / 2);
  
        const angle=prev+(first.angle*(Math.PI / 180))/2;
        textX=textX-(canvas.width / 2)*1
        textY=textY-(canvas.height / 2)*1
        const a=Math.cos(-angle)*textX+Math.sin(-angle)*textY;
        const b=-Math.sin(-angle)*textX+Math.cos(-angle)*textY;
      
        ctx.font = "15px Arial";
        ctx.textBaseline="middle"
        ctx.textAlign="center"
        ctx.fillStyle="white";
        
        ctx.fillText(Math.round((100*(first.angle/360)))+"%", (canvas.width / 2)+a, (canvas.height / 2)+b);
    
        ctx.restore();
        prev += first.angle*(Math.PI / 180);
      }
    }
  }, [radius, data])

  return (
    <div className={[styles.wrapper].join(" ")}>
      <Canvas style={{
        minWidth: radius * 2.5,
        minHeight: radius * 2.5,
      }} ref={canvasRef}>
      </Canvas>
      <div>
        <ul className={
          styles.ul
        }>
          {
            data.map(item => <li className={styles.li} key={item.name}>
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
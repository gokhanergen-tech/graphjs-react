import React, { MutableRefObject, useRef } from 'react'
import BarChartInterface, { BarChartColumn } from './BarChartInterface'
import { Color } from '../../classes/Color'
import { CommonProps } from '../../interfaces/graph-interface'
import ChartXY from '../chart-xy/ChartXY'
import { ContextChartXY } from '../../interfaces/chart-xy-interfaces'

const BarChart: React.FC<BarChartInterface & CommonProps> = ({ width = 500, labels, legend = true, height = 1200, canvasStyle, labelStyle, roundValue, containerStyle, values, range = null }) => {
  const canvasReference:MutableRefObject<any> = useRef(null);
  const contextRef:MutableRefObject<ContextChartXY>=useRef({
    maxItemWidth:0,
    context:null
  });
  
  const createColumn = function (item: BarChartColumn, index: number,MARGIN:number,COMPABILITY:number,CHART_HEIGHT:number,maxValue:number): void {
    const object = contextRef.current;

    let gradient = null;
    if (object&&object.context) {
      const maxWidth = object.maxItemWidth
      const context=object.context;

      
      const itemStartX = MARGIN + 10 + index * (maxWidth + 5)
      const itemStartY = COMPABILITY
      
      const itemEndX = maxWidth
      const itemEndY = -(item.value * CHART_HEIGHT) / maxValue
      console.log(itemStartX,itemStartY,itemEndX,itemEndY,index)
      // Create gradient
      const color = new Color();
      color.defineRGBColor(item.color);
      color.lighter(20);

      gradient = context.createLinearGradient(itemStartX + maxWidth / 2, itemStartY, itemStartX + maxWidth / 2, itemStartY + itemEndY);
      gradient.addColorStop(0, item.color);
      gradient.addColorStop(1, color.get());

      context.fillStyle = gradient
      if (roundValue) {
        context.beginPath();
        context.roundRect(itemStartX, itemStartY, itemEndX, itemEndY, [0, 0, roundValue, roundValue])
        context.fill()
      }
      else {
        context.fillRect(itemStartX, itemStartY, itemEndX, itemEndY)
      }
    }
  }

  return <ChartXY
      width={width}
      legend={legend}
      labels={labels}
      height={height}
      canvasStyle={canvasStyle}
      labelStyle={labelStyle}
      roundValue={roundValue}
      values={values}
      range={range}
      canvasReference={canvasReference}
      contextRef={contextRef}
      callbackForEveryItem={createColumn}
    ></ChartXY>
}

export default React.memo(BarChart)

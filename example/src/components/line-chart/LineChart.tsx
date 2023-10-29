import React, { MutableRefObject, useRef } from 'react'
import ChartXY, { ChartColumn, ChartInterfaceProps } from '../chart-xy/ChartXY'
import { CommonProps } from '../../interfaces/graph-interface'
import { ContextChartXY } from '../../interfaces/chart-xy-interfaces'
import FlexWrapper from '../common/FlexWrapper'
import { Color } from '../../classes/Color'
import { Position } from '../../utils/mouseUtils'
import { LineChartProps } from '../../interfaces/line-chart-interfaces'

const LineChart: React.FC<ChartInterfaceProps & CommonProps & LineChartProps> = ({
  width = 500,
  titles,
  grid = true,
  rootStyle,
  labels,
  legend = true,
  height = 1200,
  graphStyle,
  labelStyle,
  roundValue,
  data,
  range = null,
  title,
  backgroundColor,
  xAxisLabels,
  curved
}) => {
  const canvasReference = useRef<HTMLCanvasElement>(null)
  const contextRef: MutableRefObject<ContextChartXY> = useRef({
    maxItemWidth: 0,
    context: null
  })

  const beforeRef = useRef<Position | null>(null);

  const createColumn = function (
    item: ChartColumn,
    index: number,
    COMPABILITY: number,
    minValue: number,
    maxValue: number,
    originYPOS: number,
    MARGIN: number,
    minValueX = 0,
    maxValueX = 0,
    absoluteWidth = 0
  ): void {
    const object = contextRef.current

    if (object && object.context) {
      const maxWidth = object.maxItemWidth
      const context = object.context

      let itemStartX = MARGIN + 10 + index * maxWidth
      const itemStartY = originYPOS

      const itemEndY =
        -(
          (item.y as any) *
          (Number(item.y) > 0 ? originYPOS - 10 : COMPABILITY - originYPOS)
        ) / Math.abs(Number(item.y) > 0 ? maxValue : minValue)


      const marginBar = maxWidth / 5

      if (!xAxisLabels?.length) {
        itemStartX = MARGIN;
        itemStartX = itemStartX + (absoluteWidth) * (item.x as number) / (maxValueX || 1)
      } else {
        itemStartX = itemStartX + (maxWidth - marginBar) / 2
      }

      const currentPosition = {
        x: itemStartX,
        y: (itemStartY + itemEndY) || originYPOS
      }

      // If curved, apply bezier otherwise line
      if (curved) {
        if (!beforeRef.current || index === 0) {
          context.moveTo(currentPosition.x, currentPosition.y)
          beforeRef.current = {
            x: currentPosition.x,
            y: currentPosition.y
          }
        }else{
          const beforePosition = beforeRef.current as Position;


          context.bezierCurveTo(
            beforePosition.x,
            beforePosition.y,
            (currentPosition.x + beforePosition.x) / 2,
            (currentPosition.y + beforePosition.y) / 2,
            currentPosition.x,
            currentPosition.y
          )
  
          beforePosition.x = currentPosition.x;
          beforePosition.y = currentPosition.y;
        }
      } else {
        context.lineTo(
          currentPosition.x,
          currentPosition.y
        )
      }

      if (xAxisLabels?.length) {
        // Draw points
        context.save();
        const path = new Path2D();
        context.fillStyle = item.color;
        path.arc(currentPosition.x, currentPosition.y, 4, 0, Math.PI * 2);
        context.fill(path);
        context.restore();
      }


    }
  }
  return (
    <FlexWrapper rootStyle={rootStyle}>
      <ChartXY
        title={title}
        width={width}
        legend={legend}
        labels={labels}
        height={height}
        graphStyle={graphStyle}
        labelStyle={labelStyle}
        roundValue={roundValue}
        data={data}
        range={range}
        canvasReference={canvasReference}
        contextRef={contextRef}
        callbackForEveryItem={createColumn}
        grid={grid}
        titles={titles || null}
        backgroundColor={backgroundColor}
        xAxisLabels={xAxisLabels}
      />
    </FlexWrapper>
  )
}

export default React.memo(LineChart)
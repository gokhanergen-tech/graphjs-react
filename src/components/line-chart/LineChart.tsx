import React, { MutableRefObject, useCallback, useRef } from 'react'
import ChartXY, { ChartColumn, ChartInterfaceProps } from '../chart-xy/ChartXY'
import { CommonProps, LegendItemProps } from '../../interfaces/graph-interface'
import { ContextChartXY, OriginInterface } from '../../interfaces/chart-xy-interfaces'
import FlexWrapper from '../common/FlexWrapper'
import { Position } from '../../utils/mouseUtils'
import {  LineChartProps, RefPoints } from '../../interfaces/line-chart-interfaces'
import { generateColor } from '../../utils'
import useMouse from '../../hooks/useMouse'
import { InFindValueIfInPath } from '../../utils/canvasUtils'

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
  wheelScaling,
  onPointClick,
  onPointOver
}) => {
  const canvasReference = useRef<HTMLCanvasElement>(null)
  const contextRef: MutableRefObject<ContextChartXY> = useRef({
    maxItemWidth: 0,
    context: null
  })

  const beforeRef = useRef<Position | null>(null);
  const pointsRef = useRef<RefPoints[]>([])

  const onMouseClick = useCallback(
    (
      e: MouseEvent,
      positionMouse: Position
    ) => {
      const data = InFindValueIfInPath(pointsRef.current, positionMouse, contextRef.current.context as CanvasRenderingContext2D);
      if (data) {
        onPointClick && onPointClick(e, data)
      }
    },
    [onPointClick]
  )

  const onMouseOver = useCallback((
    e: MouseEvent, 
    positionMouse: Position
    ) => {
    const data = InFindValueIfInPath(pointsRef.current, positionMouse, contextRef.current.context as CanvasRenderingContext2D);
    if (data) {
      onPointOver && onPointOver(e, data)
    }
  }, [onPointOver])



  useMouse(
    canvasReference,
    onMouseOver,
    onMouseClick
  )

  const createColumn = function (
    item: ChartColumn,
    index: number,
    COMPABILITY: number,
    minValue: number,
    maxValue: number,
    { originYPOS = 0, originXPOS = 0 }: OriginInterface = {},
    MARGIN: number,
    minValueX = 0,
    maxValueX = 0,
    absoluteWidth = 0,
    legendItem: LegendItemProps
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
        itemStartX = originXPOS;

        itemStartX = itemStartX + (absoluteWidth) * (item.x as number) / (maxValueX || 1)

      } else {
        itemStartX = itemStartX + (maxWidth - marginBar) / 2
      }


      const currentPosition = {
        x: itemStartX,
        y: (itemStartY + itemEndY) || originYPOS
      }

    
      context.lineTo(
        currentPosition.x,
        currentPosition.y
      )

      if (xAxisLabels?.length) {
        // Draw points
        context.save();
        const path = new Path2D();
        context.fillStyle = item?.color || generateColor();
        path.arc(currentPosition.x, currentPosition.y, 4, 0, Math.PI * 2);
        context.fill(path);
        context.restore();
        pointsRef.current.push({
          item: {
            root: legendItem,
            ...item
          },
          path
        })
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
        wheelScaling={wheelScaling}
      />
    </FlexWrapper>
  )
}

export default React.memo(LineChart)
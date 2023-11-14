import React, {
  MutableRefObject,
  useCallback,
  useLayoutEffect,
  useRef
} from 'react'
import BarChartInterface from './BarChartInterface'
import { Color } from '../../classes/Color'
import { CommonProps } from '../../interfaces/graph-interface'
import ChartXY, { ChartColumn, ChartInterfaceProps } from '../chart-xy/ChartXY'
import { ContextChartXY, OriginInterface } from '../../interfaces/chart-xy-interfaces'
import FlexWrapper from '../common/FlexWrapper'
import useMouse from '../../hooks/useMouse'
import { Position } from '../../utils/mouseUtils'
import { generateColor } from '../../utils'
import { roundRect } from '../../utils/canvasUtils'

let mouseOver = false
const BarChart: React.FC<ChartInterfaceProps & CommonProps & BarChartInterface> = ({
  width = 500,
  titles,
  onBarClick,
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
  wheelScaling
}) => {
  const canvasReference = useRef<HTMLCanvasElement>(null)
  const contextRef: MutableRefObject<ContextChartXY> = useRef({
    maxItemWidth: 0,
    context: null
  })
  const barsRef: MutableRefObject<any> = useRef({})

  const onMouseClick = useCallback(
    (e: MouseEvent, positionMouse: Position) => {
      Object.values(barsRef.current).forEach((item) => {
        const data = item as { path: Path2D; item: ChartColumn }
        if (
          contextRef.current.context?.isPointInPath(
            data.path as Path2D,
            positionMouse.x,
            positionMouse.y
          )
        ) {
          onBarClick && onBarClick(e, data.item)
        }
      })
    },
    [onBarClick]
  )

  const onMouseOver = useCallback(() => {
    if (!mouseOver && canvasReference.current) {
      mouseOver = true
      canvasReference.current.style.cursor = 'pointer'
    }
  }, [])

  const onMouseLeave = useCallback(() => {
    if (mouseOver && canvasReference.current) {
      mouseOver = false
      canvasReference.current.style.cursor = 'default'
    }
  }, [])

  useMouse(
    canvasReference,
    onMouseOver,
    !!onBarClick ? onMouseClick : onBarClick,
    onMouseLeave
  )

  const createColumn = function (
    item: ChartColumn,
    index: number,
    COMPABILITY: number,
    minValue: number,
    maxValue: number,
    { originYPOS = 0 }: OriginInterface,
    MARGIN: number
  ): void {
    const object = contextRef.current

    let gradient
    if (object && object.context) {
      const maxWidth = object.maxItemWidth
      const context = object.context

      const itemStartX = MARGIN + 10 + index * maxWidth
      const itemStartY = originYPOS

      const itemEndX = maxWidth
      const itemEndY =
        -(
          (item.y as any) *
          (Number(item.y) > 0 ? originYPOS - 10 : COMPABILITY - originYPOS)
        ) / Math.abs(Number(item.y) > 0 ? maxValue : minValue)

      // Create gradient
      const color = new Color()
      color.defineRGBColor(item?.color || generateColor())
      color.lighter(20)

      gradient = context.createLinearGradient(
        itemStartX + maxWidth / 2,
        itemStartY,
        itemStartX + maxWidth / 2,
        itemStartY + itemEndY
      )
      gradient.addColorStop(0, item?.color || generateColor())
      gradient.addColorStop(1, color.get())

      context.fillStyle = gradient
      const marginBar = maxWidth / 5
      const path: Path2D = new Path2D()
      if (roundValue) {
        const isTop = (item.y as number) > 0;
        const sign =  (item.y as number)>0?-1:1;
        roundRect(path, itemStartX, itemStartY+(isTop?itemEndY:0), (itemEndX - marginBar),  sign*(itemEndY),
          {
            tr: isTop?roundValue:0,
            tl: isTop?roundValue:0,
            br: !isTop?roundValue:0,
            bl: !isTop?roundValue:0
          })
      } else {
        path.rect(itemStartX, itemStartY, itemEndX - marginBar, itemEndY)
      }
      context.fill(path)
      barsRef.current[item.y] = {
        path,
        item
      }
    }
  }

  useLayoutEffect(() => {
    barsRef.current = {}
  }, [data])

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

export default React.memo(BarChart)

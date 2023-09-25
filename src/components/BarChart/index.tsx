import React, {
  MutableRefObject,
  useCallback,
  useLayoutEffect,
  useRef
} from 'react'
import BarChartInterface, { BarChartColumn } from './BarChartInterface'
import { Color } from '../../classes/Color'
import { CommonProps } from '../../interfaces/graph-interface'
import ChartXY from '../chart-xy/ChartXY'
import { ContextChartXY } from '../../interfaces/chart-xy-interfaces'
import FlexWrapper from '../common/FlexWrapper'
import useMouse from '../../hooks/useMouse'
import { Position } from '../../utils/mouseUtils'

let mouseOver = false
const BarChart: React.FC<BarChartInterface & CommonProps> = ({
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
  values,
  range = null
}) => {
  const canvasReference: MutableRefObject<any> = useRef(null)
  const contextRef: MutableRefObject<ContextChartXY> = useRef({
    maxItemWidth: 0,
    context: null
  })
  const barsRef: MutableRefObject<any> = useRef({})

  const onMouseClick = useCallback(
    (e: MouseEvent, positionMouse: Position) => {
      Object.values(barsRef.current).forEach((item) => {
        const data = item as { path: Path2D; item: BarChartColumn }
        if (
          contextRef.current.context?.isPointInPath(
            data.path as Path2D,
            positionMouse.x,
            positionMouse.y
          )
        ) {
          onBarClick(e, data.item)
        }
      })
    },
    [onBarClick]
  )

  const onMouseOver = useCallback(() => {
    if (!mouseOver) {
      mouseOver = true
      canvasReference.current.style.cursor = 'pointer'
    }
  }, [])

  const onMouseLeave = useCallback(() => {
    if (mouseOver) {
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
    item: BarChartColumn,
    index: number,
    COMPABILITY: number,
    minValue: number,
    maxValue: number,
    originYPOS: number,
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
      color.defineRGBColor(item.color)
      color.lighter(20)

      gradient = context.createLinearGradient(
        itemStartX + maxWidth / 2,
        itemStartY,
        itemStartX + maxWidth / 2,
        itemStartY + itemEndY
      )
      gradient.addColorStop(0, item.color)
      gradient.addColorStop(1, color.get())

      context.fillStyle = gradient
      const marginBar = maxWidth / 5
      const path:any = new Path2D()
      if (roundValue) {
        path.roundRect(itemStartX, itemStartY, itemEndX - marginBar, itemEndY, [
          0,
          0,
          roundValue,
          roundValue
        ])
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
  }, [values])

  return (
    <FlexWrapper rootStyle={rootStyle}>
      <ChartXY
        width={width}
        legend={legend}
        labels={labels}
        height={height}
        graphStyle={graphStyle}
        labelStyle={labelStyle}
        roundValue={roundValue}
        values={values}
        range={range}
        canvasReference={canvasReference}
        contextRef={contextRef}
        callbackForEveryItem={createColumn}
        grid={grid}
        titles={titles || null}
      />
    </FlexWrapper>
  )
}

export default React.memo(BarChart)

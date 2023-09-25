import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import BarChartInterface from '../BarChart/BarChartInterface'
import { findClosestNumber } from '../../utils'
import Canvas from '../Canvas'
import { CommonProps } from '../../interfaces/graph-interface'
import Legend from '../legend/Legend'
import { ContextChartXY } from '../../interfaces/chart-xy-interfaces'
import { writeText } from '../../utils/drawerUtils'

const ChartXY: React.FC<
  Omit<BarChartInterface, 'rootStyle' | 'onBarClick'> & CommonProps
> = ({
  titles = { x: 'Aylara Göre Ciro Dağılımı', y: 'Y Axes', title: 'Hello' },
  width = 500,
  grid = true,
  callbackForEveryItem,
  labels,
  contextRef,
  legend = true,
  height = 1200,
  graphStyle,
  canvasReference,
  roundValue,
  values,
  range = null
}) => {
  const context = useRef<ContextChartXY>({
    context: null,
    maxItemWidth: 0
  })

  let MARGIN = titles ? 60 : 30
  let RANGE = 10
  const CHART_WIDTH = width
  const CHART_HEIGHT = height
  const COMPABILITY = CHART_HEIGHT - 80
  const absolueHeight = COMPABILITY - 10
  const absoluteWidth = CHART_WIDTH - 40
  let measuredRange = 0

  let spacingCount = 10
  let maxValue: number = 0
  let minValue: number = 0
  let maxRange = 5

  const start = useCallback(() => {
    clear()
    drawGraphic()
  }, [values, width, height, range, roundValue, grid])

  useEffect(() => {
    getContext()
  }, [])

  useEffect(() => {
    start()
  }, [start])

  const calculate = function (): void {
    const allValues: number[] = []
    values.map((elements) => {
      allValues.push(elements.y as any)
    })

    if (allValues.length > 0 && canvasReference.current) {
      const maxValueInItems = Math.max(...allValues)
      const minValueInItems = Math.min(...allValues)

      RANGE = Math.ceil(
        (Math.abs(maxValueInItems) + Math.abs(minValueInItems)) / (spacingCount - 1)
      )
      RANGE = RANGE < 0 ? -RANGE : RANGE

      if (range) {
        RANGE = range > 10 ? range : 10
      }

      minValue = findClosestNumber(minValueInItems, RANGE)
      minValue = minValue < 0 ? minValue : 0
      maxValue = findClosestNumber(maxValueInItems, RANGE)
      maxValue = maxValue < 0 ? 0 : maxValue
      const temporaryMinValue = minValue < 0 ? -minValue : 0
      maxValue = temporaryMinValue > maxValue ? temporaryMinValue : maxValue

      const maxValueAsString = maxValue.toString()
      if (maxValueAsString.length > 3) {
        MARGIN = (maxValueAsString.length - 3) * 10 + MARGIN
      }
    }
  }

  const getContext = useCallback(() => {
    if (canvasReference.current) {
      contextRef.current.context = canvasReference.current.getContext('2d')
      context.current.context = contextRef.current.context
    }
  }, [values])

  /**
   * Clears canvas itself.
   */
  const clear = useCallback(() => {
    if (context.current.context && canvasReference.current) {
      context.current.context.clearRect(
        0,
        0,
        canvasReference.current.width,
        canvasReference.current.height
      )
    }
  }, [])

  /**
   * This functions draws titles which provided by user on X and Y axes.
   */
  const drawTitles = (
    contextInstance: CanvasRenderingContext2D,
    _: number,
    yPosition: number
  ) => {
    const xTitle = titles?.x || ''
    const yTitle = titles?.y || ''
    contextInstance.save()
    contextInstance.textAlign = 'center'
    if (xTitle) {
      writeText(
        contextInstance,
        xTitle,
        {
          x: (CHART_WIDTH - MARGIN) / 2 + MARGIN,
          y: yPosition
        },
        'black',
        '14px'
      )
    }

    if (yTitle) {
      const titleHeight = (absolueHeight + 10) / 2
      contextInstance.setTransform(
        new DOMMatrix()
          .translate(0, titleHeight)
          .rotate(90)
          .translate(0, -titleHeight)
      )
      writeText(
        contextInstance,
        yTitle,
        {
          x: 0,
          y: titleHeight - 10
        },
        'black',
        '14px'
      )
    }
    contextInstance.restore()
  }

  const drawNumbers = (contextInstance: CanvasRenderingContext2D) => {
    contextInstance.save()

    measuredRange = (absolueHeight + 10) / spacingCount
    let originYPOS = 0
    const yPos = COMPABILITY
    contextInstance.save()
    let fontSize = (contextRef.current.maxItemWidth - 5) / 3
    fontSize = fontSize < 8 ? 8 : fontSize > 14 ? 14 : fontSize
    values.forEach((item, index) => {
      const xPos =
        MARGIN +
        10 +
        contextRef.current.maxItemWidth * index +
        (contextRef.current.maxItemWidth / 2 -
          contextRef.current.maxItemWidth / 5 / 2)
      contextInstance.beginPath()
      contextInstance.fillStyle = 'gray'
      contextInstance.arc(xPos, yPos, 2, 0, Math.PI * 2)
      contextInstance.fill()

      contextInstance.save()
      contextInstance.setTransform(
        new DOMMatrix()
          .translate(xPos, yPos + 3)
          .rotate(60)
          .translate(-xPos, -(yPos + 3))
      )
      writeText(
        contextInstance,
        item.x as string,
        {
          x: xPos,
          y: yPos + 15
        },
        'black',
        `${fontSize}px`,
        'Times New Roman'
      )
      contextInstance.restore()

      if (grid) {
        contextInstance.strokeStyle = 'lightgray'
        contextInstance.beginPath()
        contextInstance.moveTo(xPos, yPos)
        contextInstance.lineTo(xPos, 10)
        contextInstance.stroke()
      }
    })
    contextInstance.restore()

    let value = minValue
    for (let index = 0; index <= spacingCount; value += RANGE) {
      if (spacingCount >= index) {
        maxRange = value
      }

      const valueAsString = value.toString()
      contextInstance.font = '12px Arial'
      const yPosLine = absolueHeight + 10 - index * measuredRange
      contextInstance.fillStyle = '#000'
      contextInstance.textBaseline = 'middle'
      contextInstance.fillText(valueAsString, MARGIN - 30, yPosLine)

      if (valueAsString !== '0') {
        contextInstance.beginPath()
        contextInstance.moveTo(MARGIN - 5, yPosLine)
        contextInstance.lineTo(MARGIN + 5, yPosLine)
        contextInstance.stroke()
      } else {
        originYPOS = yPosLine
      }

      if (grid) {
        contextInstance.strokeStyle = 'lightgray'
        contextInstance.beginPath()
        contextInstance.moveTo(MARGIN + 5, yPosLine)
        contextInstance.lineTo(
          (contextRef.current.maxItemWidth + 40) * values.length,
          yPosLine
        )
        contextInstance.stroke()
      }
  
      index++
      // Draw the Path
    }

    contextInstance.restore()
    return originYPOS
  }

  const drawGraphic = () => {
    if (context.current.context && canvasReference.current) {
      const contextInstance = context.current.context
      contextInstance.font = 'Arial'
      context.current.maxItemWidth =
        values.length > 0 ? absoluteWidth / values.length : CHART_WIDTH / 2
      contextRef.current.maxItemWidth = context.current.maxItemWidth

      spacingCount = absolueHeight / 20
      spacingCount = spacingCount < 2 ? 2 : spacingCount
      spacingCount++

      calculate()

      const lastChartHeight = CHART_HEIGHT - 25

      const originYPOS = drawNumbers(contextInstance)

      values.forEach((item, index) => {
        callbackForEveryItem(
          item,
          index,
          COMPABILITY,
          minValue,
          maxRange,
          originYPOS,
          MARGIN
        )
      })

      // Drawing X And Y Titles
      drawTitles(
        contextInstance,
        (contextRef.current.maxItemWidth + 40) * values.length,
        lastChartHeight
      )

      // Graphic Line
      contextInstance.beginPath()
      contextInstance.lineTo(MARGIN, COMPABILITY)
      contextInstance.lineTo(
        (contextRef.current.maxItemWidth + 40) * values.length,
        COMPABILITY
      )

      contextInstance.moveTo(MARGIN, 10)
      contextInstance.lineTo(MARGIN, lastChartHeight)
      contextInstance.lineWidth = 0
      contextInstance.stroke()
    }
  }

  const legendItem = useMemo(
    () =>
      labels ||
      values.map((item) => ({
        name: item.x as any,
        color: item.color
      })),
    [values, labels]
  )

  return (
    <>
      <div
        style={{
          maxWidth: width
        }}
      >
        {titles && titles?.title && (
          <h3
            style={{
              textAlign: 'center',
              margin: 0,
              color: 'gray',
              fontSize: '2rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {titles?.title}
          </h3>
        )}

        <Canvas
          style={graphStyle}
          width={width}
          height={height}
          ref={canvasReference}
        />
      </div>
      {legend && <Legend labels={legendItem} />}
    </>
  )
}

export default React.memo(ChartXY)

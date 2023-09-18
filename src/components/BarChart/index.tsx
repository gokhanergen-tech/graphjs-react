import React, { useCallback, useEffect, useMemo, useRef,MutableRefObject } from 'react'
import BarChartInterface, { BarChartColumn } from './BarChartInterface'
import { findClosestNumber } from '../../utils'
import Canvas from '../Canvas'
import { Color } from '../../classes/Color'
import styles from './barChartStyles.module.css'
import { CommonProps } from '../../interfaces/graph-interface'
import Legend from '../legend/Legend'

const BarChart: React.FC<BarChartInterface&CommonProps> = ({ width = 500,labels,legend=true, height = 1200, canvasStyle, roundValue, containerStyle, values, range = null }) => {
  const canvasReference = useRef<HTMLCanvasElement>(null)
  const context:MutableRefObject<{
    context: CanvasRenderingContext2D | null
    maxItemWidth: number
  }> = useRef({
    context: null,
    maxItemWidth: 0
  })

  let MARGIN = 30
  let RANGE = 10
  const CHART_WIDTH = width
  const CHART_HEIGHT = height
  const COMPABILITY = CHART_HEIGHT + 5

  let maxValue: number = 0
  let minValue: number = 0

  const start = useCallback(() => {
    clear();
    drawGraphic();
  }, [values, width, height, range, roundValue]);

  useEffect(() => {
    getContext()
    start();
  }, [values, width, height, range, roundValue])

  const calculate = function (
  ): void {
    const allValues: number[] = []
    values.map((elements) => {
      allValues.push(elements.value)
    })

    if (allValues.length > 0 && canvasReference.current) {
      const maxValueInItems = Math.max(...allValues)
      const minValueInItems = Math.min(...allValues)

      RANGE = Math.ceil(maxValueInItems / allValues.length);
      RANGE = RANGE < 0 ? -RANGE : RANGE;

      if (range) {
        RANGE = range > 4 ? range : 4;
      }

      minValue = findClosestNumber(minValueInItems, RANGE)
      minValue = minValue < 0 ? minValue : 0
      maxValue = findClosestNumber(maxValueInItems, RANGE)
      maxValue = maxValue < 0 ? 0 : maxValue;


      const temporaryMinValue = minValue < 0 ? -minValue : 0
      maxValue = temporaryMinValue > maxValue ? temporaryMinValue : maxValue

      const maxValueAsString = maxValue.toString();
      if (maxValueAsString.length > 3) {
        MARGIN = (maxValueAsString.length - 3) * 10 + MARGIN;
        console.log("Max Vale =>", maxValueAsString, MARGIN);
      }
    }
  }

  const getContext = useCallback(() => {
    if (canvasReference.current) {
      context.current.context = canvasReference.current.getContext('2d')
    }
  }, [values])

  const createColumn = function (item: BarChartColumn, index: number): void {
    const contextInstance = context.current.context as any
    const maxWidth = context.current.maxItemWidth

    
    if (contextInstance) {
      const itemStartX = MARGIN + 10 + index * (maxWidth + 5)
      const itemStartY = COMPABILITY

      const itemEndX = maxWidth
      const itemEndY = -(item.value * CHART_HEIGHT) / maxValue

      // Create gradient
      const color = new Color();
      color.defineRGBColor(item.color);
      color.lighter(20);

      const gradient = contextInstance.createLinearGradient(itemStartX + maxWidth / 2, itemStartY, itemStartX + maxWidth / 2, itemStartY + itemEndY);
      gradient.addColorStop(0, item.color);
      gradient.addColorStop(1, color.get());

      contextInstance.fillStyle = gradient
      if (roundValue) {
        contextInstance.beginPath();
        contextInstance.roundRect(itemStartX, itemStartY, itemEndX, itemEndY, [0, 0, roundValue, roundValue])
        contextInstance.fill()
      }
      else {
        contextInstance.fillRect(itemStartX, itemStartY, itemEndX, itemEndY)
      }
    }
  }

  /**
   * Clears canvas itself.
   */
  const clear = () => {
    if (context.current.context && canvasReference.current) {
      context.current.context.clearRect(0, 0, canvasReference.current.width, canvasReference.current.height)
    }
  }

  const drawNumbers = (contextInstance: CanvasRenderingContext2D) => {
    contextInstance.save()
    for (let index = minValue; index <= maxValue; index += RANGE) {
      const valueAsString = index.toString();

      contextInstance.font = '12px Arial'
      contextInstance.fillStyle = '#000'
      contextInstance.fillText(
        valueAsString,
        0,
        CHART_HEIGHT - (CHART_HEIGHT * index) / maxValue + 10
      )

      if (valueAsString !== "0") {
        contextInstance.beginPath()
        contextInstance.moveTo(
          MARGIN - 5,
          CHART_HEIGHT - (CHART_HEIGHT * index) / maxValue + 5
        )
        contextInstance.lineTo(
          MARGIN + 5,
          CHART_HEIGHT - (CHART_HEIGHT * index) / maxValue + 5
        )
      }

      // Draw the Path
      contextInstance.stroke()
    }

    contextInstance.restore()
  }

  const drawGraphic = () => {
    if (context.current.context && canvasReference.current) {
      const contextInstance = context.current.context
      contextInstance.font = 'Arial'
      context.current.maxItemWidth = values.length > 0 ? CHART_WIDTH / values.length / 2 : CHART_WIDTH / 2

      calculate()

      const lastChartHeight = CHART_HEIGHT + ((-minValue * CHART_HEIGHT) / maxValue + 5);
      const lastChartWidth = (context.current.maxItemWidth + 5) * values.length + MARGIN + 10;

      canvasReference.current.height = lastChartHeight + 10;
      canvasReference.current.width = lastChartWidth;
      console.log(lastChartWidth, context.current.maxItemWidth, values.length, COMPABILITY);

      drawNumbers(contextInstance);

      values.forEach((item, index) => {
        createColumn(item, index)
      })

      // Graphic Line
      contextInstance.beginPath()
      contextInstance.lineTo(MARGIN, COMPABILITY)
      contextInstance.lineTo(lastChartWidth, COMPABILITY)

      contextInstance.moveTo(MARGIN, 5)
      contextInstance.lineTo(
        MARGIN,
        lastChartHeight
      )

      contextInstance.lineWidth = 0
      contextInstance.stroke()
    }
  }

  const legendItem=useMemo(()=>labels||values.map(item=>({
    name:item.label,
    color:item.color
  })),[values,labels])

  console.log(legendItem)
  return <div style={containerStyle} className={styles.main}>
    <Canvas style={canvasStyle} width={width} height={height} ref={canvasReference} />
    {
      legend&&<Legend labels={legendItem}></Legend>
    }
  </div>
}

export default React.memo(BarChart)
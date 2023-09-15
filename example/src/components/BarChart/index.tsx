import React, { useCallback, useEffect, useRef } from 'react'
import BarChartInterface, { BarChartColumn } from './BarChartInterface'
import { findClosestNumber } from '../../utils'
import Canvas from '../Canvas'

const BarChart: React.FC<BarChartInterface> = ({ width = 500, height = 1200, style = {}, values }) => {
  const canvasReference = useRef<HTMLCanvasElement>(null)
  const context = useRef<{
    context: CanvasRenderingContext2D | null
    maxItemWidth: number
  }>({
    context: null,
    maxItemWidth: 0
  })

  let MARGIN = 30
  let RANGE = 10
  const CHART_HEIGHT = 500
  const CHART_WIDTH = 1200
  const COMPABILITY = CHART_HEIGHT + 5

  let maxValue: number = 0
  let minValue: number = 0

  const start = useCallback(() => {
    clear();
    drawGraphic();
  }, [values]);

  useEffect(() => {
    getContext()
    start();
  }, [values])

  const getNumbers = function (
    contextInstance: CanvasRenderingContext2D
  ): void {
    var allValues: number[] = []
    values.map((elements) => {
      allValues.push(elements.value)
    })

    if (allValues.length > 0) {
      const maxValueInItems = Math.max(...allValues)
      const minValueInItems = Math.min(...allValues)

      RANGE = Math.ceil(maxValueInItems / allValues.length);
      RANGE = RANGE < 0 ? -RANGE : RANGE;

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

        // Start a new Path
        contextInstance.beginPath()
        contextInstance.moveTo(
          MARGIN - 5,
          CHART_HEIGHT - (CHART_HEIGHT * index) / maxValue + 5
        )
        contextInstance.lineTo(
          MARGIN + 5,
          CHART_HEIGHT - (CHART_HEIGHT * index) / maxValue + 5
        )

        // Draw the Path
        contextInstance.stroke()
      }
      contextInstance.restore()
    }
  }

  const getContext = useCallback(() => {
    if (canvasReference.current) {
      context.current.context = canvasReference.current.getContext('2d')
    }
  }, [values])

  const createColumn = function (item: BarChartColumn, index: number): void {
    const contextInstance = context.current.context
    const maxWidth = context.current.maxItemWidth

    let gradient = null;
    if (contextInstance) {
      const itemStartX = MARGIN + 10 + index * (maxWidth + MARGIN)
      const itemStartY = COMPABILITY

      const itemEndX = maxWidth
      const itemEndY = -(item.value * CHART_HEIGHT) / maxValue
      console.log(itemStartX, itemStartY, itemEndX, itemEndY * (itemEndY < 0 ? -1 : 1));
      // Create gradient
      gradient = contextInstance.createLinearGradient(itemStartX * 150 / 100, itemStartY, itemEndX * 150 / 100, itemEndY * (itemEndY < 0 ? -1 : 1));
      gradient.addColorStop(0, item.color);
      gradient.addColorStop(1, "blue");

      contextInstance.fillStyle = gradient
      contextInstance.fillRect(itemStartX, itemStartY, itemEndX, itemEndY)
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

  const drawGraphic = () => {
    if (context.current.context && canvasReference.current) {
      const contextInstance = context.current.context
      contextInstance.font = 'Arial'
      context.current.maxItemWidth = values.length > 0 ? CHART_WIDTH / values.length / 2 : CHART_WIDTH / 2

      getNumbers(contextInstance)

      values.forEach((item, index) => {
        createColumn(item, index)
      })

      // Graphic Line
      contextInstance.beginPath()
      contextInstance.lineTo(MARGIN, COMPABILITY)
      contextInstance.lineTo(CHART_WIDTH, COMPABILITY)

      contextInstance.moveTo(MARGIN, 5)
      contextInstance.lineTo(
        MARGIN,
        CHART_HEIGHT + ((-minValue * CHART_HEIGHT) / maxValue + 5)
      )

      contextInstance.lineWidth = 0
      contextInstance.stroke()
    }
  }

  return <Canvas style={style} width={width} height={height} ref={canvasReference} />
}

export default React.memo(BarChart)

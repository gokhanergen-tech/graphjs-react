import React, { useCallback, useEffect, useRef } from 'react'
import BarChartInterface, { BarChartColumn } from './BarChartInterface'
import { findClosestNumber } from '../../utils'

const BarChart: React.FC<BarChartInterface> = ({ values }) => {
  const canvasReference = useRef<HTMLCanvasElement>(null)
  const context = useRef<{
    context: CanvasRenderingContext2D | null
    maxItemWidth: number
  }>({
    context: null,
    maxItemWidth: 0
  })

  const MARGIN = 30
  let RANGE = 10
  const CHART_HEIGHT = 500
  const CHART_WIDTH = 1200
  const COMPABILITY = CHART_HEIGHT + 5

  let maxValue: number = 0
  let minValue: number = 0

  const getNumbers = function (
    contextInstance: CanvasRenderingContext2D
  ): void {
    var allValues: number[] = []
    values.map((elements) => {
      allValues.push(elements.value)
    })

    const maxValueInItems = Math.max(...allValues)
    const minValueInItems = Math.min(...allValues)

    RANGE = Math.ceil(maxValueInItems / allValues.length);
    minValue = findClosestNumber(minValueInItems, RANGE)
    minValue = minValue < 0 ? minValue : 0
    maxValue = findClosestNumber(maxValueInItems, RANGE)

    const temporaryMinValue = -minValue
    maxValue = temporaryMinValue > maxValue ? temporaryMinValue : maxValue

    contextInstance.save()
    for (let index = minValue; index <= maxValue; index += RANGE) {
      contextInstance.font = '12px Arial'
      contextInstance.fillStyle = '#000'
      contextInstance.fillText(
        index.toString(),
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

  const getContext = useCallback(() => {
    if (canvasReference.current) {
      context.current.context = canvasReference.current.getContext('2d')
      context.current.maxItemWidth = CHART_WIDTH / values.length / 2
      drawGraphic()
    }
  }, [values])

  const createColumn = function (item: BarChartColumn, index: number): void {
    const contextInstance = context.current.context
    const maxWidth = context.current.maxItemWidth
    if (contextInstance) {
      const itemStartX = MARGIN + 10 + index * (maxWidth + MARGIN)
      const itemStartY = COMPABILITY

      const itemEndX = maxWidth
      const itemEndY = -(item.value * CHART_HEIGHT) / maxValue
      contextInstance.fillStyle = item.color

      contextInstance.fillRect(itemStartX, itemStartY, itemEndX, itemEndY)
    }
  }

  const drawGraphic = () => {
    if (context.current.context && canvasReference.current) {
      const contextInstance = context.current.context
      contextInstance.font = 'Arial'
      getNumbers(contextInstance)

      values.forEach((item, index) => {
        createColumn(item, index)
      })

      // Graphic Line
      contextInstance.beginPath()
      contextInstance.lineTo(MARGIN, COMPABILITY)
      contextInstance.lineTo(CHART_WIDTH, COMPABILITY)
      if (minValue < 0) {
        contextInstance.moveTo(MARGIN, 5)
        contextInstance.lineTo(
          MARGIN,
          CHART_HEIGHT + ((-minValue * CHART_HEIGHT) / maxValue + 5)
        )
      }
      contextInstance.lineWidth = 0
      contextInstance.stroke()
    }
  }

  useEffect(() => {
    getContext()
  }, [])

  return <canvas ref={canvasReference} width={1200} height={1200} />
}

export default BarChart

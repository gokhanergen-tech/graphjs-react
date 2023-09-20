import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import BarChartInterface from '../BarChart/BarChartInterface'
import { findClosestNumber } from '../../utils'
import Canvas from '../Canvas'
import styles from './chartXYStyles.module.css'
import { CommonProps } from '../../interfaces/graph-interface'
import Legend from '../legend/Legend'
import { ContextChartXY } from '../../interfaces/chart-xy-interfaces'

const ChartXY: React.FC<Omit<BarChartInterface, "rootStyle"> & CommonProps> = ({ width = 500, callbackForEveryItem, labels, contextRef, legend = true, height = 1200, canvasStyle, canvasReference, roundValue, containerStyle, values, range = null }) => {

  const context = useRef<ContextChartXY>({
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
      allValues.push(elements.y as any)
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
      contextRef.current.context = canvasReference.current.getContext('2d');
      context.current.context = contextRef.current.context;
    }
  }, [values])

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
      contextRef.current.maxItemWidth = context.current.maxItemWidth;

      calculate()

      const lastChartHeight = CHART_HEIGHT + ((-minValue * CHART_HEIGHT) / maxValue + 5);
      const lastChartWidth = (context.current.maxItemWidth + 5) * values.length + MARGIN + 10;

      canvasReference.current.height = lastChartHeight + 10;
      canvasReference.current.width = lastChartWidth;


      drawNumbers(contextInstance);

      values.forEach((item, index) => {
        callbackForEveryItem(item, index, MARGIN, COMPABILITY, CHART_HEIGHT, maxValue);
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

  const legendItem = useMemo(() => labels || values.map(item => ({
    name: item.x as any,
    color: item.color
  })), [values, labels])

  return <>
    <Canvas style={canvasStyle} width={width} height={height} ref={canvasReference} />
    {
      legend && <Legend labels={legendItem}></Legend>
    }
  </>
}

export default React.memo(ChartXY)

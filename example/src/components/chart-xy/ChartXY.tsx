import React, { CSSProperties, useCallback, useMemo, useRef } from 'react'
import { findClosestNumber, generateColor, nFormatter } from '../../utils'
import Canvas from '../Canvas'
import { CommonProps, WrapperProps } from '../../interfaces/graph-interface'
import Legend from '../legend/Legend'
import { ContextChartXY } from '../../interfaces/chart-xy-interfaces'
import { writeText } from '../../utils/drawerUtils'
import ChartInterface from './ChartInterface'

export interface ChartColumn {
  y: string | number,
  x: string | number,
  color: string,
}

export interface ChartInterfaceProps extends WrapperProps {
  data: Array<ChartColumn> | Array<ChartColumn>[],
  containerStyle?: CSSProperties,
  labelStyle?: CSSProperties,
  roundValue?: number,
  width?: number,
  height?: number,
  range?: number | null,
  grid?: boolean,
  xAxisLabels?: string[]
}



const ChartXY: React.FC<
  Omit<ChartInterfaceProps, 'rootStyle' | 'onBarClick'> & CommonProps & ChartInterface
> = ({
  titles,
  title,
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
  data,
  range = null,
  backgroundColor,
  xAxisLabels = null
}) => {
    const context = useRef<ContextChartXY>({
      context: null,
      maxItemWidth: 0
    })

    const MARGIN = titles ? 60 : 30
    let RANGE = 10
    const CHART_WIDTH = width
    const CHART_HEIGHT = height
    const COMPABILITY = CHART_HEIGHT - 80
    const absolueHeight = COMPABILITY - 10
    const absoluteWidth = CHART_WIDTH - 10 - MARGIN
    let measuredRange = 0

    let spacingCount = 10
    let maxValue: number = 0
    let minValue: number = 0
    let maxRange = 5

    const start = useCallback(() => {
      getContext()
      drawGraphic()
    }, [data, width, height, range, roundValue, grid,xAxisLabels])

    const sortData=(data:ChartColumn[])=>{
      if(xAxisLabels){
        data.sort((a,b) => {
          const first=a as ChartColumn;
          const second=b as ChartColumn;
          if(typeof first.x === "string" && typeof second.x === "string")
           return xAxisLabels.indexOf(first.x)-xAxisLabels.indexOf(second.x);
          return 0;
        })
      }
    }



    const calculate = function (): void {
      const allValues: number[] = []
      data.flat().forEach((element) => {
        const item = element as ChartColumn;
        allValues.push(item.y as any)
        return 1;
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
      }
    }

    const getContext = useCallback(() => {
      if (canvasReference.current) {
        contextRef.current.context = canvasReference.current.getContext('2d')
        context.current.context = contextRef.current.context
      }
    }, [data])

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
            .rotate(-90)
            .translate(0, -titleHeight)
        )
        writeText(
          contextInstance,
          yTitle,
          {
            x: 0,
            y: titleHeight + 10
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

      if (xAxisLabels) {
        xAxisLabels.forEach((title, index) => {
          const xPos =
            MARGIN +
            10 +
            contextRef.current.maxItemWidth * index +
            (contextRef.current.maxItemWidth / 2 -
              contextRef.current.maxItemWidth / 5 / 2)
          contextInstance.save()

          contextInstance.setTransform(
            new DOMMatrix()
              .translate(xPos, yPos + 3)
              .rotate(60)
              .translate(-xPos, -(yPos + 3))
          )
          writeText(
            contextInstance,
            title,
            {
              x: xPos,
              y: yPos + 15
            },
            'black',
            `${fontSize}px`,
            'Times New Roman'
          )
          contextInstance.restore()

        })
      }

    
     
      xAxisLabels?.forEach((_, index) => {
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

        const valueAsString = nFormatter(value, 0);
        contextInstance.font = '12px Arial'
        const yPosLine = absolueHeight + 10 - index * measuredRange
        contextInstance.fillStyle = '#000'
        contextInstance.textBaseline = 'middle'
        contextInstance.textAlign = "right"
        contextInstance.fillText(valueAsString, MARGIN - 8, yPosLine + 2)

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
            (contextRef.current.maxItemWidth + 40) * (xAxisLabels?.length||1),
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
        const lengthOfX = (xAxisLabels?.length||1);
        contextInstance.font = 'Arial'
        context.current.maxItemWidth =
        lengthOfX > 0 ? absoluteWidth / lengthOfX : CHART_WIDTH / 2
        contextRef.current.maxItemWidth = context.current.maxItemWidth

        spacingCount = absolueHeight / 20
        spacingCount = spacingCount < 2 ? 2 : spacingCount
        spacingCount++

        calculate()

        const lastChartHeight = CHART_HEIGHT - 25

        const originYPOS = drawNumbers(contextInstance)
       
        if(!Array.isArray(data?.[0])){
          if(xAxisLabels){
            sortData(data as ChartColumn[])
          }
          data.forEach((item, index) => {
            callbackForEveryItem(
              item,
              index,
              COMPABILITY,
              minValue,
              maxRange,
              originYPOS,
              MARGIN,
              contextInstance
            )
          })
        }else{
          const arrayColumns = data as ChartColumn[][]
          arrayColumns.forEach(array=>{
            if(xAxisLabels){
              sortData(array)
            }
          })
          data.forEach((array,index) => {
            const castArray = array as Array<ChartColumn>
            contextInstance.save();
            if(roundValue){
              contextInstance.lineJoin="round"
            }
            contextInstance.lineJoin="round"
            contextInstance.beginPath();
            contextInstance.moveTo(MARGIN,originYPOS)
            contextInstance.strokeStyle = labels?.[index]?.color || generateColor()
            castArray.forEach((item,index)=>{
              callbackForEveryItem(
                item,
                index,
                COMPABILITY,
                minValue,
                maxRange,
                originYPOS,
                MARGIN,
                contextInstance
              )
            })
            contextInstance.stroke()
            contextInstance.restore();
          })
        }

        

       
        // Drawing X And Y Titles
        drawTitles(
          contextInstance,
          (contextRef.current.maxItemWidth + 40) * lengthOfX,
          lastChartHeight
        )

        // Graphic Line
        contextInstance.beginPath()
        contextInstance.lineTo(MARGIN, COMPABILITY)
        contextInstance.lineTo(
          (contextRef.current.maxItemWidth + 40) * lengthOfX,
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
        data.map((item, index) => {
          if (Array.isArray(item)) {
            return ({
              name: String(index),
              color: generateColor()
            })
          } else
            return ({
              name: item.x as any,
              color: item.color
            })
        }),
      [data, labels]
    )

    return (
      <React.Fragment>
        <Canvas
          style={graphStyle}
          width={width}
          height={height}
          titlegraph={title}
          ref={canvasReference}
          render={start}
          bgcolor={backgroundColor}
        />
        {legend && <Legend labels={legendItem} />}
      </React.Fragment>
    )
  }

export default React.memo(ChartXY)

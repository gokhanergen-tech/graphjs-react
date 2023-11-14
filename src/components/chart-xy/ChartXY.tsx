import React, { CSSProperties, useCallback, useMemo, useRef, useState } from 'react'
import { generateColor, nFormatter } from '../../utils'
import Canvas from '../Canvas'
import { CommonProps, LegendItemProps, WrapperProps } from '../../interfaces/graph-interface'
import Legend from '../legend/Legend'
import { ContextChartXY } from '../../interfaces/chart-xy-interfaces'
import { writeText } from '../../utils/drawerUtils'
import ChartInterface from './ChartInterface'
import { calculateMaxMinAndRange } from '../../utils/mathUtils'
import { drawGridLine } from '../../utils/canvasUtils'

export interface ChartColumn {
  y: string | number,
  x: string | number,
  color?: string,
}

export interface ChartInterfaceProps extends WrapperProps {
  data: ChartColumn[] | ChartColumn[][],
  containerStyle?: CSSProperties,
  labelStyle?: CSSProperties,
  roundValue?: number,
  width?: number,
  height?: number,
  range?: number | null,
  grid?: boolean,
  xAxisLabels?: string[],
  wheelScaling?: boolean
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
  xAxisLabels = null,
  wheelScaling
}) => {
    const context = useRef<ContextChartXY>({
      context: null,
      maxItemWidth: 0
    })

    const [scaleValue, setScaleValue] = useState<number>(1)

    const MARGIN = titles ? 60 : 30

    const CHART_WIDTH = width * scaleValue;
    const CHART_HEIGHT = height * scaleValue;
    const COMPABILITY = CHART_HEIGHT - 80
    const absolueHeight = COMPABILITY - 10
    const absoluteWidth = CHART_WIDTH - 10 - MARGIN

    let measuredRangeX = 0
    let measuredRangeY = 0

    let spacingCount = 10
    let spacingCountX = 8
    let minValueY: number = 0
    let RANGEY = 10
    let minValueX: number = 0
    let RANGEX = 10
    let maxRange = 5

    const start = useCallback(() => {
      getContext()
      drawGraphic()
    }, [data, width, height, range, roundValue, grid, xAxisLabels, scaleValue])


    const calculate = function (): void {
      const allValuesY: number[] = []
      const allValuesX: number[] = []

      const flattedData = data.flat();


      flattedData.forEach((element) => {
        const item = element as ChartColumn;
        allValuesY.push(item.y as any)
        if (typeof element.x === "number") {
          allValuesX.push(element.x)
        }
        return 1;
      })

      if (canvasReference.current) {
        if (allValuesY.length > 0) {
          const [rangeY, minY] = calculateMaxMinAndRange(allValuesY, spacingCount, range);
          RANGEY = rangeY;
          minValueY = minY;

        }

        if (allValuesX.length > 0) {
          const [rangeX, minX] = calculateMaxMinAndRange(allValuesX, spacingCountX);
          RANGEX = rangeX;
          minValueX = minX;
        }
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

      measuredRangeY = (absolueHeight + 10) / spacingCount
      measuredRangeX = (absoluteWidth - 10) / (spacingCountX)

      let originYPOS = 0
      let originXPOS = 0;
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
            drawGridLine(
              contextInstance,
              xPos,
              yPos,
              xPos,
              10
            )
          }
        })
      } else {
        let valueX = minValueX + RANGEX;
        // Drawing X axis
        for (let index = 1; index <= spacingCountX + 1; valueX += RANGEX) {

          const valueAsString = nFormatter(valueX, 0);
          const xPosLine = index * measuredRangeX + MARGIN

          if (valueAsString === '0') {
            originXPOS = xPosLine;
          }

          contextInstance.save();
          contextInstance.font = '12px Arial'
          contextInstance.fillStyle = '#000'
          contextInstance.textBaseline = 'middle'
          contextInstance.textAlign = "center"
          contextInstance.fillText(valueAsString, xPosLine, absolueHeight + 20)
          contextInstance.restore();

          index++
          // Draw the Path

          if (grid) {
            drawGridLine(
              contextInstance,
              xPosLine,
              yPos,
              xPosLine,
              10)
          }
        }
      }


      contextInstance.restore()

      let valueY = minValueY

      // Drawing Y axis
      for (let index = 0; index <= spacingCount; valueY += RANGEY) {
        if (spacingCount >= index) {
          maxRange = valueY
        }

        const valueAsString = nFormatter(valueY, 0);
        contextInstance.font = '12px Arial'
        const yPosLine = absolueHeight + 10 - index * measuredRangeY
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
          drawGridLine(
            contextInstance, MARGIN + 5,
            yPosLine,
            (contextRef.current.maxItemWidth + 40) * (xAxisLabels?.length || spacingCountX),
            yPosLine)
        }

        index++
        // Draw the Path
      }

      contextInstance.restore()
      return [originYPOS, originXPOS]
    }

    const drawGraphic = () => {
      if (context.current.context && canvasReference.current) {

        const contextInstance = context.current.context
        contextInstance.font = 'Arial'


        spacingCount = absolueHeight / 20
        spacingCount = spacingCount < 2 ? 2 : spacingCount
        spacingCount++

        spacingCountX = absoluteWidth / 100
        spacingCountX = spacingCountX < 2 ? 2 : spacingCountX
        spacingCountX++
        const lengthOfX = (xAxisLabels?.length || spacingCountX);

        context.current.maxItemWidth =
          lengthOfX > 0 ? (absoluteWidth) / lengthOfX : CHART_WIDTH / 2
        contextRef.current.maxItemWidth = context.current.maxItemWidth
        calculate()

        const lastChartHeight = CHART_HEIGHT - 25

        const [originYPOS, originXPOS] = drawNumbers(contextInstance)

        if (!Array.isArray(data?.[0])) {
          data.forEach((item, index) => {
            const object = item as ChartColumn;
            index = xAxisLabels ? xAxisLabels.indexOf(object.x as string) : index
            callbackForEveryItem(
              item,
              index,
              COMPABILITY,
              minValueY,
              maxRange,
              { originYPOS, originXPOS },
              MARGIN,
              contextInstance
            )
          })
        } else {
          data.forEach((array, index) => {
            const castArray = array as Array<ChartColumn>
            contextInstance.save();
            if (roundValue) {
              contextInstance.lineJoin = "round"
            }
            contextInstance.lineJoin = "round"
            contextInstance.beginPath();
            const legendItem = labels?.[index];
            contextInstance.strokeStyle = legendItem?.color || generateColor()
            castArray.forEach((item, index) => {
              const object = item as ChartColumn;
              index = xAxisLabels ? xAxisLabels.indexOf(object.x as string) : index
              callbackForEveryItem(
                item,
                index,
                COMPABILITY,
                minValueY,
                maxRange,
                { originYPOS, originXPOS },
                MARGIN,
                minValueX,
                RANGEX * spacingCountX,
                measuredRangeX * spacingCountX,
                legendItem
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

    const legendItem = useMemo<LegendItemProps[]>(
      () =>
        labels ||
        [...data].map((item, index)=> {
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
          sizeCanvas={{
            width, height
          }}
          width={CHART_WIDTH}
          height={CHART_HEIGHT}
          titlegraph={title}
          ref={canvasReference}
          render={start}
          bgcolor={backgroundColor}
          setScaleValue={setScaleValue}
          wheelScaling={wheelScaling}
        />
        {legend && <Legend labels={legendItem} />}
      </React.Fragment>
    )
  }

export default React.memo(ChartXY)

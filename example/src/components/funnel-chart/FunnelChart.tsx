import React, { MutableRefObject, useCallback, useLayoutEffect, useRef } from 'react'
import { FunnelChartProps } from '../../interfaces/funnel-interfaces'
import FlexWrapper from '../common/FlexWrapper'
import Canvas from '../Canvas'
import FunnelChartDrawer from './FunnelChartDrawer'

const FunnelChart: React.FunctionComponent<FunnelChartProps> = ({
  width,
  height,
  rootStyle,
  data,
  options = {
    highBarColor: '#00308F',
    lowBarColor: 'gray',
    barInlineTextColor: 'lightgray',
    labelTextColor: 'black'
  },
  backgroundColor,
  graphStyle,
  title
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const funnelChartDrawerRef = useRef(new FunnelChartDrawer())

  // If dependencies change, run this function
  const render = useCallback(
    () => {
      const ctx = canvasRef.current?.getContext('2d') as CanvasRenderingContext2D
      if (ctx) {
        // to render drawing
        funnelChartDrawerRef.current.draw(ctx)
      }
    },
    [width, height, data, options]
  )

  useLayoutEffect(() => {
    // Update bars
    funnelChartDrawerRef.current.updateBars(data)
    // Update params
    funnelChartDrawerRef.current.update(width, height)
  }, [data])

  // This provides optimization just to draw
  useLayoutEffect(() => {
    // Update options
    funnelChartDrawerRef.current.updateOptions(options)
  }, [options])

  // Render
  return (
    <FlexWrapper rootStyle={rootStyle}>
      <Canvas
        height={height}
        width={width}
        style={graphStyle}
        ref={canvasRef}
        titlegraph={title}
        render={render}
        bgcolor={backgroundColor}
        sizeCanvas={{
          height,width
        }}
      />
    </FlexWrapper>
  )
}

export default React.memo(FunnelChart)

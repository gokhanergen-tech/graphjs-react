import React, { MutableRefObject, useCallback, useEffect, useRef } from 'react'
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
  graphStyle
}) => {
  const canvasRef: MutableRefObject<any> = useRef()
  const funnelChartDrawerRef = useRef(new FunnelChartDrawer())

  const render = useCallback(
    (onlyDraw = false) => {
      const ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D
      if (ctx) {
        if (!onlyDraw) {
          // to measure all values
          funnelChartDrawerRef.current.update(width, height, data)
        }

        // to render drawing
        funnelChartDrawerRef.current.draw(ctx)
      }
    },
    [data, width, height]
  )

  // This provides optimization just to draw
  useEffect(() => {
    funnelChartDrawerRef.current.updateOptions(options)
    render(true)
  }, [options])

  useEffect(() => {
    funnelChartDrawerRef.current.updateBgColor(backgroundColor)
  }, [backgroundColor])

  useEffect(() => {
    render()
  }, [render])

  return (
    <FlexWrapper rootStyle={rootStyle}>
      <Canvas
        height={height}
        width={width}
        style={graphStyle}
        ref={canvasRef}
      />
    </FlexWrapper>
  )
}

export default React.memo(FunnelChart)

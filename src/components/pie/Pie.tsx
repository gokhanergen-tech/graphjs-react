import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import Canvas from '../Canvas'
import { Position } from '../../utils/mouseUtils'
import { clearCanvas } from '../../utils/canvasUtils'
import useMouse from '../../hooks/useMouse'
import {
  DoughNutPieProps,
  ItemProps,
  PathData,
  PieProps
} from '../../interfaces/pie-interfaces'
import Legend from '../legend/Legend'
import { CommonProps } from '../../interfaces/graph-interface'
import FlexWrapper from '../common/FlexWrapper'
import PieDrawer from './PieDrawer'

/**
 * radius @default 120
 * scaled @default false
 * data  It is array for data
 */
const Pie = ({
  radius = 120,
  data,
  textToCenter = false,
  labels,
  scaled = false,
  legend = false,
  onMouseClickPiece,
  graphStyle,
  rootStyle,
  doughnut = false
}: PieProps & CommonProps & DoughNutPieProps) => {
  const canvasRef: MutableRefObject<any> = useRef()
  const pathsRef: MutableRefObject<PathData[] | undefined> = useRef(undefined)
  const [dataCopy, setDataCopy] = useState(data)
  const initialLoadingRef = useRef(false)
  const settingsRef: MutableRefObject<{
    radius: number
    textToCenter: boolean
    scaled: boolean
    doughnut: boolean
    data: ItemProps[]
  }> = useRef({ radius, textToCenter, scaled, data, doughnut })
  const pieDrawerRef = useRef(new PieDrawer())

  const mouseMove = useCallback(
    async (
      _: MouseEvent,
      position: Position,
      ctx: CanvasRenderingContext2D
    ) => {
      if (pathsRef.current) {
        for (let i = 0; i < pathsRef.current.length; ++i) {
          const item = pathsRef.current[i]
          if (ctx.isPointInPath(item.path, position.x, position.y)) {
            if (!item.over) {
              item.over = true
              await renderData(item)
              canvasRef.current.style.cursor = 'pointer'
              break
            }
          } else {
            if (item.over === true) {
              item.over = false
              await renderData(null)
              canvasRef.current.style.cursor = 'default'
              break
            }
          }
        }
      }
    },
    []
  )

  const mouseClick = useCallback(
    (e: MouseEvent, position: Position, ctx: CanvasRenderingContext2D) => {
      pathsRef.current?.forEach((item) => {
        if (ctx.isPointInPath(item.path, position.x, position.y)) {
          if (onMouseClickPiece) onMouseClickPiece(e, item.data)
        }
      })
    },
    []
  )

  // This prevents to stay over true when the mouse leave out of canvas
  const mouseLeave = useCallback(() => {
    if (
      !pathsRef.current?.every((item) => {
        const beforeOverValue = item.over
        item.over = false
        return !beforeOverValue
      })
    )
      renderData(null)
  }, [])

  useMouse(canvasRef, mouseMove, mouseClick, mouseLeave)

  const renderData = useCallback(
    async (item: PathData | null | undefined) => {
      // get context
      const ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D
      const canvas = canvasRef.current as HTMLCanvasElement
      if (ctx) {
        // Initially, clear the whole screen
        clearCanvas(ctx)

        const paths = await pieDrawerRef.current.update(
          ctx,
          settingsRef.current.radius,
          settingsRef.current.data,
          settingsRef.current.textToCenter,
          settingsRef.current.scaled,
          settingsRef.current.doughnut,
          {
            x: canvas.width / 2,
            y: canvas.height / 2
          },
          item,
          initialLoadingRef
        )
        // sum all value

        if (!initialLoadingRef.current) initialLoadingRef.current = true

        pathsRef.current = paths
        pieDrawerRef.current.draw(ctx)
      }
    },
    [radius, dataCopy, textToCenter, scaled, doughnut]
  )

  /*
  If the data changes, run this
  */
  useLayoutEffect(() => {
    pathsRef.current = undefined
    setDataCopy(data)
  }, [data])

  useEffect(() => {
    settingsRef.current = {
      radius,
      textToCenter,
      scaled: doughnut ? false : scaled,
      doughnut,
      data
    }
  }, [radius, textToCenter, scaled, data, doughnut])

  /*
   If radius and updateCanvasSizeWhenScaled change, run this
  */
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = radius * 2.5
      canvasRef.current.height = radius * 2.5
    }
  }, [radius])

  useEffect(() => {
    renderData(null)
  }, [renderData])

  const legendItem = useMemo(
    () =>
      labels ||
      data.map((item) => ({
        name: item.name,
        color: item.backgroundColor
      })),
    [data, labels]
  )

  return (
    <FlexWrapper rootStyle={rootStyle}>
      <Canvas
        style={{
          ...(graphStyle || {}),
          minWidth: radius * 2,
          minHeight: radius * 2
        }}
        ref={canvasRef}
      />
      {legend && <Legend labels={legendItem} />}
    </FlexWrapper>
  )
}

export default React.memo(Pie)

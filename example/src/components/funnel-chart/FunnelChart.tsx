import React, { MutableRefObject, useCallback, useEffect, useRef } from 'react'
import { FunnelChartProps } from '../../interfaces/funnel-interfaces';
import FlexWrapper from '../common/FlexWrapper';
import Canvas from '../Canvas';
import FunnelChartDrawer from './FunnelChartDrawer';

const FunnelChart: React.FunctionComponent<FunnelChartProps> = ({
    width,
    height,
    rootStyle,
    canvasStyle,
    data
}) => {
    const canvasRef: MutableRefObject<any> = useRef();
    const funnelChartDrawerRef = useRef(new FunnelChartDrawer())

    const render = useCallback(() => {
        const ctx = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
        if (ctx) {
            // to measure all values
            funnelChartDrawerRef.current.update(width, height, data);
            // to render drawing
            funnelChartDrawerRef.current.draw(ctx);
        }
    }, [data, width, height]);

    useEffect(() => {
        render();
    }, [render])

    return (
        <FlexWrapper rootStyle={rootStyle}>
            <Canvas
                height={height}
                width={width}
                style={canvasStyle}
                ref={canvasRef}
            >

            </Canvas>
        </FlexWrapper>
    )
}

export default React.memo(FunnelChart);
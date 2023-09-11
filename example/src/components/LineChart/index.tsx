import React, { useCallback, useEffect, useRef } from 'react'
import LineChartInterface, { LineChartColumn } from './LineChartInterface'
import { findClosestNumber } from '../../utils';

const LineChart: React.FC<LineChartInterface> = ({ values }) => {
    const canvasReference = useRef<HTMLCanvasElement>(null);
    const context = useRef<{
        context: CanvasRenderingContext2D | null,
        maxItemWidth: number
    }>({
        context: null,
        maxItemWidth: 0
    });

    const MARGIN = 30;
    let maxValue: number = 0;
    let minValue: number = 0;
    const CHART_HEIGHT = 300;

    const getNumbers = function (contextInstance: CanvasRenderingContext2D, zeroPointPosition: number): void {
        var allValues: number[] = [];
        values.map(elements => {
            allValues.push(elements.value)
        });

        minValue = findClosestNumber(Math.min(...allValues));
        minValue = minValue < 0 ? minValue : 0;

        maxValue = findClosestNumber(Math.max(...allValues));
        console.log(zeroPointPosition, minValue / 10, maxValue / 10);
        contextInstance.save()
        for (let index = minValue / 10; index <= maxValue / 10; index++) {
            console.log(index);
            contextInstance.font = "12px Arial";
            contextInstance.textBaseline = "middle";
            contextInstance.fillStyle = "#000";
            contextInstance.fillText((index * 10).toString(), 0, zeroPointPosition - (index * 10))

        }
        contextInstance.restore();
    }

    const getContext = useCallback(
        () => {
            if (canvasReference.current) {
                context.current.context = canvasReference.current.getContext('2d');
                context.current.maxItemWidth = canvasReference.current.offsetWidth / values.length / 2;
                drawGraphic();
            }
        }, [values]
    )

    const createColumn = function (item: LineChartColumn, index: number): void {
        const contextInstance = context.current.context;
        const maxWidth = context.current.maxItemWidth;
        if (contextInstance) {


            const itemStartX = MARGIN + 10 + index * (maxWidth + MARGIN);
            const itemStartY = CHART_HEIGHT;

            const itemEndX = maxWidth;
            const itemEndY = -item.value;
            contextInstance.fillStyle = item.color;

            contextInstance.fillRect(itemStartX, itemStartY, itemEndX, itemEndY);


        }
    };

    const drawGraphic = () => {
        if (context.current.context && canvasReference.current) {
            const contextInstance = context.current.context;
            contextInstance.font = "Arial";
            getNumbers(contextInstance, CHART_HEIGHT + 4);

            values.forEach((item, index) => {
                createColumn(item, index);
            })

            // Graphic Line
            contextInstance.moveTo(MARGIN, 0);
            contextInstance.lineTo(MARGIN, CHART_HEIGHT);
            contextInstance.lineTo(canvasReference.current.offsetWidth, CHART_HEIGHT);
            contextInstance.lineWidth = 0;
            contextInstance.stroke();


        }
    };

    useEffect(() => {
        getContext()
    }, [])

    return (
        <canvas ref={canvasReference} width={500} height={500} />
    )
}

export default LineChart
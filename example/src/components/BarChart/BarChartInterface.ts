import { CSSProperties, MutableRefObject } from "react";
import { ContextChartXY } from "../../interfaces/chart-xy-interfaces";

export interface BarChartColumn {
    y: string|number,
    x: string|number,
    color: string,
}

export default interface BarChartInterface{
    values: Array<BarChartColumn>,
    containerStyle?: CSSProperties,
    canvasStyle?: CSSProperties,
    labelStyle?: CSSProperties,
    roundValue?: number,
    width?: number,
    height?: number,
    range?: number | null,
    canvasReference:MutableRefObject<HTMLCanvasElement>,
    contextRef:MutableRefObject<ContextChartXY>,
    callbackForEveryItem:Function,
    rootStyle:CSSProperties
}
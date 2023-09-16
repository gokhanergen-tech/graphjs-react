import { CSSProperties } from "react";

export interface BarChartColumn {
    value: number,
    label: string,
    color: string,
}

export default interface BarChartInterface {
    values: Array<BarChartColumn>,
    containerStyle?: CSSProperties,
    canvasStyle?: CSSProperties,
    labelStyle?: CSSProperties,
    roundValue?: number,
    width?: number,
    height?: number,
    range?: number | null
}
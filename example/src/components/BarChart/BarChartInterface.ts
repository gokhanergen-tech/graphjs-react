import { CSSProperties } from "react";

export interface BarChartColumn {
    value: number,
    label: string,
    color: string,
}

export default interface BarChartInterface {
    values: Array<BarChartColumn>,
    style?: CSSProperties,
    width?: number,
    height?: number
}
import { CSSProperties } from "react";
import { WrapperProps } from "../../interfaces/graph-interface";

export interface BarChartColumn {
    y: string|number,
    x: string|number,
    color: string,
}

export default interface BarChartInterface extends WrapperProps{
    values: Array<BarChartColumn>,
    containerStyle?: CSSProperties,
    labelStyle?: CSSProperties,
    roundValue?: number,
    width?: number,
    height?: number,
    range?: number | null,
    grid?:boolean,
    // Mouse Events
    onBarClick?:(e:MouseEvent,item:BarChartColumn)=>void
}
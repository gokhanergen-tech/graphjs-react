import { ChartColumn } from "../components/chart-xy/ChartXY"
import { LegendItemProps } from "./graph-interface"

export interface ChartPointItem extends ChartColumn{
    root:LegendItemProps
}

export interface LineChartProps{
    onPointOver?:(e:MouseEvent,item:ChartPointItem)=>void,
    onPointClick?:(e:MouseEvent,item:ChartPointItem)=>void
} 

export interface RefPoints{
    item: ChartPointItem,
    path:Path2D
}

export interface OriginInterface{
    originYPOS:number,
    originXPOS:number
}
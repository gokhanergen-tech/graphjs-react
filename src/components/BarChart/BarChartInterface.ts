
import { WrapperProps } from "../../interfaces/graph-interface";
import { ChartColumn } from "../chart-xy/ChartXY";


export default interface BarChartInterface extends WrapperProps{
    // Mouse Events
    onBarClick?:(e:MouseEvent,item:ChartColumn)=>void
}
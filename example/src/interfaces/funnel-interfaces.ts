import { CSSProperties } from "react";
import { BaseComponentProps } from "./graph-interface";
import { ItemProps } from "./pie-interfaces";

export type DataItem=Omit<ItemProps,"textColor">

export type FunnelChartData=DataItem[];

export interface FunnelChartProps extends BaseComponentProps{
    rootStyle:CSSProperties,
    width:number,
    height:number,
    canvasStyle:CSSProperties,
    data:FunnelChartData
}
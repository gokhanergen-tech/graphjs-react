import { CSSProperties } from "react";
import { BaseComponentProps, WrapperProps } from "./graph-interface";
import { ItemProps } from "./pie-interfaces";

export type DataItem=Omit<ItemProps,"textColor">

export type FunnelChartData=DataItem[];

/**
 * @description Props for the Funnel Chart component
 */
export interface FunnelChartProps extends WrapperProps{
    width:number,
    height:number,
    data:FunnelChartData,
    options?:FunnelChartOptions
}

export interface FunnelChartOptions{
    highBarColor:string,
    lowBarColor:string,
    barInlineTextColor:string,
    labelTextColor:string
}
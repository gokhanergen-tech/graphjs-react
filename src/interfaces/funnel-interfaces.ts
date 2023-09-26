
import { WrapperProps } from "./graph-interface";
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
    /**
     * @description high value bg gradient color
     * @default #00308F
     */
    highBarColor:string,
     /**
     * @description low value bg gradient color
     * @default gray
     */
    lowBarColor:string,
     /**
     * @description inline text color
     * @default lightgray
     */
    barInlineTextColor:string,
     /**
     * @description label text color
     * @default black
     */
    labelTextColor:string
}
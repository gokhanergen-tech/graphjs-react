import { CSSProperties } from "react"

export interface LegendItemProps{
   name:string,
   color:string,
   size?:number
}

export interface LegendProps{
    labels:LegendItemProps[]
}

export interface CommonProps{
    legend?:boolean,
    labels?:Omit<LegendItemProps,"size">[]
}

export interface BaseComponentProps{
    children:any
}

export interface WrapperProps extends BaseComponentProps{
    rootStyle:CSSProperties
}
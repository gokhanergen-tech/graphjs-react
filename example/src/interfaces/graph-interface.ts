export interface LegendItemProps{
   name:string,
   color:string,
   /**
    * gfdg
    */
   size?:number
}

export interface LegendProps{
    labels:LegendItemProps[]
}

export interface CommonProps{
    legend?:boolean,
    labels?:Omit<LegendItemProps,"size">[]
}
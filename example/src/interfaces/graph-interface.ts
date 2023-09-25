import { CSSProperties } from "react"

export interface TitleProps{
    label:string,
    style?:CSSProperties
};
/**
 * @description Legend item props
 */
export interface LegendItemProps {
    name: string,
    color: string,
    size?: number
}

export interface LegendProps {
    labels: LegendItemProps[]
}

export interface CommonProps {
    /**
     * @description is legend active
     */
    legend?: boolean,
    /**
     * @description name and color you can specify legends customly as array
     */
    labels?: Omit<LegendItemProps, "size">[],
    /**
     * @description xAxis for x label, yAxis for y label
     */
    titles?: {
        x: string,
        y: string
    }|null
}

export interface BaseComponentProps {
    children?: any,
    /**
     * @description Component background-color
     * @default white
     */
    backgroundColor?: string | undefined | null
}


export interface WrapperProps extends BaseComponentProps {
    /**
    * @description You can add custom root styles for pie such as width, height or etc.. 
    */
    rootStyle: CSSProperties
    /**
     * @description You can add custom styles for pie such as width, height or etc.. 
     */
    graphStyle: CSSProperties,
    /**
     * @description title for  general label
     */
    title?:TitleProps
}

export type CanvasProps = React.HTMLProps<HTMLCanvasElement>
export type CanvasCustomProps = CanvasProps & {
  titlegraph?:TitleProps,
  render:(condition?:boolean|any)=>(void|Promise<any>),
  bgcolor?:string|undefined|null,
  clearRef:any
}
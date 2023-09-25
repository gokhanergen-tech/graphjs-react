import { CSSProperties } from "react"

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
     * @description xAxis for x label, yAxis for y label and title for  general label
     */
    titles?: {
        x: string,
        y: string,
        title:string
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
    graphStyle: CSSProperties
}

export type CanvasProps = React.HTMLProps<HTMLCanvasElement>
export type CanvasCustomProps = CanvasProps & {

}
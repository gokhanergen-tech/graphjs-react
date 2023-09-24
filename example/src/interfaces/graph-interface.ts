import { CSSProperties } from "react"

export interface LegendItemProps {
    name: string,
    color: string,
    size?: number
}

export interface LegendProps {
    labels: LegendItemProps[]
}

export interface CommonProps {
    legend?: boolean,
    labels?: Omit<LegendItemProps, "size">[],
    titles?: {
        x: LegendItemProps,
        y: LegendItemProps
    }
}

export interface BaseComponentProps {
    children?: any,
    backgroundColor?: string | undefined | null
}

export interface WrapperProps extends Omit<BaseComponentProps, "backgroundColor"> {
    rootStyle: CSSProperties
}

export type CanvasProps = React.HTMLProps<HTMLCanvasElement>
export type CanvasCustomProps = CanvasProps & {

}
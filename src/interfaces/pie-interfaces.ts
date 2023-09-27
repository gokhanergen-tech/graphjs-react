
import { WrapperProps } from "./graph-interface"

export interface ItemProps {
    /**
     * @description The value of pie item
     */
    value: number,
    /**
     * @description Pie item name
     */
    name: string,
    /**
     * @description specify a color for background
     */
    backgroundColor: string,
    /**
     * @description Pie text color
     */
    textColor?: string
}

/*
* This is import for mouse events. If you fire any event, will take this as a argument
*/
export interface MouseEventData {
    /**
     * @description root item prop
     */
    root: ItemProps,
    name: string,
    angle: number,
    bgColor: string
}

/*
* You can see every path data
*/
export interface PathData {
    path: Path2D,
    data: any,
    over: boolean,
    endAngle: number,
    startAngle: number,
    scale: number
}

/*
* Main pie component props
*/
export interface PieProps extends WrapperProps {
    /**
     * @description the radius of pie
     * @default 120
     */
    radius?: number,
    /**
     * @description you can pass all pie data array
     * @example [
     *  {
     *      
           value:56789,
           name:"Aug",
           backgroundColor:"lightgreen",
           textColor:"white"
            
     *  }
     * ]
     */
    data: ItemProps[],
    /**
     * @description It provides a good view in terms of UI. Maybe you can try and prefer this.
     * @default false
     */
    scaled?: boolean,
    /**
     * @description The direction of pie labels or names
     * @default false
     */
    textToCenter?: boolean,
    /**
     * @description It is fired when you click any pie piece
     * @param  e 
     * Mouseevent object
     * @param data
     * Clicked data which contains {
     *     root: ItemProps,
           name: string,
           angle: number,
           bgColor: string
     * }
     * @returns
     */
    onMouseClickPiece?: (e: MouseEvent, data: MouseEventData) => void
}

export interface DoughNutPieProps {
    /**
     * @description This type is for doughnut pies
     * @default false
     */
    doughnut?: boolean
}
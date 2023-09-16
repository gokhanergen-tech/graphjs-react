export interface ItemProps {
    value: number,
    name: string,
    backgroundColor: string,
    textColor?: string
}

export interface MouseEventData {
    root: ItemProps,
    name: string,
    angle: number,
    bgColor: string
}

export interface PathData {
    path: Path2D,
    data: any,
    over: boolean,
    endAngle: number,
    startAngle: number,
    scale: number
}

export interface PieProps {
    radius?: number,
    data: ItemProps[],
    scaled?: boolean,
    textToCenter?: boolean,
    onMouseClickPiece?: (data: MouseEventData) => void
}
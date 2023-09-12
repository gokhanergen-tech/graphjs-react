export interface BarChartColumn {
    value: number,
    label: string,
    color: string,
}

export default interface BarChartInterface {
    values: Array<BarChartColumn>
}
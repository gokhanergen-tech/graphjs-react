export interface LineChartColumn {
    value: number,
    label: string,
    color: string,
}

export default interface LineChartInterface {
    values: Array<LineChartColumn>
}
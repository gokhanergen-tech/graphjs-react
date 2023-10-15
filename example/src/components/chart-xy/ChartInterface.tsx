import { MutableRefObject } from "react";
import { ContextChartXY } from "../../interfaces/chart-xy-interfaces";

export default interface ChartInterface {
  canvasReference: MutableRefObject<HTMLCanvasElement|null>,
  contextRef: MutableRefObject<ContextChartXY>,
  callbackForEveryItem: Function,
}
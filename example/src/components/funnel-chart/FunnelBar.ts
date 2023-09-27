import { DataItem } from "../../interfaces/funnel-interfaces";
import { fittingString, writeText } from "../../utils/drawerUtils";
import { nFormatter } from "../../utils/mathUtils";
import FunnelChartDrawer from "./FunnelChartDrawer";

class FunnleBar{
   item:DataItem={value:0,name:"",backgroundColor:""}
   #measuredWidth=0;
 
   constructor(item:DataItem){
    this.item=item;
   }

   updateMeasuredWidth(width:number){
    this.#measuredWidth=width;
   }

   draw(ctx:CanvasRenderingContext2D,index:number){
    const textWidth=FunnelChartDrawer.textWidth;
    const object = this.item as DataItem & { measuredWidth: number };
    const yPos = FunnelChartDrawer.itemHeight * index+FunnelChartDrawer.MARGIN/2;

    let fontSize: number | string = (Math.round(FunnelChartDrawer.itemAbsoluteHeight / 5));
    fontSize = (fontSize < 12 ? 12 : fontSize>36?36:fontSize) + "px";
    // Draw lines
    ctx.beginPath();
    const lineYPos = yPos + FunnelChartDrawer.itemAbsoluteHeight / 2;
    ctx.moveTo(object.measuredWidth + textWidth, lineYPos);
    ctx.lineTo(FunnelChartDrawer.theWidthOfItem + textWidth, lineYPos);
    ctx.strokeStyle = "gray";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(FunnelChartDrawer.theWidthOfItem + textWidth, yPos);
    ctx.lineTo(FunnelChartDrawer.theWidthOfItem + textWidth, yPos + FunnelChartDrawer.itemAbsoluteHeight);
    ctx.stroke();
    
   
    ctx.save();
    ctx.textAlign="right";
    // Write label
    writeText(ctx, fittingString(ctx, object.name, textWidth-10,(fontSize+" Arial")), {
        x: textWidth-10,
        y: lineYPos
    },FunnelChartDrawer.options.labelTextColor, fontSize)
    ctx.restore();
    // Write value

    const linear = ctx.createLinearGradient(ctx.canvas.width / 2, 0, ctx.canvas.width / 2, ctx.canvas.height / 2);
    linear.addColorStop(0.5, FunnelChartDrawer.options.highBarColor)
    if (FunnelChartDrawer.theLengthOfData > 1)
        linear.addColorStop(1, FunnelChartDrawer.options.lowBarColor)
    // Draw bar
    ctx.fillStyle = linear;
    ctx.fillRect(textWidth, yPos, this.#measuredWidth, FunnelChartDrawer.itemAbsoluteHeight);
    writeText(ctx, String(nFormatter(object.value,0)), {
        x: textWidth + 5,
        y: lineYPos,
    }, FunnelChartDrawer.options.barInlineTextColor, fontSize)
   }
}

export default FunnleBar;
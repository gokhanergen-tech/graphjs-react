import BaseDrawer from "../../classes/BaseDrawer";
import { DataItem, FunnelChartData, FunnelChartOptions } from "../../interfaces/funnel-interfaces";
import { fittingString, writeText } from "../../utils/drawerUtils";

class FunnelChartDrawer extends BaseDrawer {
    #textWidth = 100;
    #theLengthOfData: number = 0;
    #theWidthOfItem: number = 0;
    #MARGIN: number = 0;
    #width: number = 0;
    #height: number = 0;
    #data: object[] = []
    #itemHeight: number = 0;
    #itemAbsoluteHeight: number = 0;
    #options:FunnelChartOptions={
        highBarColor:"#00308F",
        lowBarColor:"gray",
        barInlineTextColor:"",
        labelTextColor:""
    }
    #defaultOptions={
        highBarColor:"#00308F",
        lowBarColor:"gray",
        barInlineTextColor:"lightgray",
        labelTextColor:"black"
    }
    #bgColor=""

    update(width: number, height: number, data: FunnelChartData) {
        this.#height = height;
        this.#width = width;

        const theLengthOfData = data.length;
        const itemHeight = Math.round(height / theLengthOfData);
        const MARGIN = itemHeight / 5;
        let theWidthOfItem = (width - (this.#textWidth));
        theWidthOfItem = theWidthOfItem < 0 ? 0 : theWidthOfItem;
        const maxValue = Math.max(...data.map(item => item.value));

        this.#data = data.sort((item1, item2) => item2.value - item1.value).map(item => {
            return {
                ...item,
                measuredWidth: Math.ceil((theWidthOfItem * item.value) / (maxValue || 1))
            }
        });

        this.#theLengthOfData = theLengthOfData;
        this.#MARGIN = MARGIN;
        this.#theWidthOfItem = theWidthOfItem;

        this.#itemHeight = itemHeight;
        this.#itemAbsoluteHeight = itemHeight - MARGIN;
        this.#theLengthOfData = theLengthOfData;
        this.#textWidth=100
    }

    updateBgColor(bgColor:string|undefined|null) {
      this.#bgColor=bgColor||"white";
    }

    updateOptions(options:FunnelChartOptions|undefined){
       if(options){
         this.#options={
            ...this.#defaultOptions,
            ...options
         };
       }
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.clear(ctx,this.#bgColor);

        ctx.save();

        this.#data.forEach((item, index) => {
            const object = item as DataItem & { measuredWidth: number };
            const yPos = this.#itemHeight * index+this.#MARGIN/2;

            let fontSize: number | string = (Math.round(this.#itemAbsoluteHeight / 5));
            fontSize = (fontSize < 12 ? 12 : fontSize>36?36:fontSize) + "px";
            // Draw lines
            ctx.beginPath();
            const lineYPos = yPos + this.#itemAbsoluteHeight / 2;
            ctx.moveTo(object.measuredWidth + this.#textWidth, lineYPos);
            ctx.lineTo(this.#theWidthOfItem + this.#textWidth, lineYPos);
            ctx.strokeStyle = "gray";
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.#theWidthOfItem + this.#textWidth, yPos);
            ctx.lineTo(this.#theWidthOfItem + this.#textWidth, yPos + this.#itemAbsoluteHeight);
            ctx.stroke();
            
           
            // Write label
            writeText(ctx, fittingString(ctx, object.name, this.#textWidth-10,(fontSize+" Arial")), {
                x: 5,
                y: lineYPos
            }, this.#options.labelTextColor, fontSize)
            // Write value

            const linear = ctx.createLinearGradient(ctx.canvas.width / 2, 0, ctx.canvas.width / 2, ctx.canvas.height / 2);
            linear.addColorStop(0.5, this.#options.highBarColor)
            if (this.#theLengthOfData > 1)
                linear.addColorStop(1, this.#options.lowBarColor)
            // Draw bar
            ctx.fillStyle = linear;
            ctx.fillRect(this.#textWidth, yPos, object.measuredWidth, this.#itemAbsoluteHeight);
            writeText(ctx, String(object.value), {
                x: this.#textWidth + 5,
                y: lineYPos,
            }, this.#options.barInlineTextColor, fontSize)

        })
        ctx.restore();
    }
}

export default FunnelChartDrawer;
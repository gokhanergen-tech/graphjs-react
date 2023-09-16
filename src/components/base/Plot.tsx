import { Position } from "../../utils/mouseUtils";

class Plot {

    writeAxisText(ctx: CanvasRenderingContext2D,text:string,position:Position){
        ctx.font = "15px Arial";
        ctx.textBaseline="middle";
        ctx.fillText(text, position.x,position.y);
    }

    drawAxises(ctx: CanvasRenderingContext2D, options: {
        x: {
            max: number,
            increaseSize: number
        },
        y: {
            max: number,
            increaseSize: number
        }
    }) {
        const {height}=ctx.canvas;
        ctx.beginPath();
        ctx.moveTo(30, 30);
        ctx.lineTo(30,height-30);
        ctx.lineTo(options.x.max,height-30);
        ctx.lineWidth = 2;
        ctx.stroke();

        for(let i=0;i<=options.y.max;i+=options.y.increaseSize){
            const value=(height-(i))-30;

            this.writeAxisText(ctx,String(i),{
                x:0,
                y:value<=0?30:value
            });
        }



    }
}

export default Plot;
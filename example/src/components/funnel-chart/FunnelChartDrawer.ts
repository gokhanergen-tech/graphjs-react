
import { FunnelChartData, FunnelChartOptions } from "../../interfaces/funnel-interfaces";
import FunnleBar from "./FunnelBar";

class FunnelChartDrawer {
    static textWidth = 100;
    static theLengthOfData: number = 0;
    static theWidthOfItem: number = 0;
    static MARGIN: number = 0;
    #data: FunnelChartData = []
    static itemHeight: number = 0;
    static itemAbsoluteHeight: number = 0;
    static options: FunnelChartOptions = {
        highBarColor: "#00308F",
        lowBarColor: "gray",
        barInlineTextColor: "",
        labelTextColor: ""
    }
    #defaultOptions = {
        highBarColor: "#00308F",
        lowBarColor: "gray",
        barInlineTextColor: "lightgray",
        labelTextColor: "black"
    }

    #funnelBars: FunnleBar[] = [];

    updateBars(items: any) {
        const converted = items as FunnelChartData
        this.#data = items as FunnelChartData;
        this.#funnelBars = []
        converted.sort((item1, item2) => item2.value - item1.value).forEach(item => {
            this.#funnelBars.push(new FunnleBar(item));
        })
    }

    update(width: number, height: number) {

        const theLengthOfData = this.#data.length;
        const itemHeight = Math.round(height / theLengthOfData);
        const MARGIN = itemHeight / 5;
        let theWidthOfItem = (width - (FunnelChartDrawer.textWidth));
        theWidthOfItem = theWidthOfItem < 0 ? 0 : theWidthOfItem;
        const maxValue = Math.max(...this.#data.map(item => item.value));

        this.#funnelBars.map(bar => {
            bar.updateMeasuredWidth(Math.ceil((theWidthOfItem * (bar?.item?.value||0)) / (maxValue || 1)));
        });

        FunnelChartDrawer.theLengthOfData = theLengthOfData;
        FunnelChartDrawer.MARGIN = MARGIN;
        FunnelChartDrawer.theWidthOfItem = theWidthOfItem;
        FunnelChartDrawer.itemHeight = itemHeight;
        FunnelChartDrawer.itemAbsoluteHeight = itemHeight - MARGIN;
    }

    updateOptions(options: FunnelChartOptions | undefined) {
        if (options) {
            FunnelChartDrawer.options = {
                ...this.#defaultOptions,
                ...options
            };
        }
    }

    draw(ctx: CanvasRenderingContext2D) {

        ctx.save();
        this.#funnelBars.forEach((bar: FunnleBar,index) => {
            bar.draw(ctx,index);
        })
        ctx.restore();
    }
}

export default FunnelChartDrawer;
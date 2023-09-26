import { MutableRefObject } from "react";
import { ItemProps, PathData } from "../../interfaces/pie-interfaces";
import { sigmoid, sumOfArray } from "../../utils/mathUtils";
import { Position } from "../../utils/mouseUtils";
import { sleep } from "../../utils/promiseUtil";

class PieDrawer {
    #withPercent: any = []
    #settings: any = {
        textToCenter: false, scaled: false, doughnut: false
    }
    #positionPie: Position = {
        x: 0, y: 0
    }

    /**
 * @description It creates piece
 * @param ctx 
 * @param cx 
 * @param cy 
 * @param radius 
 * @param startAngle 
 * @param endAngle 
 * @param fillcolor 
 * @param scaled 
 * @returns void
 */
    async fillWedge(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, startAngle: number,
        endAngle: number,
        fillcolor: string,
        scaled: boolean,
        over: boolean,
        scale: number,
        initialLoadingRef: any): Promise<Path2D> {
        let path = new Path2D();


        if (!initialLoadingRef.current) {
            for (let i = startAngle; i <= endAngle; i = i + 0.20) {
                await sleep(10);
                path = new Path2D();
                ctx.save();
                path.moveTo(cx, cy);
                const p = new Path2D();
                let transform = new DOMMatrix();
                if (scaled) {
                    transform = transform.translate(cx, cy)
                        .scale(scale).translate(-cx, -cy)
                }

                if (over) {
                    ctx.shadowColor = fillcolor;
                    ctx.shadowBlur = radius / 4;
                }

                path.arc(cx, cy, radius, i, i + 0.20 > endAngle ? endAngle : i + 0.20);
                path.closePath();
                ctx.fillStyle = fillcolor;
                p.addPath(path, transform);
                ctx.fill(p);
                ctx.restore();
            }
        }

        path = new Path2D();
        ctx.save();
        path.moveTo(cx, cy);
        ctx.shadowColor = fillcolor;
        ctx.shadowBlur = radius / 10;
        const p = new Path2D();
        let transform = new DOMMatrix();
        if (scaled) {
            transform = transform.translate(cx, cy)
                .scale(scale).translate(-cx, -cy)
        }

        path.arc(cx, cy, radius, startAngle, endAngle);
        path.closePath();
        ctx.fillStyle = fillcolor;

        if (over) {
            ctx.shadowColor = fillcolor;
            ctx.shadowBlur = radius / 4;
        }
        p.addPath(path, transform);
        ctx.fill(p);
        ctx.restore();

        return p;
    }


    async update(ctx: CanvasRenderingContext2D, radius: number, data: ItemProps[], textToCenter: boolean, scaled: boolean,
        doughnut: boolean,
        positionPie: Position,
        item: PathData | null | undefined,
        initialLoadingRef:MutableRefObject<boolean>
    ) {
        const totalValue = sumOfArray(data.map(item => item.value));

        // calculate angel according to 360 value
        const withPercent = data.map(item => ({
            root: item,
            name: item.name,
            angle: (360 * item.value) / totalValue,
            bgColor: item.backgroundColor,
            textColor: item.textColor
        }))
        let prev = 0;

        const paths: PathData[] = []


        /*
          For every single pie piece, combine all peice with its calculated angle for PI number
        */
        for (let i = 0; i < withPercent.length; i++) {
            const first = withPercent[i];
            const endAngle = ((first.angle) * (Math.PI / 180)) + prev;

            const over = item?.data?.name === first.name ? item.over : false;

            const differenceWithStartEndAngle = sigmoid(endAngle - prev);
            // Draw and push for mouse event
            paths.push({
                path: await this.fillWedge(ctx, positionPie.x, positionPie.y, radius, prev, endAngle, first.bgColor, this.#settings.scaled, over, differenceWithStartEndAngle, initialLoadingRef),
                data: first,
                over,
                startAngle: prev,
                endAngle,
                scale: differenceWithStartEndAngle
            });


            prev += (first.angle) * (Math.PI / 180);
        }
        this.#withPercent = withPercent;
        this.#settings = {
            textToCenter, scaled, doughnut, data, radius
        }
        this.#positionPie = positionPie;
        return paths;
    }


    draw(ctx: CanvasRenderingContext2D) {
        let prev = 0;
        for (let i = 0; i < this.#withPercent.length; i++) {

            const first = this.#withPercent[i];
            const scaleValue = this.#settings.scaled ? sigmoid(((first.angle) * (Math.PI / 180))) : 1;
            ctx.save();

            let a = 0;
            let b = 0;
            const angle = prev + (first.angle * (Math.PI / 180)) / 2;
            if (this.#settings.data.length > 1) {
                let textX = Math.round(((this.#positionPie.x) + (this.#settings.radius / (this.#settings.doughnut ? 1.4 : 1.75)) * scaleValue));
                let textY = (this.#positionPie.y);


                textX = textX - (this.#positionPie.x) * 1
                textY = textY - (this.#positionPie.y) * 1
                a = Math.cos(-angle) * textX + Math.sin(-angle) * textY;
                b = -Math.sin(-angle) * textX + Math.cos(-angle) * textY;


            }

            const percent: number = (100 * (first.angle / 360));
            const fontSize = (this.#settings.radius / 10);

            const posX = (this.#positionPie.x) + a;
            const posY = (this.#positionPie.y) + b;
            ctx.font = (fontSize >= 30 ? 30 : fontSize) + "px Sans-serif";
            ctx.textBaseline = "middle"
            ctx.textAlign = "center"

            if (this.#settings.textToCenter) {
                const withoutPIAngle = angle * (180 / Math.PI);
                const remindDivided360 = withoutPIAngle % 360;
                const xYAngle = remindDivided360 >= 0 && remindDivided360 <= 90 ||
                    remindDivided360 >= 270 && remindDivided360 <= 360 ? 0 : 180;
                ctx.setTransform(new DOMMatrix()
                    .translate(posX, posY)
                    .rotate(xYAngle, xYAngle, remindDivided360)
                    .translate(-posX, -posY))
            }

            ctx.fillStyle = first.textColor || "white";

            ctx.fillText(percent.toFixed(2) + "%", posX, posY);

            ctx.restore();
            prev += first.angle * (Math.PI / 180);
        }

        if (this.#settings.doughnut) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.#positionPie.x, this.#positionPie.y, this.#settings.radius / 2, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.strokeStyle = "lightblue";
            ctx.fill()
            ctx.stroke();
            ctx.restore();
        }
    }
}

export default PieDrawer;
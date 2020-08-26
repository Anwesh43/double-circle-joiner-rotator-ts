const w : number = window.innerWidth 
const h : number = window.innerHeight
const parts : number = 4  
const scGap : number = 0.02 / parts  
const strokeFactor : number = 90
const sizeFactor : number = 4.3 
const gapFactor : number = 3.4 
const backcolor : string = "#bdbdbd"
const colors : Array<string> = ["#F44336", "#3F51B5", "#4CAF50", "#00BCD4", "#FF9800"]
const rot : number = Math.PI / 2 
const delay : number = 20

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }

    static sinify(scale : number) {
        return Math.sin(scale * Math.PI)
    }
}

class DrawingUtil {

    static drawCircle(context : CanvasRenderingContext2D, x : number, y : number, r : number) {
        context.beginPath()
        context.arc(x, y, r, 0, 2 * Math.PI)
        context.fill()
    }

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawCircleLineJoinerRot(context : CanvasRenderingContext2D, scale : number) {
        const sf : number = ScaleUtil.sinify(scale)
        const sf1 : number = ScaleUtil.divideScale(sf, 0, parts)
        const sf2 : number = ScaleUtil.divideScale(sf, 1, parts)
        const sf3 : number = ScaleUtil.divideScale(sf, 2, parts)
        const sf4 : number = ScaleUtil.divideScale(sf, 3, parts)
        const gap : number = Math.min(w, h) / gapFactor 
        const size : number = Math.min(w, h) / sizeFactor
        const r : number = size * 0.5 * sf1 
        context.save()
        context.translate(w / 2, h / 2)
        context.rotate(rot * sf4)
        for (var j = 0; j < 2; j++) {
            DrawingUtil.drawCircle(context, gap * (1 - 2 * j), (h * 0.5 - size / 2) * (1 - sf2), r)
        }
        DrawingUtil.drawLine(context, -gap, 0, -gap + 2 * gap * sf3, 0)
        context.restore()
    }

    static drawCJRNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        context.strokeStyle = colors[i]
        context.fillStyle = colors[i]
        DrawingUtil.drawCircleLineJoinerRot(context, scale)
    }
}
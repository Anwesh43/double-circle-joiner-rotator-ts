const w : number = window.innerWidth 
const h : number = window.innerHeight 
const scGap : number = 0.02 
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
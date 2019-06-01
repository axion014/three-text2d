import THREE = require("three");

import { TextOptions } from "./Text2D";
import { getFontHeight } from "./utils";

export class CanvasText {

  public textWidth: number;
  public textHeight: number;

  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  constructor () {
    this.textWidth = null
    this.textHeight = null

    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
  }

  get width () { return this.canvas.width }
  get height () { return this.canvas.height }

  drawText (text: string, ctxOptions: TextOptions) {
    this.ctx.font = ctxOptions.font

    const lineHeight = getFontHeight(ctxOptions.font);
    const lines = text.split("\n");
    this.textWidth = Math.max.apply(null, lines.map(line => Math.ceil(this.ctx.measureText(line).width)));
    this.textHeight = lineHeight + lineHeight * ctxOptions.lineHeight * (lines.length - 1);

    this.canvas.width = THREE.Math.ceilPowerOfTwo(this.textWidth)
    this.canvas.height = THREE.Math.ceilPowerOfTwo(this.textHeight)

    this.ctx.font = ctxOptions.font

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = ctxOptions.fillStyle
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';
    this.ctx.shadowColor = ctxOptions.shadowColor;
    this.ctx.shadowBlur = ctxOptions.shadowBlur;
    this.ctx.shadowOffsetX = ctxOptions.shadowOffsetX;
    this.ctx.shadowOffsetY = ctxOptions.shadowOffsetY;

    for (let i = 0; i < lines.length; i++) {
      this.ctx.fillText(lines[i], 0, lineHeight * ctxOptions.lineHeight * i);
    }
    return this.canvas
  }

}

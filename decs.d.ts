declare module "acmsgbox" {
	export default class ACMsgBox {
		private height: number;
		private length: number;
		private title: string;
		private textWriteInProcess: boolean;
		private lines: Record<number, string> | null;
		private svg: SVGSVGElement;
		private div: string;
		constructor(data: {
			title?: string;
			textWriteInProcess?: boolean;
			lines?: Record<number, string>;
			idDiv: string
		});
		private circle(data: {
			cx: string;
			cy: string;
			r: string;
			fill?: string
		}): SVGCircleElement;
		private rect(data: {
			x: string;
			y: string;
			width: string;
			height: string;
			fill?: string;
			transform?: string;
			stroke?: string;
			rx?: string;
			ry?: string;
		}): SVGRectElement;
		private ellipse(data: {
			cx: string;
			cy: string;
			rx: string;
			ry: string;
			fill?: string
		}): SVGEllipseElement;
		private text(x: string, y: string, fill: string, lengthAdjust?: string, transform?: string, style?: string, textToWrite?: string): SVGTextElement;
		private tspan(x: string, y: string, style: string, fill: string, textToWrite: string): SVGTSpanElement;
		draw(): SVGSVGElement;
	}
}
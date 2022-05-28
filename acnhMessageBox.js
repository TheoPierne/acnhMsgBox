function extract([beg, end]) {
	const matcher = new RegExp(`${beg}(.*?)${end}`, 'gm');
	const normalise = (str) => str.slice(beg.length, end.length * -1);
	return function (str) {
		return str.match(matcher).map(normalise);
	}
}

class ACMsgBox {
	constructor(data = {}) {
		this.height = 300;
		this.length = 600;
		this.title = data.title == undefined ? "Mélo" : data.title;
		this.textWriteInProcess = data.textWriteInProcess == undefined ? false : data.textWriteInProcess
		this.lines = data.lines == undefined ? null : data.lines
		this.xmlns = 'http://www.w3.org/2000/svg'
		this.svg = document.createElementNS(this.xmlns, "svg");
		this.div = data.idDiv
	}

	draw() {
		var svg = this.svg;
		svg.setAttributeNS(null, 'version', '1.0');
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'width', this.length);

		var circle = this.circle({ cx: '200', cy: '88', r: '50' })
		var circle2 = this.circle({ cx: '505', cy: '90', r: '50' })
		var ellipse1 = this.ellipse({ cx: '350', cy: '63', rx: '190', ry: '50' })
		var ellipse2 = this.ellipse({ cx: '350', cy: '137', rx: '181', ry: '50' })
		var rect = this.rect({ x: '200', y: '20', width: '80', height: '25', fill: '#E58435', transform: 'rotate(-10 -70 -50) translate(-36 45.5)', stroke: '#E58435', rx: '10', ry: '10' })
		var titleBox = this.text('220', '39', '#611B00', undefined, 'rotate(-10 -70 -50) translate(-36 45.5)', "font-family: 'FOT-RodinBokutoh Pro B', sans-serif", this.title, true)

		if (this.textWriteInProcess) {
			var arrayBlue = []
			var yPos = { 1: "80", 2: "105", 3: "130" }
			for (var i = 1; i < Object.keys(this.lines).length + 1; i++) {
				var thisText = null
				if (this.lines[i][0].length != 0 && !this.lines[i][0].includes('{') && !this.lines[i][0].includes('}')) {
					if (i == 1) {
						thisText = this.text('190', yPos[i], '#000', 'spacingAndGlyphs', undefined, "font-size: 18; font-family: 'FOT-RodinBokutoh Pro B', sans-serif; font-weight: bold;", this.lines[i][0], false)
					} else {
						thisText = this.tspan('190', yPos[i], '#000', "font-size: 18; font-family: 'FOT-RodinBokutoh Pro B', sans-serif; font-weight: bold;", this.lines[i][0])
					}
				} else if (this.lines[i][0].includes('{') && this.lines[i][0].includes('}')) {
					var str = this.lines[i][0]
					var ext = extract(['{', '}'])
					str = ext(str)
					if (str[0].length == 0) continue;
					var verifyLength = this.lines[i][0].replace(`{${str[0]}}`, "")
					if (verifyLength.length != 0) {
						var strSimple = this.lines[i][0]
						var multiInd1 = strSimple.indexOf("{")
						var multiInd2 = strSimple.indexOf("}")
						if (multiInd1 != -1 && multiInd2 != -1) {
							var thisTextComplicated = null
							strSimple = strSimple.split(/({|})+/)
							strSimple.splice(strSimple.indexOf('{'), 1)
							strSimple.splice(strSimple.indexOf('}'), 1)
							strSimple.splice(strSimple.indexOf(str[0]), 1, null)
							for (var y = 0; y < strSimple.length; y++) {
								if (strSimple[y] == null) {
									if (thisTextComplicated != null && thisTextComplicated.nodeType === Node.ELEMENT_NODE) {
										thisTextComplicated.appendChild(this.tspan(undefined, undefined, undefined, '#3FA3BD', str[0]))
									} else {
										if (i == 1) {
											thisTextComplicated = this.text('190', '80', '#000', 'spacingAndGlyphs', undefined, "font-size: 18; font-family: 'FOT-RodinBokutoh Pro B', sans-serif; font-weight: bold;", str[0], false)
										} else {
											thisTextComplicated = this.tspan(undefined, undefined, undefined, '#3FA3BD', str[0])
										}
									}
								} else if (strSimple[y] != null) {
									if (y == strSimple.length - 1 || strSimple[y - 1] == null) {
										if (thisTextComplicated != null && thisTextComplicated.nodeType === Node.ELEMENT_NODE) {
											thisTextComplicated.innerHTML += strSimple[y]
										} else {
											if (i == 1) {
												thisTextComplicated = this.text('190', '80', '#000', 'spacingAndGlyphs', undefined, "font-size: 18; font-family: 'FOT-RodinBokutoh Pro B', sans-serif; font-weight: bold;", strSimple[y], false)
											} else {
												thisTextComplicated = this.tspan('190', yPos[i], '#000', "font-size: 18; font-family: 'FOT-RodinBokutoh Pro B', sans-serif; font-weight: bold;", strSimple[y])
											}
										}
									} else {
										if (arrayBlue[0] == undefined || i == 1) {
											thisTextComplicated = this.text('190', '80', '#000', 'spacingAndGlyphs', undefined, "font-size: 18; font-family: 'FOT-RodinBokutoh Pro B', sans-serif; font-weight: bold;", strSimple[y], false)
										} else {
											thisTextComplicated = this.tspan('190', yPos[i], '#000', 'spacingAndGlyphs', undefined, "font-size: 18; font-family: 'FOT-RodinBokutoh Pro B', sans-serif; font-weight: bold;", strSimple[y])
										}
									}
								}
							}
						}
					}
					if (i == 1) {
						if (thisText != null && thisText.nodeType === Node.ELEMENT_NODE) {
							thisText.appendChild(this.text('190', '80', '#000', 'spacingAndGlyphs', undefined, "font-size: 18; font-family: 'FOT-RodinBokutoh Pro B', sans-serif; font-weight: bold;", str, false))
						} else {
							thisText = this.text('190', '80', '#000', 'spacingAndGlyphs', undefined, "font-size: 18; font-family: 'FOT-RodinBokutoh Pro B', sans-serif; font-weight: bold;", str, false)
						}
					} else {
						if (thisText != null && thisText.nodeType === Node.ELEMENT_NODE) {
							thisText.appendChild(this.tspan('190', yPos[i], "#000", '#3FA3BD', str))
						} else {
							thisText = this.tspan('190', yPos[i], "#000", '#3FA3BD', str)
						}
					}
				}

				if (thisTextComplicated != null && !thisTextComplicated.isEqualNode(thisText)) {
					arrayBlue.push(thisTextComplicated)
					thisTextComplicated = null
					thisText = null
				} else {
					arrayBlue.push(thisText)
					thisTextComplicated = null
					thisText = null
				}
			}

			var longText = arrayBlue[0]
			for (var l = 1; l < arrayBlue.length; l++) {
				if (arrayBlue[l]) {
					longText.appendChild(arrayBlue[l])
				}
			}
		}

		svg.appendChild(circle)
		svg.appendChild(circle2)
		svg.appendChild(ellipse1)
		svg.appendChild(ellipse2)
		svg.appendChild(rect)
		svg.appendChild(titleBox)

		if (this.textWriteInProcess) {
			svg.appendChild(longText)
		}

		if (document.getElementById(this.div)) {
			document.getElementById(this.div).appendChild(svg)
		} else {
			document.body[0].appendChild(svg)
		}

		return svg;
	}

	circle(data = {}) {
		if (data.fill == undefined) {
			data.fill = "#FFFAE6"
		}
		if (data.cx == undefined || data.cy == undefined || data.r == undefined) {
			throw new Error('I need all the data to draw a circle.')
		}
		var circleB = document.createElementNS(this.xmlns, 'circle')
		circleB.setAttributeNS(null, 'cx', data.cx)
		circleB.setAttributeNS(null, 'cy', data.cy)
		circleB.setAttributeNS(null, 'r', data.r)
		circleB.setAttributeNS(null, 'fill', data.fill)

		return circleB;
	}

	rect(data = {}) {
		if (data.x == undefined || data.y == undefined || data.width == undefined || data.height == undefined) {
			throw new Error('I need all the data to draw a square.')
		}

		if (data.fill == undefined) {
			data.fill = "#FFFAE6"
		}
		var rectB = document.createElementNS(this.xmlns, 'rect')
		rectB.setAttributeNS(null, 'x', data.x)
		rectB.setAttributeNS(null, 'y', data.y)
		rectB.setAttributeNS(null, 'width', data.width)
		rectB.setAttributeNS(null, 'height', data.height)
		rectB.setAttributeNS(null, 'fill', data.fill)

		if (data.transform != undefined) {
			rectB.setAttributeNS(null, 'transform', data.transform)
		}

		if (data.stroke != undefined) {
			rectB.setAttributeNS(null, 'stroke', data.stroke)
		}

		if (data.rx != undefined) {
			rectB.setAttributeNS(null, 'rx', data.rx)
		}

		if (data.ry != undefined) {
			rectB.setAttributeNS(null, 'ry', data.ry)
		}

		return rectB;
	}

	ellipse(data = {}) {
		if (data.cx == undefined || data.cy == undefined || data.rx == undefined || data.ry == undefined) {
			throw new Error('I need all the data to draw an ellipse.')
		}

		if (data.fill == undefined) {
			data.fill = "#FFFAE6"
		}
		var elli = document.createElementNS(this.xmlns, 'ellipse')
		elli.setAttributeNS(null, 'cx', data.cx)
		elli.setAttributeNS(null, 'cy', data.cy)
		elli.setAttributeNS(null, 'rx', data.rx)
		elli.setAttributeNS(null, 'ry', data.ry)
		elli.setAttributeNS(null, 'fill', data.fill)

		return elli;
	}

	text(x, y, fill = this.color, lengthAdjust, transform, style, textToWrite, title = false) {
		if (title) {
			if (textToWrite.length == 7) {
				x = 205
			}
			if (textToWrite.length == 6) {
				x = 210
			}
			if (textToWrite.length == 5) {
				x = 215
			}
			if (textToWrite.length <= 4) {
				x = 220
			}
			if (textToWrite == "Serveur") {
				x = 210
			}
		}
		var text = document.createElementNS(this.xmlns, 'text')
		text.setAttributeNS(null, 'x', x)
		text.setAttributeNS(null, 'y', y)
		text.setAttributeNS(null, 'fill', fill)
		if (lengthAdjust != undefined) {
			text.setAttributeNS(null, 'lengthAdjust', lengthAdjust)
		}
		if (transform != undefined) {
			text.setAttributeNS(null, 'transform', transform)
		}
		if (style != undefined) {
			text.setAttributeNS(null, 'style', style)
		}
		if (textToWrite != undefined) {
			if (textToWrite.length > 7 && title) {
				throw new Error('The number of characters must not exceed 7')
			} else if (textToWrite.length <= 0 && title) {
				throw new Error('Insufficient number of characters!')
			} else {
				text.innerHTML = new String(textToWrite)
			}
		} else {
			throw new Error('Missing text!')
		}

		return text;
	}

	tspan(x, y, style, fill, textToWrite) {
		var tspan = document.createElementNS(this.xmlns, 'tspan')
		if (x != undefined) {
			tspan.setAttributeNS(null, 'x', x)
		}
		if (y != undefined) {
			tspan.setAttributeNS(null, 'y', y)
		}
		if (style != undefined) {
			tspan.setAttributeNS(null, 'style', style)
		}
		if (fill != undefined) {
			tspan.setAttributeNS(null, 'fill', fill)
		}
		if (textToWrite != undefined) {
			tspan.innerHTML = new String(textToWrite)
		} else {
			throw new Error('Missing text!')
		}

		return tspan;
	}
}